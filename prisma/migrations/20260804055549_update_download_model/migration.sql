/*
  Warnings:

  - The values [THUMBNAIL] on the enum `DownloadType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `AIUsage` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DownloadType_new" AS ENUM ('MP4', 'MP3', 'PLAYLIST', 'TIKTOK');
ALTER TABLE "Download" ALTER COLUMN "type" TYPE "DownloadType_new" USING ("type"::text::"DownloadType_new");
ALTER TYPE "DownloadType" RENAME TO "DownloadType_old";
ALTER TYPE "DownloadType_new" RENAME TO "DownloadType";
DROP TYPE "DownloadType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "AIUsage" DROP CONSTRAINT "AIUsage_userId_fkey";

-- DropTable
DROP TABLE "AIUsage";
