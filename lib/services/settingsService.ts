import prisma from "@/lib/prisma";
import redis from "@/lib/redis";
import { getDefaultSettings } from "@/lib/content";

export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  icon: string;
  url: string;
}

export interface FooterConfig {
  columns: FooterColumn[];
  socialLinks: FooterSocialLink[];
  copyright: string;
  bottomLinks: FooterLink[];
  mapUrl?: string;
  address?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  logo?: string | null;
  logoKey?: string | null;
  heroImage?: string | null;
  heroImageKey?: string | null;
  retreatImage?: string | null;
  retreatImageKey?: string | null;
  footerConfig?: Record<string, FooterConfig> | null;
}

export class SettingsService {
  private static CACHE_KEY = "site:settings";
  private static CACHE_TTL = 3600; // 1 hour

  /**
   * Get site theme settings.
   * Priority: Redis cache → PostgreSQL → content.json defaults
   */
  static async getSettings(): Promise<ThemeSettings> {
    // 1. Try Redis cache
    if (redis) {
      try {
        const cached = await redis.get<ThemeSettings>(this.CACHE_KEY);
        if (cached) {
          console.log("[SettingsService] Cache hit");
          return cached;
        }
      } catch (error) {
        console.error("[SettingsService] Redis read error:", error);
      }
    }

    // 2. Try PostgreSQL
    try {
      console.log("[SettingsService] Cache miss. Fetching from DB.");
      const dbSettings = await prisma.siteSettings.findUnique({
        where: { id: "default" },
      });

      if (dbSettings) {
        const settings: ThemeSettings = {
          primaryColor: dbSettings.primaryColor,
          secondaryColor: dbSettings.secondaryColor,
          backgroundColor: dbSettings.backgroundColor,
          textColor: dbSettings.textColor,
          fontFamily: dbSettings.fontFamily,
          logo: dbSettings.logo,
          logoKey: dbSettings.logoKey,
          heroImage: dbSettings.heroImage,
          heroImageKey: dbSettings.heroImageKey,
          retreatImage: dbSettings.retreatImage,
          retreatImageKey: dbSettings.retreatImageKey,
          footerConfig: dbSettings.footerConfig as Record<string, FooterConfig> | null,
        };

        // Cache in Redis
        if (redis) {
          try {
            await redis.set(this.CACHE_KEY, JSON.stringify(settings), { ex: this.CACHE_TTL });
          } catch (error) {
            console.error("[SettingsService] Redis set error:", error);
          }
        }

        return settings;
      }
    } catch (error) {
      console.error("[SettingsService] DB error:", error);
    }

    // 3. Fallback to content.json defaults
    console.log("[SettingsService] Using content.json defaults.");
    return getDefaultSettings();
  }

  /**
   * Update site theme settings.
   * Upserts to DB and invalidates Redis cache.
   */
  static async updateSettings(data: Partial<ThemeSettings>): Promise<ThemeSettings> {
    const defaults = getDefaultSettings();
    const current = await this.getSettings();

    // Handle old image cleanup if logoKey is changing
    const imageFieldsToCleanup = [
      { key: 'logoKey' as const, currentKey: current.logoKey },
      { key: 'heroImageKey' as const, currentKey: current.heroImageKey },
      { key: 'retreatImageKey' as const, currentKey: current.retreatImageKey },
    ];

    for (const field of imageFieldsToCleanup) {
      if (data[field.key] !== undefined && field.currentKey && field.currentKey !== data[field.key]) {
        try {
          const { UTApi } = await import("uploadthing/server");
          const utapi = new UTApi();
          await utapi.deleteFiles(field.currentKey);
          console.log(`[SettingsService] Old ${field.key} deleted:`, field.currentKey);
        } catch (error) {
          console.error(`[SettingsService] Failed to delete old ${field.key}:`, error);
        }
      }
    }

    const merged: Record<string, unknown> = {
      primaryColor: data.primaryColor ?? current.primaryColor ?? defaults.primaryColor,
      secondaryColor: data.secondaryColor ?? current.secondaryColor ?? defaults.secondaryColor,
      backgroundColor: data.backgroundColor ?? current.backgroundColor ?? defaults.backgroundColor,
      textColor: data.textColor ?? current.textColor ?? defaults.textColor,
      fontFamily: data.fontFamily ?? current.fontFamily ?? defaults.fontFamily,
      logo: data.logo !== undefined ? data.logo : current.logo,
      logoKey: data.logoKey !== undefined ? data.logoKey : current.logoKey,
      heroImage: data.heroImage !== undefined ? data.heroImage : current.heroImage,
      heroImageKey: data.heroImageKey !== undefined ? data.heroImageKey : current.heroImageKey,
      retreatImage: data.retreatImage !== undefined ? data.retreatImage : current.retreatImage,
      retreatImageKey: data.retreatImageKey !== undefined ? data.retreatImageKey : current.retreatImageKey,
      footerConfig: data.footerConfig !== undefined ? data.footerConfig : current.footerConfig,
    };

    const updated = await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: merged,
      create: {
        id: "default",
        ...merged,
      },
    });

    const settings: ThemeSettings = {
      primaryColor: updated.primaryColor,
      secondaryColor: updated.secondaryColor,
      backgroundColor: updated.backgroundColor,
      textColor: updated.textColor,
      fontFamily: updated.fontFamily,
      logo: updated.logo,
      logoKey: updated.logoKey,
      heroImage: updated.heroImage,
      heroImageKey: updated.heroImageKey,
      retreatImage: updated.retreatImage,
      retreatImageKey: updated.retreatImageKey,
      footerConfig: updated.footerConfig as Record<string, FooterConfig> | null,
    };

    // Invalidate Redis cache
    if (redis) {
      try {
        await redis.del(this.CACHE_KEY);
        console.log("[SettingsService] Cache invalidated.");
      } catch (error) {
        console.error("[SettingsService] Redis del error:", error);
      }
    }

    return settings;
  }
}
