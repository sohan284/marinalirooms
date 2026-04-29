import { NextRequest, NextResponse } from "next/server";
import { SettingsService } from "@/lib/services/settingsService";

/**
 * GET /api/settings
 * Returns the current site theme settings.
 */
export async function GET() {
  try {
    const settings = await SettingsService.getSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("[API Settings] GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/settings
 * Updates site theme settings (partial updates supported).
 * Body: { primaryColor?, secondaryColor?, backgroundColor?, textColor?, fontFamily? }
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate that at least one valid field is provided
    const stringFields = ["primaryColor", "secondaryColor", "backgroundColor", "textColor", "fontFamily", "heroImage", "heroImageKey"];
    const updates: Record<string, unknown> = {};

    for (const field of stringFields) {
      if (body[field] && typeof body[field] === "string") {
        updates[field] = body[field];
      }
    }

    // Handle footerConfig as a JSON object
    if (body.footerConfig !== undefined) {
      updates.footerConfig = body.footerConfig;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided." },
        { status: 400 }
      );
    }

    const settings = await SettingsService.updateSettings(updates);
    return NextResponse.json(settings);
  } catch (error) {
    console.error("[API Settings] PUT Error:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
