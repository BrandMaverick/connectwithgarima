// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users = /* @__PURE__ */ new Map();
  properties = /* @__PURE__ */ new Map();
  testimonials = /* @__PURE__ */ new Map();
  blogPosts = /* @__PURE__ */ new Map();
  inquiries = /* @__PURE__ */ new Map();
  homeValuations = /* @__PURE__ */ new Map();
  neighborhoods = /* @__PURE__ */ new Map();
  constructor() {
    this.seedData();
  }
  seedData() {
    const testimonialData = [
      {
        name: "Robert & Linda Chen",
        location: "Bellevue Sellers",
        content: "Garima made our downsizing process seamless and stress-free. Her compassion and expertise guided us through every step, from listing our family home to finding the perfect condo. We couldn't have asked for better service.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
      },
      {
        name: "Jennifer Martinez",
        location: "Seattle Buyer",
        content: "Working with Garima was exceptional. Her market knowledge and negotiation skills helped us secure our dream home in a competitive market. She truly goes above and beyond for her clients.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e742?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
      },
      {
        name: "Michael Thompson",
        location: "Redmond Seller",
        content: "Garima's technology tools and AI-powered insights gave us a significant advantage in understanding our property's value and market position. Her innovative approach sets her apart from other agents.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
      }
    ];
    testimonialData.forEach((testimonial) => {
      const id = randomUUID();
      this.testimonials.set(id, {
        ...testimonial,
        id,
        createdAt: /* @__PURE__ */ new Date()
      });
    });
    const propertyData = [
      {
        address: "1234 Bellevue Way",
        city: "Bellevue",
        state: "WA",
        zipCode: "98004",
        price: "2850000",
        beds: 5,
        baths: "4.5",
        sqft: 4200,
        propertyType: "Single Family",
        status: "active",
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
        description: "Stunning luxury home in prestigious Bellevue with mountain views and modern amenities.",
        featured: true,
        mlsId: "BEL001"
      },
      {
        address: "456 Lake Shore Dr",
        city: "Seattle",
        state: "WA",
        zipCode: "98109",
        price: "3750000",
        beds: 6,
        baths: "5",
        sqft: 5800,
        propertyType: "Single Family",
        status: "active",
        images: ["https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
        description: "Contemporary waterfront home with breathtaking views of Elliott Bay.",
        featured: true,
        mlsId: "SEA001"
      },
      {
        address: "789 Education Hill Rd",
        city: "Redmond",
        state: "WA",
        zipCode: "98052",
        price: "1950000",
        beds: 4,
        baths: "3.5",
        sqft: 3400,
        propertyType: "Single Family",
        status: "active",
        images: ["https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
        description: "Elegant estate home in Redmond's Education Hill neighborhood.",
        featured: true,
        mlsId: "RED001"
      }
    ];
    propertyData.forEach((property) => {
      const id = randomUUID();
      this.properties.set(id, {
        ...property,
        id,
        createdAt: /* @__PURE__ */ new Date()
      });
    });
    const blogData = [
      {
        title: "2024 Seattle Luxury Market: Year-End Analysis",
        excerpt: "Comprehensive review of luxury property sales in Greater Seattle, including market predictions for 2025 and investment opportunities.",
        content: "The Seattle luxury real estate market continues to show resilience...",
        category: "Market Trends",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "The Complete Guide to Downsizing After 65",
        excerpt: "Essential tips and emotional guidance for seniors transitioning to their next home, including financial considerations and timing strategies.",
        content: "Downsizing can be an emotional journey for seniors...",
        category: "Senior Services",
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "How AI is Revolutionizing Real Estate Valuations",
        excerpt: "Discover how artificial intelligence provides more accurate home valuations and market insights for both buyers and sellers in today's market.",
        content: "Artificial intelligence is transforming how we value properties...",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ];
    blogData.forEach((post) => {
      const id = randomUUID();
      this.blogPosts.set(id, {
        ...post,
        id,
        publishedAt: /* @__PURE__ */ new Date()
      });
    });
    const neighborhoodData = [
      {
        name: "Bellevue",
        description: "Upscale suburban living with world-class shopping and dining",
        image: "https://images.unsplash.com/photo-1541690485441-6d0d2468a94b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        highlights: ["Bellevue Square", "Top-rated schools", "Tech corridor"],
        schools: { rating: 9.5, notable: ["Bellevue High School", "Newport High School"] },
        amenities: { shopping: "Bellevue Square", parks: "Bellevue Downtown Park" },
        marketTrends: { medianPrice: "$1,850,000", appreciation: "8.2%" }
      },
      {
        name: "Redmond",
        description: "Tech hub with excellent schools and family amenities",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        highlights: ["Microsoft Campus", "Marymoor Park", "Family-friendly"],
        schools: { rating: 9.7, notable: ["Redmond High School", "Eastlake High School"] },
        amenities: { recreation: "Marymoor Park", shopping: "Redmond Town Center" },
        marketTrends: { medianPrice: "$1,650,000", appreciation: "7.8%" }
      },
      {
        name: "Seattle",
        description: "Urban sophistication with cultural richness",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        highlights: ["Space Needle", "Pike Place Market", "Waterfront"],
        schools: { rating: 8.5, notable: ["Roosevelt High School", "Garfield High School"] },
        amenities: { culture: "Seattle Art Museum", dining: "Pike Place Market" },
        marketTrends: { medianPrice: "$1,250,000", appreciation: "6.5%" }
      },
      {
        name: "Spokane",
        description: "Affordable luxury with outdoor recreation",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        highlights: ["Riverfront Park", "Gonzaga University", "Outdoor recreation"],
        schools: { rating: 8, notable: ["Lewis and Clark High School"] },
        amenities: { recreation: "Riverfront Park", culture: "Northwest Museum" },
        marketTrends: { medianPrice: "$485,000", appreciation: "12.3%" }
      }
    ];
    neighborhoodData.forEach((neighborhood) => {
      const id = randomUUID();
      this.neighborhoods.set(id, { ...neighborhood, id });
    });
  }
  // Users
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Properties
  async getProperties(limit, featured) {
    let properties2 = Array.from(this.properties.values());
    if (featured !== void 0) {
      properties2 = properties2.filter((p) => p.featured === featured);
    }
    properties2.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    if (limit) {
      properties2 = properties2.slice(0, limit);
    }
    return properties2;
  }
  async getProperty(id) {
    return this.properties.get(id);
  }
  async searchProperties(filters) {
    let properties2 = Array.from(this.properties.values());
    if (filters.city) {
      properties2 = properties2.filter(
        (p) => p.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }
    if (filters.minPrice) {
      properties2 = properties2.filter((p) => parseFloat(p.price) >= filters.minPrice);
    }
    if (filters.maxPrice) {
      properties2 = properties2.filter((p) => parseFloat(p.price) <= filters.maxPrice);
    }
    if (filters.beds) {
      properties2 = properties2.filter((p) => p.beds >= filters.beds);
    }
    if (filters.propertyType) {
      properties2 = properties2.filter((p) => p.propertyType === filters.propertyType);
    }
    return properties2;
  }
  async createProperty(insertProperty) {
    const id = randomUUID();
    const property = {
      ...insertProperty,
      id,
      status: insertProperty.status || "active",
      images: insertProperty.images ?? [],
      description: insertProperty.description ?? null,
      featured: insertProperty.featured ?? false,
      mlsId: insertProperty.mlsId ?? null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.properties.set(id, property);
    return property;
  }
  // Testimonials
  async getTestimonials(limit) {
    let testimonials2 = Array.from(this.testimonials.values());
    testimonials2.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    if (limit) {
      testimonials2 = testimonials2.slice(0, limit);
    }
    return testimonials2;
  }
  async createTestimonial(insertTestimonial) {
    const id = randomUUID();
    const testimonial = {
      ...insertTestimonial,
      id,
      rating: insertTestimonial.rating || 5,
      avatar: insertTestimonial.avatar !== void 0 ? insertTestimonial.avatar : null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  // Blog Posts
  async getBlogPosts(limit, category) {
    let posts = Array.from(this.blogPosts.values());
    if (category) {
      posts = posts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
    posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
    if (limit) {
      posts = posts.slice(0, limit);
    }
    return posts;
  }
  async getBlogPost(id) {
    return this.blogPosts.get(id);
  }
  async createBlogPost(insertPost) {
    const id = randomUUID();
    const post = {
      ...insertPost,
      id,
      image: insertPost.image || null,
      publishedAt: /* @__PURE__ */ new Date()
    };
    this.blogPosts.set(id, post);
    return post;
  }
  // Inquiries
  async createInquiry(insertInquiry) {
    const id = randomUUID();
    const inquiry = {
      ...insertInquiry,
      id,
      phone: insertInquiry.phone || null,
      propertyId: insertInquiry.propertyId || null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
  // Home Valuations
  async createHomeValuation(insertValuation) {
    const id = randomUUID();
    const valuation = {
      ...insertValuation,
      id,
      estimatedValue: insertValuation.estimatedValue || null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.homeValuations.set(id, valuation);
    return valuation;
  }
  // Neighborhoods
  async getNeighborhoods() {
    return Array.from(this.neighborhoods.values());
  }
  async getNeighborhood(id) {
    return this.neighborhoods.get(id);
  }
  async createNeighborhood(insertNeighborhood) {
    const id = randomUUID();
    const neighborhood = {
      ...insertNeighborhood,
      id,
      highlights: insertNeighborhood.highlights || [],
      schools: insertNeighborhood.schools || null,
      amenities: insertNeighborhood.amenities || null,
      marketTrends: insertNeighborhood.marketTrends || null
    };
    this.neighborhoods.set(id, neighborhood);
    return neighborhood;
  }
};
var storage = new MemStorage();

// server/ai-service.ts
import OpenAI from "openai";
var openai = new OpenAI({
  apiKey: "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"
});
var AIService = class {
  async getPropertyValuation(data) {
    try {
      const prompt = `
        As a real estate AI assistant specializing in Greater Seattle luxury properties, provide a property valuation for:
        
        Address: ${data.address}
        ZIP Code: ${data.zipCode}
        Bedrooms: ${data.beds}
        Bathrooms: ${data.baths}
        Square Feet: ${data.sqft}
        
        Consider these factors:
        - Seattle/Bellevue/Redmond/Spokane market conditions
        - Luxury property premiums
        - Location desirability
        - Property size and layout efficiency
        - Current market trends in Greater Seattle
        
        Provide your response as JSON with:
        - estimatedValue (number, no commas)
        - confidence (0-100 percentage)
        - factors (array of key valuation factors)
        - marketInsights (brief market analysis)
      `;
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert real estate AI assistant specializing in Greater Seattle luxury properties. Provide accurate, professional valuations based on current market data."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 1e3
      });
      const result = JSON.parse(response.choices[0].message.content || "{}");
      return {
        estimatedValue: result.estimatedValue || this.getFallbackValuation(data),
        confidence: result.confidence || 85,
        factors: result.factors || ["Square footage", "Location", "Market conditions"],
        marketInsights: result.marketInsights || "Based on current Greater Seattle market trends."
      };
    } catch (error) {
      console.error("AI valuation error:", error);
      return this.getFallbackValuation(data);
    }
  }
  async getChatResponse(message) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are Garima Bansal's AI assistant for her luxury real estate business in Greater Seattle. You help with:
            
            - Answering questions about properties and services
            - Scheduling consultations and viewings
            - Providing information about Bellevue, Redmond, Seattle, and Spokane areas
            - Explaining the senior downsizing process
            - Home valuation inquiries
            - General real estate guidance
            
            Keep responses professional, helpful, and focused on Garima's expertise in luxury properties and senior downsizing services. Always offer to connect visitors with Garima for personalized service.`
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 300
      });
      return response.choices[0].message.content || "I'm here to help with your real estate needs. Would you like to schedule a consultation with Garima?";
    } catch (error) {
      console.error("AI chat error:", error);
      return this.getFallbackChatResponse(message);
    }
  }
  getFallbackValuation(data) {
    const basePrice = data.sqft * 450;
    const locationMultiplier = data.zipCode.startsWith("980") ? 1.8 : 1.2;
    const estimatedValue = Math.round(basePrice * locationMultiplier);
    return {
      estimatedValue,
      confidence: 75,
      factors: ["Square footage", "Location premium", "Market conditions"],
      marketInsights: "Valuation based on Greater Seattle market averages. Contact Garima for a detailed professional assessment."
    };
  }
  getFallbackChatResponse(message) {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("valuation") || lowerMessage.includes("value")) {
      return "I can help you get an AI-powered home valuation! Please use our home valuation tool on the website to get an instant estimate, or contact Garima directly for a comprehensive market analysis.";
    } else if (lowerMessage.includes("property") || lowerMessage.includes("listing")) {
      return "I can help you find luxury properties in Greater Seattle! Use our property search or let me know your specific requirements and I'll have Garima contact you with personalized recommendations.";
    } else if (lowerMessage.includes("senior") || lowerMessage.includes("downsizing")) {
      return "Garima specializes in compassionate downsizing services for seniors. She provides white-glove service including vendor coordination and emotional support throughout the transition. Would you like to schedule a consultation?";
    } else if (lowerMessage.includes("appointment") || lowerMessage.includes("meeting") || lowerMessage.includes("consultation")) {
      return "I'd be happy to help you schedule a consultation with Garima. She offers free initial consultations to discuss your real estate goals. Please provide your contact information and preferred time.";
    } else {
      return "I'm here to help with your luxury real estate needs in Greater Seattle. Whether you're buying, selling, or need downsizing assistance, I can connect you with Garima's expertise. What can I help you with today?";
    }
  }
};
var aiService = new AIService();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var properties = pgTable("properties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  beds: integer("beds").notNull(),
  baths: decimal("baths", { precision: 3, scale: 1 }).notNull(),
  sqft: integer("sqft").notNull(),
  propertyType: text("property_type").notNull(),
  status: text("status").notNull().default("active"),
  images: text("images").array().notNull().default([]),
  description: text("description"),
  featured: boolean("featured").notNull().default(false),
  mlsId: text("mls_id"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`)
});
var testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull().default(5),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`)
});
var blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  image: text("image"),
  publishedAt: timestamp("published_at").notNull().default(sql`now()`)
});
var inquiries = pgTable("inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  inquiryType: text("inquiry_type").notNull(),
  message: text("message").notNull(),
  propertyId: varchar("property_id").references(() => properties.id),
  createdAt: timestamp("created_at").notNull().default(sql`now()`)
});
var homeValuations = pgTable("home_valuations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  address: text("address").notNull(),
  zipCode: text("zip_code").notNull(),
  beds: integer("beds").notNull(),
  baths: decimal("baths", { precision: 3, scale: 1 }).notNull(),
  sqft: integer("sqft").notNull(),
  email: text("email").notNull(),
  estimatedValue: decimal("estimated_value", { precision: 12, scale: 2 }),
  createdAt: timestamp("created_at").notNull().default(sql`now()`)
});
var neighborhoods = pgTable("neighborhoods", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  highlights: text("highlights").array().notNull().default([]),
  schools: json("schools"),
  amenities: json("amenities"),
  marketTrends: json("market_trends")
});
var insertUserSchema = createInsertSchema(users).omit({
  id: true
});
var insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true
});
var insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true
});
var insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  publishedAt: true
});
var insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true
});
var insertHomeValuationSchema = createInsertSchema(homeValuations).omit({
  id: true,
  estimatedValue: true,
  createdAt: true
});
var insertNeighborhoodSchema = createInsertSchema(neighborhoods).omit({
  id: true
});

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/properties", async (req, res) => {
    try {
      const { limit, featured } = req.query;
      const properties2 = await storage.getProperties(
        limit ? parseInt(limit) : void 0,
        featured ? featured === "true" : void 0
      );
      res.json(properties2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });
  app2.get("/api/properties/search", async (req, res) => {
    try {
      const { city, minPrice, maxPrice, beds, propertyType } = req.query;
      const properties2 = await storage.searchProperties({
        city,
        minPrice: minPrice ? parseFloat(minPrice) : void 0,
        maxPrice: maxPrice ? parseFloat(maxPrice) : void 0,
        beds: beds ? parseInt(beds) : void 0,
        propertyType
      });
      res.json(properties2);
    } catch (error) {
      res.status(500).json({ message: "Failed to search properties" });
    }
  });
  app2.get("/api/properties/:id", async (req, res) => {
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
  app2.get("/api/testimonials", async (req, res) => {
    try {
      const { limit } = req.query;
      const testimonials2 = await storage.getTestimonials(
        limit ? parseInt(limit) : void 0
      );
      res.json(testimonials2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  app2.get("/api/blog", async (req, res) => {
    try {
      const { limit, category } = req.query;
      const posts = await storage.getBlogPosts(
        limit ? parseInt(limit) : void 0,
        category
      );
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });
  app2.get("/api/blog/:id", async (req, res) => {
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
  app2.get("/api/neighborhoods", async (req, res) => {
    try {
      const neighborhoods2 = await storage.getNeighborhoods();
      res.json(neighborhoods2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch neighborhoods" });
    }
  });
  app2.get("/api/neighborhoods/:id", async (req, res) => {
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
  app2.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.issues });
      }
      res.status(500).json({ message: "Failed to create inquiry" });
    }
  });
  app2.post("/api/home-valuations", async (req, res) => {
    try {
      const validatedData = insertHomeValuationSchema.parse(req.body);
      const aiValuation = await aiService.getPropertyValuation({
        address: validatedData.address,
        zipCode: validatedData.zipCode,
        beds: validatedData.beds,
        baths: parseFloat(validatedData.baths.toString()),
        sqft: validatedData.sqft
      });
      const valuationData = {
        ...validatedData,
        estimatedValue: aiValuation.estimatedValue.toString()
      };
      const valuation = await storage.createHomeValuation(valuationData);
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [
    react()
    //tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "3000", 10);
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
})();
