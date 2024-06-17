/*
  Warnings:

  - The primary key for the `Emblem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Emblem` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Emblem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL
);
INSERT INTO "new_Emblem" ("category", "id", "image", "name", "slug") SELECT "category", "id", "image", "name", "slug" FROM "Emblem";
DROP TABLE "Emblem";
ALTER TABLE "new_Emblem" RENAME TO "Emblem";
CREATE UNIQUE INDEX "Emblem_slug_key" ON "Emblem"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
