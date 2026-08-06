import { prisma } from "@/lib/prisma"

export async function checkDownloadLimit(userId: string, plan: string) {
  // Premium users unlimited
  if (plan === "PREMIUM") {
    return { allowed: true }
  }

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const count = await prisma.download.count({
    where: {
      userId,
      createdAt: {
        gte: todayStart,
      },
    },
  })

  if (count >= 5) {
    return {
      allowed: false,
      remaining: 0,
    }
  }

  return {
    allowed: true,
    remaining: 5 - count,
  }
}