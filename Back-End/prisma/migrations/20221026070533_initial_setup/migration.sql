/*
  Warnings:

  - You are about to drop the `WorkSpace` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "WorkSpace" DROP CONSTRAINT "WorkSpace_userId_fkey";

-- DropTable
DROP TABLE "WorkSpace";

-- CreateTable
CREATE TABLE "Workspace" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "subDomain" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_subDomain_key" ON "Workspace"("subDomain");

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
