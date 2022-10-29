-- DropForeignKey
ALTER TABLE "ProfilePicture" DROP CONSTRAINT "ProfilePicture_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnWorkSpace" DROP CONSTRAINT "UserOnWorkSpace_userId_fkey";

-- AddForeignKey
ALTER TABLE "ProfilePicture" ADD CONSTRAINT "ProfilePicture_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnWorkSpace" ADD CONSTRAINT "UserOnWorkSpace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
