import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { aiService } from "./ai-service";
import { insertInquirySchema, insertHomeValuationSchema } from "@shared/schema";
import { z } from "zod";
import { email } from './emailservice';
import cors from 'cors';

export async function registerRoutes(app: Express): Promise<Server> {

  app.use(cors());
  
  // Properties
  app.get("/api/properties", async (req, res) => {
    try {
      const { limit, featured } = req.query;
      const properties = await storage.getProperties(
        limit ? parseInt(limit as string) : undefined,
        featured ? featured === 'true' : undefined
      );
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  app.get("/api/properties/search", async (req, res) => {
    try {
      const { city, minPrice, maxPrice, beds, propertyType } = req.query;
      const properties = await storage.searchProperties({
        city: city as string,
        minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
        beds: beds ? parseInt(beds as string) : undefined,
        propertyType: propertyType as string,
      });
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to search properties" });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    try {
      const property = await storage.getProperty(req.params.id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });

  // Testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const { limit } = req.query;
      const testimonials = await storage.getTestimonials(
        limit ? parseInt(limit as string) : undefined
      );
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Blog Posts
  app.get("/api/blog", async (req, res) => {
    try {
      const { limit, category } = req.query;
      const posts = await storage.getBlogPosts(
        limit ? parseInt(limit as string) : undefined,
        category as string
      );
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:id", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Neighborhoods
  app.get("/api/neighborhoods", async (req, res) => {
    try {
      const neighborhoods = await storage.getNeighborhoods();
      res.json(neighborhoods);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch neighborhoods" });
    }
  });

  app.get("/api/neighborhoods/:id", async (req, res) => {
    try {
      const neighborhood = await storage.getNeighborhood(req.params.id);
      if (!neighborhood) {
        return res.status(404).json({ message: "Neighborhood not found" });
      }
      res.json(neighborhood);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch neighborhood" });
    }
  });

  // Inquiries
  app.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);

      await email.sendInquiryEmailNotification(validatedData);

      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.issues });
      }
      res.status(500).json({ message: "Failed to create inquiry" });
    }
  });

  // Home Valuations
  app.post("/api/home-valuations", async (req, res) => {
    try {
      const validatedData = insertHomeValuationSchema.parse(req.body);
      
      // Get AI-powered valuation
      const aiValuation = await aiService.getPropertyValuation({
        address: validatedData.address,
        zipCode: validatedData.zipCode,
        beds: validatedData.beds,
        baths: parseFloat(validatedData.baths.toString()),
        sqft: validatedData.sqft
      });
      
      // Store the valuation with AI estimate
      const valuationData = {
        ...validatedData,
        estimatedValue: aiValuation.estimatedValue.toString()
      };
      
      const valuation = await storage.createHomeValuation(valuationData);
      
      // Return enhanced response with AI insights
      res.status(201).json({
        ...valuation,
        confidence: aiValuation.confidence,
        factors: aiValuation.factors,
        marketInsights: aiValuation.marketInsights
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create home valuation" });
    }
  });

  // AI Chat endpoint with OpenAI integration
  /* app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ message: "Message is required" });
      }
      
      const response = await aiService.getChatResponse(message);
      res.json({ response });
    } catch (error) {
      console.error("Chat endpoint error:", error);
      res.status(500).json({ message: "Chat service temporarily unavailable" });
    }
  }); */

  const httpServer = createServer(app);
  return httpServer;
}
