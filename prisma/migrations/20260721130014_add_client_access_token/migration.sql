ALTER TABLE "Client" ADD COLUMN "accessToken" TEXT;
CREATE UNIQUE INDEX "Client_accessToken_key" ON "Client"("accessToken");