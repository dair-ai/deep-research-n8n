import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { searchRequestSchema, type SearchResponse } from "@shared/schema";

const N8N_WEBHOOK_URL = "https://omarsar.app.n8n.cloud/webhook-test/search";

export async function registerRoutes(app: Express): Promise<Server> {
  // Search endpoint that proxies to n8n webhook
  app.post("/api/search", async (req, res) => {
    try {
      // Validate request body
      const validatedData = searchRequestSchema.parse(req.body);
      
      // Make request to n8n webhook
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: validatedData.query }),
      });

      if (!response.ok) {
        throw new Error(`n8n webhook error: ${response.status} ${response.statusText}`);
      }

      const data: SearchResponse = await response.json();
      
      // Log the response structure for debugging
      console.log("n8n response:", JSON.stringify(data, null, 2));
      
      res.json(data);
    } catch (error) {
      console.error("Search API error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid request data",
          errors: error.errors 
        });
      }
      
      if (error instanceof Error) {
        return res.status(500).json({ 
          message: error.message.includes('fetch') 
            ? "Failed to connect to research service" 
            : error.message 
        });
      }
      
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
