import "dotenv/config";
import prismaClientPkg from "../generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";

const { PrismaClient } = prismaClientPkg;

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
});

const connectToDatabase = async () => {
    try {
        await prisma.$connect();
        console.log("Connected to the database successfully.");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
};

const disconnectFromDatabase = async () => {
    try {
        await prisma.$disconnect();
        console.log("Disconnected from the database successfully.");
    } catch (error) {
        console.error("Error disconnecting from the database:", error);
    }
};

export { prisma, connectToDatabase, disconnectFromDatabase };