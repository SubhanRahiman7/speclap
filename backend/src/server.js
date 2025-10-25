import "../instrument.js";
import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "../routes/chat.route.js";

import cors from "cors";

import * as Sentry from "@sentry/node";

const app = express();

app.use(express.json());
// CORS configuration - allow all origins for now
app.use(cors({
    origin: true, // Allow all origins
    credentials: true
}));

// Additional CORS headers as backup
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
app.use(clerkMiddleware()); // req.auth will be available in the request object

app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error!");
});

app.get("/", (req, res) => {
  res.send("Hello World! 123");
});

// Test endpoint to verify CORS is working on Vercel
app.get("/test", (req, res) => {
  res.json({ 
    message: "Backend is working on Vercel!", 
    timestamp: new Date().toISOString(),
    cors: "CORS headers should be present",
    environment: process.env.NODE_ENV || "unknown"
  });
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
  try {
    console.log("Starting server...");
    console.log("Environment:", ENV.NODE_ENV);
    console.log("Port:", ENV.PORT);
    
    // Try to connect to database, but don't fail if it doesn't work
    try {
      await connectDB();
      console.log("Database connected successfully");
    } catch (dbError) {
      console.warn("Database connection failed:", dbError.message);
      console.log("Continuing without database...");
    }
    
    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log("Server started on port:", ENV.PORT);
      });
    } else {
      console.log("Production mode - server ready for Vercel");
    }
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit the process with a failure code
  }
};

startServer();

export default app;