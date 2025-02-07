/*
  Warnings:

  - A unique constraint covering the columns `[ownerId,title]` on the table `Form` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Form" ALTER COLUMN "fields" SET DEFAULT '[]';

-- CreateIndex
CREATE UNIQUE INDEX "Form_ownerId_title_key" ON "Form"("ownerId", "title");
