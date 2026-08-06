import { prisma } from "@/lib/prisma";
import { DownloadType } from "@prisma/client";

export async function saveDownloadHistory({
  userId,
  url,
  title,
  type,
  fileSize,
}: {
  userId: string;
  url: string;
  title?: string;
  type: DownloadType;
  fileSize?: number;
}) {
  return await prisma.download.create({
    data: {
      userId,
      url,
      title,
      type,
      fileSize,
    },
  });
}