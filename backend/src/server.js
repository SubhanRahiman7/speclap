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

// CORS configuration – allow production, localhost, and Vercel preview URLs
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://speclap-frontend.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // Vercel preview deployments use *.vercel.app
    if (origin.endsWith(".vercel.app")) return callback(null, true);
    return callback(null, false);
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Preflight (OPTIONS) must use the same origin logic
app.options("*", cors(corsOptions));
app.use(clerkMiddleware()); // req.auth will be available in the request object

app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error!");
});

app.get("/", (req, res) => {
  res.send("Hello World! 123");
});


app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");
    
    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log(`Server started on port: ${ENV.PORT}`);
      });
    }
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();

export default app;