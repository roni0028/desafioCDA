-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Emblem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Emblem" ("category", "id", "image", "name", "slug") SELECT "category", "id", "image", "name", "slug" FROM "Emblem";
DROP TABLE "Emblem";
ALTER TABLE "new_Emblem" RENAME TO "Emblem";
CREATE UNIQUE INDEX "Emblem_slug_key" ON "Emblem"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
