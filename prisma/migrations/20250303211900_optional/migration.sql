-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "secret" TEXT,
    "name" TEXT NOT NULL,
    "lastActivity" DATETIME
);
INSERT INTO "new_Device" ("id", "lastActivity", "name", "secret") SELECT "id", "lastActivity", "name", "secret" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
