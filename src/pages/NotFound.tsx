import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const NotFound = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 grid place-items-center container py-20 text-center">
        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-primary/20 blur-[120px]" />
          <p className="font-display text-9xl font-extrabold gradient-text">404</p>
          <h1 className="mt-4 font-display text-3xl font-bold">Page not found</h1>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            We couldn't find <code className="text-primary">{pathname}</code>. It may have been moved or never existed.
          </p>
          <Button variant="hero" size="lg" className="mt-8" asChild>
            <Link to="/">Back to home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
