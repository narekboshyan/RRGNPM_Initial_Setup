-- DropForeignKey
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_workspaceId_fkey";

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
