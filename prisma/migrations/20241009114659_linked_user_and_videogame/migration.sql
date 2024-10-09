-- CreateTable
CREATE TABLE "_UserToVideoGame" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToVideoGame_AB_unique" ON "_UserToVideoGame"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToVideoGame_B_index" ON "_UserToVideoGame"("B");

-- AddForeignKey
ALTER TABLE "_UserToVideoGame" ADD CONSTRAINT "_UserToVideoGame_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToVideoGame" ADD CONSTRAINT "_UserToVideoGame_B_fkey" FOREIGN KEY ("B") REFERENCES "VideoGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;
