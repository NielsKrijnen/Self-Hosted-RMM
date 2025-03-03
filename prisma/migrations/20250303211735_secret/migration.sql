/*
  Warnings:

  - The required column `secret` was added to the `Device` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "secret" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastActivity" DATETIME NOT NULL
);
INSERT INTO "new_Device" ("id", "lastActivity", "name") SELECT "id", "lastActivity", "name" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
