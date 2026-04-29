import prisma from "@/lib/prisma";
import redis from "@/lib/redis";

export class RoomService {
  private static CACHE_TTL = 3600; // 1 hour
  private static CACHE_KEY = "rooms:all";

  static async getRooms() {
    // 1. Try Redis
    if (redis) {
      try {
        const cached = await redis.get(this.CACHE_KEY);
        if (cached) {
          console.log(`[RoomService] Cache hit for ${this.CACHE_KEY}`);
          return typeof cached === 'string' ? JSON.parse(cached) : cached;
        }
      } catch (error) {
        console.error("[RoomService] Redis error:", error);
      }
    }

    // 2. Fetch from DB
    const rooms = await prisma.room.findMany({
      orderBy: { order: 'asc' },
    });

    // 3. Set Redis
    if (redis && rooms.length > 0) {
      try {
        await redis.set(this.CACHE_KEY, JSON.stringify(rooms), { ex: this.CACHE_TTL });
      } catch (error) {
        console.error("[RoomService] Redis set error:", error);
      }
    }

    return rooms;
  }

  static async updateRoom(id: string, data: any) {
    const current = await prisma.room.findUnique({ where: { id } });

    // Clean up old gallery images if they were replaced or removed
    if (current?.images && Array.isArray(current.images)) {
      const currentKeys = current.images.map((img: any) => img.key).filter(Boolean);
      const newKeys = Array.isArray(data.images) ? data.images.map((img: any) => img.key).filter(Boolean) : [];
      
      const keysToDelete = currentKeys.filter((key: string) => !newKeys.includes(key));
      
      if (keysToDelete.length > 0) {
        try {
          const { UTApi } = await import("uploadthing/server");
          const utapi = new UTApi();
          await utapi.deleteFiles(keysToDelete);
          console.log(`[RoomService] Old gallery images deleted:`, keysToDelete);
        } catch (error) {
          console.error(`[RoomService] Failed to delete old gallery images:`, error);
        }
      }
    }

    // Validation: Prevent saving blob URLs
    if (Array.isArray(data.images)) {
      const hasBlob = data.images.some((img: any) => {
        const url = typeof img === 'string' ? img : img.url;
        return url && url.startsWith('blob:');
      });
      if (hasBlob) {
        throw new Error("Cannot save temporary blob URLs in gallery");
      }
    }

    const room = await prisma.room.update({
      where: { id },
      data: {
        images: data.images,
        translations: data.translations,
        order: data.order,
      },
    });

    // Invalidate Cache
    if (redis) {
      await redis.del(this.CACHE_KEY);
    }

    return room;
  }

  static async createRoom(data: any) {
    const room = await prisma.room.create({
      data: {
        slug: data.slug,
        images: data.images,
        translations: data.translations,
        order: data.order || 0,
      },
    });

    // Invalidate Cache
    if (redis) {
      await redis.del(this.CACHE_KEY);
    }

    return room;
  }

  static async deleteRoom(id: string) {
    const current = await prisma.room.findUnique({ where: { id } });

    // Handle array of images if they exist
    if (current?.images) {
      try {
        const images = current.images as any[];
        const keys = images.map(img => img.key).filter(Boolean);
        if (keys.length > 0) {
          const { UTApi } = await import("uploadthing/server");
          const utapi = new UTApi();
          await utapi.deleteFiles(keys);
          console.log(`[RoomService] Room gallery images deleted:`, keys);
        }
      } catch (error) {
        console.error(`[RoomService] Failed to delete gallery images:`, error);
      }
    }

    await prisma.room.delete({
      where: { id },
    });

    // Invalidate Cache
    if (redis) {
      await redis.del(this.CACHE_KEY);
    }
  }
}
