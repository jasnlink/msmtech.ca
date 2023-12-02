/*
  Warnings:

  - Made the column `app` on table `AffiliateLead` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AffiliateLead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "shopEmail" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "app" TEXT NOT NULL,
    "effectiveDate" DATETIME,
    "affiliateUserId" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AffiliateLead_affiliateUserId_fkey" FOREIGN KEY ("affiliateUserId") REFERENCES "AffiliateUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AffiliateLead" ("affiliateUserId", "app", "createdAt", "deleted", "effectiveDate", "id", "shop", "shopEmail", "status", "updatedAt") SELECT "affiliateUserId", "app", "createdAt", "deleted", "effectiveDate", "id", "shop", "shopEmail", "status", "updatedAt" FROM "AffiliateLead";
DROP TABLE "AffiliateLead";
ALTER TABLE "new_AffiliateLead" RENAME TO "AffiliateLead";
CREATE UNIQUE INDEX "AffiliateLead_shopEmail_key" ON "AffiliateLead"("shopEmail");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
