/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `VideoGame` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VideoGame_externalId_key" ON "VideoGame"("externalId");
