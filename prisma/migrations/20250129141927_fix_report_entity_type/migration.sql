/*
  Warnings:

  - The values [SOCIAL_LINK] on the enum `ReportEntityType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReportEntityType_new" AS ENUM ('POST', 'COMMENT', 'OTHER');
ALTER TABLE "Report" ALTER COLUMN "entityType" TYPE "ReportEntityType_new" USING ("entityType"::text::"ReportEntityType_new");
ALTER TYPE "ReportEntityType" RENAME TO "ReportEntityType_old";
ALTER TYPE "ReportEntityType_new" RENAME TO "ReportEntityType";
DROP TYPE "ReportEntityType_old";
COMMIT;
