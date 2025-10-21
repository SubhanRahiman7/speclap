import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./src/inngest"

const app = express();
 
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});

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

