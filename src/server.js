import express from 'express';
import { config } from "dotenv";
import { connectToDatabase, disconnectFromDatabase } from "./config/db.js";

config();
connectToDatabase();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 4040;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// --- Handling graceful shutdown ---

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! Shutting down... by reason: ", err);
    server.close( async () => {
        await disconnectFromDatabase();
        process.exit(1);
    });
});

process.on("uncaughtException", async (err) => {
    console.log("UNCAUGHT EXCEPTION! Shutting down... by reason: ", err);
    server.close( async () => {
        await disconnectFromDatabase();
        process.exit(1);
    });
});

process.on("SIGTERM", async (err) => {
    console.log("SIGTERM RECEIVED! Shutting down... by reason: ", err);
    server.close( async () => {
        await disconnectFromDatabase();
        process.exit(1);
    });
});

// --- End of graceful shutdown handling ---