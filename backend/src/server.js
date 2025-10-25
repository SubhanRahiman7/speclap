import "../instrument.js"
import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./config/inngest.js"
import chatRoutes from "../routes/chat.route.js";
import * as Sentry from "@sentry/node";
import cors from "cors";

const app = express();
 
app.use(express.json());
app.use(cors({origin: ENV.CLIENT_URL, credentials: true}));
app.use(clerkMiddleware());

app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});

app.get("/debug-sentry", (req, res) => {
    throw new Error("Sentry Debug Test Error");
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
    try {
        await connectDB();
        if (ENV.NODE_ENV !== "production") {
            app.listen(ENV.PORT, () => {
                console.log("Server is listening on http://localhost:", ENV.PORT)
            })
        }
    } catch(error) {
        console.error("Error starting the server: ", error);
        process.exit(1);
    }
};

startServer();

export default app;

