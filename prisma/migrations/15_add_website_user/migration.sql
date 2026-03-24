-- CreateTable
CREATE TABLE "website_user" (
    "website_user_id" UUID NOT NULL,
    "website_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "website_user_pkey" PRIMARY KEY ("website_user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "website_user_website_user_id_key" ON "website_user"("website_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "website_user_website_id_user_id_key" ON "website_user"("website_id", "user_id");

-- CreateIndex
CREATE INDEX "website_user_website_id_idx" ON "website_user"("website_id");

-- CreateIndex
CREATE INDEX "website_user_user_id_idx" ON "website_user"("user_id");
