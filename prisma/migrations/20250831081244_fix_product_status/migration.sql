-- CreateEnum
CREATE TYPE "public"."ProductStatus" AS ENUM ('draft', 'published', 'archived');

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "status" "public"."ProductStatus" NOT NULL DEFAULT 'draft';
