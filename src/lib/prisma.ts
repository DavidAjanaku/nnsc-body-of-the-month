import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
};

// Only instantiate Prisma client if DATABASE_URL is available
// This prevents build-time errors when the database isn't accessible
const prisma = globalForPrisma.prisma ??
    (process.env.DATABASE_URL ? prismaClientSingleton() : null as any);

export default prisma;

if (process.env.NODE_ENV !== "production" && prisma) {
    globalForPrisma.prisma = prisma;
}
