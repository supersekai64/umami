-- DropTable: team_user (must be dropped before team due to foreign key constraints)
DROP TABLE IF EXISTS "team_user";

-- DropTable: team
DROP TABLE IF EXISTS "team";

-- DropTable: link
DROP TABLE IF EXISTS "link";

-- DropTable: pixel
DROP TABLE IF EXISTS "pixel";

-- AlterTable: website - remove team_id column
ALTER TABLE "website" DROP COLUMN IF EXISTS "team_id";
