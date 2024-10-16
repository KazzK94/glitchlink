/*
  Warnings:

  - The values [ACCEPTED] on the enum `SocialLinkStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SocialLinkStatus_new" AS ENUM ('PENDING', 'FRIENDS', 'BLOCKED');
ALTER TABLE "SocialLink" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "SocialLink" ALTER COLUMN "status" TYPE "SocialLinkStatus_new" USING ("status"::text::"SocialLinkStatus_new");
ALTER TYPE "SocialLinkStatus" RENAME TO "SocialLinkStatus_old";
ALTER TYPE "SocialLinkStatus_new" RENAME TO "SocialLinkStatus";
DROP TYPE "SocialLinkStatus_old";
ALTER TABLE "SocialLink" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
