import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./providers/AuthProvider.jsx";
import * as Sentry from "@sentry/react";
import {
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes
} from "react-router"


const queryClient = new QueryClient();

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

Sentry.init({
  dsn: "https://0a28a9e1d4dbaaf883abf83eb15842ee@o4510223325003776.ingest.us.sentry.io/4510245534367744",
  integrations: [ 
    Sentry.reactRouterV7BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],
  tracesSampleRate: 1.0,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <App />
          </AuthProvider>
          <Toaster position="top-right" />
        </QueryClientProvider>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
