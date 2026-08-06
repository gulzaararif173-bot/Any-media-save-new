import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { saveDownloadHistory } from "@/lib/services/download.service"
import { DownloadType } from "@prisma/client"
import { downloadMP4 } from "@/lib/services/ytdlp.service"
import { checkDownloadLimit } from "@/lib/limits"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { url } = await req.json()

    if (!url) {
      return NextResponse.json(
        { error: "URL required" },
        { status: 400 }
      )
    }

    // ✅ Check FREE plan daily limit
    const limit = await checkDownloadLimit(
      session.user.id,
      (session.user as any).plan
    )

    if (!limit.allowed) {
      return NextResponse.json(
        {
          error: "Daily free limit reached.",
          message:
            "You’ve used your 5 free downloads today. Upgrade to Premium for unlimited downloads.",
        },
        { status: 403 }
      )
    }

    // ✅ Start download in background
    downloadMP4(url).catch((err) => {
      console.error("Background download error:", err)
    })

    // ✅ Save download history
    await saveDownloadHistory({
      userId: session.user.id,
      url,
      title: "Download started",
      type: DownloadType.MP4,
      fileSize: 0,
    })

    const remaining = limit.remaining ?? 1

    return NextResponse.json({
      success: true,
      message:
        (session.user as any).plan === "FREE"
          ? `Download started. ${remaining - 1} free downloads remaining today.`
          : "Download started.",
    })
  } catch (error: any) {
    console.error("DOWNLOAD ERROR:", error)

    return NextResponse.json(
      { error: error?.toString() || "Download failed" },
      { status: 500 }
    )
  }
}