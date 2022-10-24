import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
console.log(`prisma previewFeatures  ${prisma._engine?.previewFeatures}`);
console.log(`prisma clientVersion ${prisma._engine?.clientVersion}`);
export { prisma };
