/*
  Warnings:

  - You are about to drop the column `usernameLowercase` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `username` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.

*/
-- DropIndex
DROP INDEX "User_usernameLowercase_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "usernameLowercase",
ALTER COLUMN "username" SET DATA TYPE VARCHAR(40);

-- RenameIndex
ALTER INDEX "User_username_key" RENAME TO "username_unique_ci";
