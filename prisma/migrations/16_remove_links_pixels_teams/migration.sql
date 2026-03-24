-- DropTable: team_user (members join table - must be dropped before team)
DROP TABLE IF EXISTS "team_user";

-- DropTable: team
DROP TABLE IF EXISTS "team";

-- DropTable: link
DROP TABLE IF EXISTS "link";

-- DropTable: pixel
DROP TABLE IF EXISTS "pixel";

-- AlterTable: website - remove team_id column
ALTER TABLE "website" DROP COLUMN IF EXISTS "team_id";

-- Update any websites that had no user owner (team-owned) to be orphaned (will be cleaned up)
-- In a real migration you may want to reassign these websites to the admin user first
DELETE FROM "website" WHERE "user_id" IS NULL AND NOT EXISTS (
  SELECT 1 FROM "website_user" WHERE "website_user"."website_id" = "website"."website_id"
);
