CREATE TABLE "Setting" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Setting_pkey" PRIMARY KEY ("key")
);

INSERT INTO "Setting" ("key", "value", "updatedAt") VALUES
    ('price_lanzamiento', '59990', NOW()),
    ('price_negocio', '49990', NOW()),
    ('price_pro', '79990', NOW())
ON CONFLICT ("key") DO NOTHING;