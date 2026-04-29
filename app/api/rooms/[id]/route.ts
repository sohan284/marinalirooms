import { NextRequest, NextResponse } from "next/server";
import { RoomService } from "@/lib/services/roomService";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const room = await RoomService.updateRoom(id, body);
    return NextResponse.json(room);
  } catch (error) {
    console.error("[API Rooms ID PUT] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await RoomService.deleteRoom(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API Rooms ID DELETE] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
