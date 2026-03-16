/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Director` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Director` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Director" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Director_slug_key" ON "Director"("slug");

-- CreateIndex
CREATE INDEX "Director_slug_idx" ON "Director"("slug");
