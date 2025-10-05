import { type User, type InsertUser, type Property, type InsertProperty, type Testimonial, type InsertTestimonial, type BlogPost, type InsertBlogPost, type Inquiry, type InsertInquiry, type HomeValuation, type InsertHomeValuation, type Neighborhood, type InsertNeighborhood, type House, type InsertOpenHouse} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Properties
  getProperties(limit?: number, featured?: boolean): Promise<Property[]>;
  getProperty(id: string): Promise<Property | undefined>;
  searchProperties(filters: {
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    beds?: number;
    propertyType?: string;
  }): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  
  // Testimonials
  getTestimonials(limit?: number): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Blog Posts
  getBlogPosts(limit?: number, category?: string): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Inquiries
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  
  // Home Valuations
  createHomeValuation(valuation: InsertHomeValuation): Promise<HomeValuation>;
  
  // Neighborhoods
  getNeighborhoods(): Promise<Neighborhood[]>;
  getNeighborhood(id: string): Promise<Neighborhood | undefined>;
  createNeighborhood(neighborhood: InsertNeighborhood): Promise<Neighborhood>;

  createOpenHouse(house: InsertOpenHouse): Promise<House>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private properties: Map<string, Property> = new Map();
  private testimonials: Map<string, Testimonial> = new Map();
  private blogPosts: Map<string, BlogPost> = new Map();
  private inquiries: Map<string, Inquiry> = new Map();
  private homeValuations: Map<string, HomeValuation> = new Map();
  private neighborhoods: Map<string, Neighborhood> = new Map();
  private houses: Map<string, House> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed testimonials
    const testimonialData: Omit<Testimonial, 'id' | 'createdAt'>[] = [
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

    testimonialData.forEach(testimonial => {
      const id = randomUUID();
      this.testimonials.set(id, {
        ...testimonial,
        id,
        createdAt: new Date()
      });
    });

    // Seed properties
    const propertyData: Omit<Property, 'id' | 'createdAt'>[] = [
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

    propertyData.forEach(property => {
      const id = randomUUID();
      this.properties.set(id, {
        ...property,
        id,
        createdAt: new Date()
      });
    });

    // Seed blog posts
    const blogData: Omit<BlogPost, 'id' | 'publishedAt'>[] = [
      {
        title: "2025  Luxury Market Report",
        excerpt: "Although buyers remained highly engaged in August, approaching the market with more intentionality, it is now sellers that appeared to be more restrained, limiting the flow of new inventory and slowing the pace of overall supply.",
        content: " The North American luxury real estate market in 2025...",
        category: "Market Trends",
        image: "LuxuryMarketReport.jpg",
        link: "https://www.luxuryhomemarketing.com/assets/LMR_NorthAmerica.pdf"
      },
      {
        title: "The Complete Guide to Downsizing After 65",
        excerpt: "Essential tips and emotional guidance for seniors transitioning to their next home, including financial considerations and timing strategies.",
        content: "The United States Census Bureau estimates that the average individual will move 11.7 times throughout their lifetime....",
        category: "Senior Services",
        image: "Downsizingtips-blog.jpg",
        link: "https://todayshomeowner.com/moving/guides/complete-guide-to-downsizing-for-seniors/"
      },
      {
        title: "How Artificial Intelligence Is Changing The Real Estate Market",
        excerpt: "Discover how artificial intelligence provides more accurate home valuations and market insights for both buyers and sellers in today's market.",
        content: "Artificial intelligence is transforming how we value properties...",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        link: "https://www.forbes.com/councils/forbestechcouncil/2024/10/30/how-artificial-intelligence-is-changing-the-real-estate-market/"
      }
    ];

    blogData.forEach(post => {
      const id = randomUUID();
      this.blogPosts.set(id, {
        ...post,
        id,
        publishedAt: new Date()
      });
    });

    // Seed neighborhoods
    const neighborhoodData: Omit<Neighborhood, 'id'>[] = [
      {
        name: "Bellevue",
        description: "Upscale suburban living with world-class shopping and dining",
        image: "Bellevue.jpg",
        highlights: ["Bellevue Square", "Top-rated schools", "Tech corridor"],
        schools: { rating: 9.5, notable: ["Bellevue High School", "Newport High School"] },
        amenities: { shopping: "Bellevue Square", parks: "Bellevue Downtown Park" },
        marketTrends: { medianPrice: "$1,850,000", appreciation: "8.2%" },
        link: "https://bellevuewa.gov/resident-resources/newcomers-guide"
      },
      {
        name: "Redmond",
        description: "Tech hub with excellent schools and family amenities",
        image: "Redmond.jpeg",
        highlights: ["Microsoft Campus", "Marymoor Park", "Family-friendly"],
        schools: { rating: 9.7, notable: ["Redmond High School", "Eastlake High School"] },
        amenities: { recreation: "Marymoor Park", shopping: "Redmond Town Center" },
        marketTrends: { medianPrice: "$1,650,000", appreciation: "7.8%" },
        link: "https://experienceredmond.com/"
      },
      {
        name: "Seattle",
        description: "Urban sophistication with cultural richness",
        image: "Seattle.jpeg",
        highlights: ["Space Needle", "Pike Place Market", "Waterfront"],
        schools: { rating: 8.5, notable: ["Roosevelt High School", "Garfield High School"] },
        amenities: { culture: "Seattle Art Museum", dining: "Pike Place Market" },
        marketTrends: { medianPrice: "$1,250,000", appreciation: "6.5%" },
        link: "https://visitseattle.org/explore/visitor-information/ovg/"
      },
      {
        name: "Issaquah",
        description: "Affordable luxury with outdoor recreation",
        image: "Issaquah.jpeg",
        highlights: ["Riverfront Park", "Gonzaga University", "Outdoor recreation"],
        schools: { rating: 8.0, notable: ["Lewis and Clark High School"] },
        amenities: { recreation: "Riverfront Park", culture: "Northwest Museum" },
        marketTrends: { medianPrice: "$485,000", appreciation: "12.3%" },
        link: "https://www.issaquahwa.gov/8/Our-Residents"
      }
    ];

    neighborhoodData.forEach(neighborhood => {
      const id = randomUUID();
      this.neighborhoods.set(id, { ...neighborhood, id });
    });

    // Seed Open Houses
    const houseData: Omit<House, 'id'>[] = [
      {
        image: "OpenHouse_Flyer_10_4_2025.jpg",
      },
      {
        image: "OpenHouse_Flyer_10_5_2025.jpg",
      },
      {
        image: "OpenHouse_Flyer_1.jpg",
      },
      {
        image: "OpenHouse_Flyer_2.jpg",
      }
    ];

    houseData.forEach(house => {
      const id = randomUUID();
      this.houses.set(id, { ...house, id });
    });
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Properties
  async getProperties(limit?: number, featured?: boolean): Promise<Property[]> {
    let properties = Array.from(this.properties.values());
    
    if (featured !== undefined) {
      properties = properties.filter(p => p.featured === featured);
    }
    
    properties.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    if (limit) {
      properties = properties.slice(0, limit);
    }
    
    return properties;
  }

  async getProperty(id: string): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async searchProperties(filters: {
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    beds?: number;
    propertyType?: string;
  }): Promise<Property[]> {
    let properties = Array.from(this.properties.values());
    
    if (filters.city) {
      properties = properties.filter(p => 
        p.city.toLowerCase().includes(filters.city!.toLowerCase())
      );
    }
    
    if (filters.minPrice) {
      properties = properties.filter(p => parseFloat(p.price) >= filters.minPrice!);
    }
    
    if (filters.maxPrice) {
      properties = properties.filter(p => parseFloat(p.price) <= filters.maxPrice!);
    }
    
    if (filters.beds) {
      properties = properties.filter(p => p.beds >= filters.beds!);
    }
    
    if (filters.propertyType) {
      properties = properties.filter(p => p.propertyType === filters.propertyType);
    }
    
    return properties;
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = randomUUID();
    const property: Property = { 
      ...insertProperty,
      id, 
      status: insertProperty.status || "active",
      images: insertProperty.images ?? [],
      description: insertProperty.description ?? null,
      featured: insertProperty.featured ?? false,
      mlsId: insertProperty.mlsId ?? null,
      createdAt: new Date() 
    };
    this.properties.set(id, property);
    return property;
  }

  // Testimonials
  async getTestimonials(limit?: number): Promise<Testimonial[]> {
    let testimonials = Array.from(this.testimonials.values());
    testimonials.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    if (limit) {
      testimonials = testimonials.slice(0, limit);
    }
    
    return testimonials;
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { 
      ...insertTestimonial,
      id,
      rating: insertTestimonial.rating || 5,
      avatar: insertTestimonial.avatar !== undefined ? insertTestimonial.avatar : null,
      createdAt: new Date() 
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Blog Posts
  async getBlogPosts(limit?: number, category?: string): Promise<BlogPost[]> {
    let posts = Array.from(this.blogPosts.values());
    
    if (category) {
      posts = posts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    
    posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
    
    if (limit) {
      posts = posts.slice(0, limit);
    }
    
    return posts;
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = { 
      ...insertPost,
      id,
      image: insertPost.image || null,
      publishedAt: new Date() 
    };
    this.blogPosts.set(id, post);
    return post;
  }

  // Inquiries
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = randomUUID();
    const inquiry: Inquiry = { 
      ...insertInquiry,
      id,
      phone: insertInquiry.phone || null,
      propertyId: insertInquiry.propertyId || null,
      createdAt: new Date() 
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  // Home Valuations
  async createHomeValuation(insertValuation: InsertHomeValuation & { estimatedValue?: string }): Promise<HomeValuation> {
    const id = randomUUID();
    
    const valuation: HomeValuation = { 
      ...insertValuation,
      id, 
      estimatedValue: insertValuation.estimatedValue || null,
      createdAt: new Date() 
    };
    this.homeValuations.set(id, valuation);
    return valuation;
  }

  // Neighborhoods
  async getNeighborhoods(): Promise<Neighborhood[]> {
    return Array.from(this.neighborhoods.values());
  }

  // Open Houses
  async getOpenHouses(): Promise<House[]> {
    return Array.from(this.houses.values());
  }

  async getNeighborhood(id: string): Promise<Neighborhood | undefined> {
    return this.neighborhoods.get(id);
  }

  async createNeighborhood(insertNeighborhood: InsertNeighborhood): Promise<Neighborhood> {
    const id = randomUUID();
    const neighborhood: Neighborhood = { 
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

  async createOpenHouse(insertHouse: InsertOpenHouse): Promise<House> {
    const id = randomUUID();
    const house: House = { 
      ...insertHouse,
      id
    };
    this.houses.set(id, house);
    return house;
  }
}

export const storage = new MemStorage();
