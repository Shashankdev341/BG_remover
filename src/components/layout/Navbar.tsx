import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/snapcut-logo.png";
import { Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { useSubscription } from "@/hooks/use-subscription";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/workspace", label: "Workspace" },
  { to: "/pricing", label: "Pricing" },
  { to: "/dashboard", label: "Dashboard" },
];

export const Navbar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const { plan, isPro } = useSubscription();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 backdrop-blur-xl bg-background/60 border-b border-border/50" />
      <nav className="relative container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="SnapCut AI logo"
              className="h-9 w-auto transition-transform group-hover:scale-105"
            />
            <span className="sr-only">SnapCut AI</span>
          </Link>
          {isPro && (
            <Badge variant="secondary" className="hidden sm:flex items-center gap-1 bg-primary/20 text-primary border-primary/30 uppercase text-[10px] font-bold tracking-wider">
              <Zap className="h-3 w-3 fill-primary" /> {plan}
            </Badge>
          )}
        </div>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 group/nav`}
            >
              <span className={`relative z-10 transition-all duration-300 ${
                pathname === item.to
                  ? "gradient-text font-bold"
                  : "text-white group-hover/nav:gradient-text"
              }`}>
                {item.label}
              </span>
              <div className="absolute inset-0 bg-secondary/40 opacity-0 group-hover/nav:opacity-100 rounded-md transition-all duration-300" />
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-primary to-accent group-hover/nav:w-full transition-all duration-500" />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button variant="hero" size="sm" asChild>
            <Link to="/workspace">Get Started</Link>
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden relative border-t border-border/50 bg-background/95 backdrop-blur-xl">
          <div className="container py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md flex items-center justify-between"
              >
                {item.label}
                {item.to === "/workspace" && isPro && (
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px]">{plan}</Badge>
                )}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Button variant="ghost" size="sm" className="flex-1" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button variant="hero" size="sm" className="flex-1" asChild>
                <Link to="/workspace">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
