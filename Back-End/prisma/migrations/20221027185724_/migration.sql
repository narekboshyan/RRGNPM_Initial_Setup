/*
  Warnings:

  - You are about to drop the column `userId` on the `Workspace` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_userId_fkey";

-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "UserOnWorkSpace" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "workspaceId" INTEGER,

    CONSTRAINT "UserOnWorkSpace_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserOnWorkSpace" ADD CONSTRAINT "UserOnWorkSpace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnWorkSpace" ADD CONSTRAINT "UserOnWorkSpace_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE SET NULL ON UPDATE CASCADE;
