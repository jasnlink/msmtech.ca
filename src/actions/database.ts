import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient()
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

// Use WAL mode for better performance and so that writers don't block readers and vice-versa
prisma.$queryRaw`PRAGMA journal_mode = WAL;`
    .then(() => {
        console.log("ENABLED WAL MODE FOR DATABASE");
    })
    .catch((error: any) => { console.log("Failed due to:", error); process.exit(1); });

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma