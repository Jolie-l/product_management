-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_createUserId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_updateUserId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_createUserId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_updateUserId_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "createUserId" DROP NOT NULL,
ALTER COLUMN "updateUserId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "createUserId" DROP NOT NULL,
ALTER COLUMN "updateUserId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_createUserId_fkey" FOREIGN KEY ("createUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_updateUserId_fkey" FOREIGN KEY ("updateUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_createUserId_fkey" FOREIGN KEY ("createUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_updateUserId_fkey" FOREIGN KEY ("updateUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
