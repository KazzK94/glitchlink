/*
  Warnings:

  - A unique constraint covering the columns `[userAId,userBId]` on the table `SocialLink` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SocialLink_userAId_userBId_key" ON "SocialLink"("userAId", "userBId");
