import { NextRequest, NextResponse } from "next/server";
import { RoomService } from "@/lib/services/roomService";

export async function GET() {
  try {
    const rooms = await RoomService.getRooms();
    return NextResponse.json(rooms);
  } catch (error) {
    console.error("[API Rooms GET] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const room = await RoomService.createRoom(body);
    return NextResponse.json(room);
  } catch (error) {
    console.error("[API Rooms POST] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
