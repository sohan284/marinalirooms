import { NextRequest, NextResponse } from "next/server";
import { ContentService } from "@/lib/services/contentService";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lang: string; page: string }> }
) {
  try {
    const { lang, page } = await params;

    if (!lang || !page) {
      return NextResponse.json(
        { error: "Language and Page are required" },
        { status: 400 }
      );
    }

    const content = await ContentService.getContent(page, lang);

    if (!content) {
      return NextResponse.json(
        { error: "Content not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error("[API Content] Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ lang: string; page: string }> }
) {
  try {
    const { lang, page } = await params;
    const body = await request.json();
    const { path, value, sections: newSections } = body;

    if (!lang || !page) {
      return NextResponse.json({ error: "Language and page are required" }, { status: 400 });
    }

    // Case 1: Bulk update with full sections object
    if (newSections) {
      const updatedContent = await ContentService.updateContent(page, lang, newSections);
      
      // If there are images in the newSections, sync them to other languages
      const LANGUAGES = ["en", "it", "de"];
      const imageKeys = Object.keys(newSections).filter(k => k.toLowerCase().includes("image"));
      
      if (imageKeys.length > 0) {
        for (const l of LANGUAGES) {
          if (l !== lang) {
            const otherContent = await ContentService.getContent(page, l);
            if (otherContent) {
              const otherSections = { ...(otherContent.sections as any) };
              imageKeys.forEach(key => {
                otherSections[key] = newSections[key];
              });
              await ContentService.updateContent(page, l, otherSections);
            }
          }
        }
      }
      
      return NextResponse.json({ success: true, sections: updatedContent.sections });
    }

    // Case 2: Single field update with path and value
    if (path && value !== undefined) {
      const content = await ContentService.getContent(page, lang);
      if (!content) {
        return NextResponse.json({ error: "Content not found" }, { status: 404 });
      }

      const sections = { ...(content.sections as any) };
      const keys = path.split('.');
      let current = sections;

      for (let i = 0; i < keys.length - 1; i++) {
        if (current[keys[i]] === undefined) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      const oldValue = current[keys[keys.length - 1]];
      current[keys[keys.length - 1]] = value;

      // Delete old image if it's replaced and is an UploadThing URL
      if (path.toLowerCase().includes("image") && typeof oldValue === 'string' && oldValue.includes('utfs.io/f/') && oldValue !== value) {
        try {
          const oldKey = oldValue.split('utfs.io/f/')[1];
          if (oldKey) {
            const { UTApi } = await import("uploadthing/server");
            const utapi = new UTApi();
            await utapi.deleteFiles(oldKey);
            console.log(`[API Content] Old image deleted from UploadThing:`, oldKey);
          }
        } catch (error) {
          console.error(`[API Content] Failed to delete old image:`, error);
        }
      }

      const updatedContent = await ContentService.updateContent(page, lang, sections);

      // If it's an image, update all other languages too
      if (path.toLowerCase().includes("image")) {
        const LANGUAGES = ["en", "it", "de"];
        for (const l of LANGUAGES) {
          if (l !== lang) {
            const otherContent = await ContentService.getContent(page, l);
            if (otherContent) {
              const otherSections = { ...(otherContent.sections as any) };
              let otherCurrent = otherSections;
              for (let i = 0; i < keys.length - 1; i++) {
                if (!otherCurrent[keys[i]]) otherCurrent[keys[i]] = {};
                otherCurrent = otherCurrent[keys[i]];
              }
              otherCurrent[keys[keys.length - 1]] = value;
              await ContentService.updateContent(page, l, otherSections);
            }
          }
        }
      }

      return NextResponse.json({ success: true, sections: updatedContent.sections });
    }

    return NextResponse.json({ error: "Either sections or path/value are required" }, { status: 400 });
  } catch (error) {
    console.error("[API Content PUT] Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
