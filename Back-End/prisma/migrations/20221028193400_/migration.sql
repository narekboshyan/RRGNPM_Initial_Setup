-- AlterTable
ALTER TABLE "ProfilePicture" ADD COLUMN     "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP;
