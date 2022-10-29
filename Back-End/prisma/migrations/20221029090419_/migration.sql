-- DropForeignKey
ALTER TABLE "UserOnWorkSpace" DROP CONSTRAINT "UserOnWorkSpace_workspaceId_fkey";

-- AddForeignKey
ALTER TABLE "UserOnWorkSpace" ADD CONSTRAINT "UserOnWorkSpace_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
