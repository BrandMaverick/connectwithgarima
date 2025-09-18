import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const properties = pgTable("properties", {
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
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull().default(5),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  image: text("image"),
  publishedAt: timestamp("published_at").notNull().default(sql`now()`),
});

export const inquiries = pgTable("inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  inquiryType: text("inquiry_type").notNull(),
  message: text("message").notNull(),
  propertyId: varchar("property_id").references(() => properties.id),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const homeValuations = pgTable("home_valuations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  address: text("address").notNull(),
  zipCode: text("zip_code").notNull(),
  beds: integer("beds").notNull(),
  baths: decimal("baths", { precision: 3, scale: 1 }).notNull(),
  sqft: integer("sqft").notNull(),
  email: text("email").notNull(),
  estimatedValue: decimal("estimated_value", { precision: 12, scale: 2 }),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const neighborhoods = pgTable("neighborhoods", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  highlights: text("highlights").array().notNull().default([]),
  schools: json("schools"),
  amenities: json("amenities"),
  marketTrends: json("market_trends"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  publishedAt: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
});

export const insertHomeValuationSchema = createInsertSchema(homeValuations).omit({
  id: true,
  estimatedValue: true,
  createdAt: true,
});

export const insertNeighborhoodSchema = createInsertSchema(neighborhoods).omit({
  id: true,
});

// Select types
export type User = typeof users.$inferSelect;
export type Property = typeof properties.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
export type HomeValuation = typeof homeValuations.$inferSelect;
export type Neighborhood = typeof neighborhoods.$inferSelect;

// Insert types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type InsertHomeValuation = z.infer<typeof insertHomeValuationSchema>;
export type InsertNeighborhood = z.infer<typeof insertNeighborhoodSchema>;
