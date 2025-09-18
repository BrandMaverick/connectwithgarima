import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { BlogPost } from "@shared/schema";

export default function BlogResources() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
    queryFn: async () => {
      const res = await fetch("/api/blog?limit=3");
      if (!res.ok) throw new Error("Failed to fetch blog posts");
      return res.json();
    },
  });

  const formatDate = (date: string | Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };

  if (isLoading) {
    return (
      <section id="blog" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-luxury font-bold text-luxury-navy mb-6">
              Market Insights & Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Loading latest insights...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <article key={i} className="bg-gray-50 rounded-xl overflow-hidden shadow-lg animate-pulse">
                <div className="w-full h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-luxury font-bold text-luxury-navy mb-6">
            Market Insights & Resources
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest luxury market trends, selling tips, and expert advice tailored for Seattle-area homeowners.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((post) => (
            <article key={post.id} className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img
                src={post.image || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                  <span className="mx-2">•</span>
                  <span>{post.category}</span>
                </div>
                <h3 className="text-xl font-semibold text-luxury-navy mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <button className="text-luxury-gold font-medium hover:text-yellow-600 transition-colors inline-flex items-center">
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-luxury-navy text-white hover:bg-slate-700 transition-colors">
            <BookOpen className="mr-2 h-4 w-4" />
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
}
