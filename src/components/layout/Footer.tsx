import { Link } from "react-router-dom";
import logo from "@/assets/snapcut-logo.png";
import { Twitter, Github, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
        <div className="sm:col-span-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <img src={logo} alt="SnapCut AI" className="h-8 w-auto" />
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            Studio-quality background removal powered by AI. Fast, accurate, and built for creators and teams.
          </p>
          <div className="flex gap-3 mt-6">
            {[Twitter, Github, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-10 w-10 grid place-items-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all"
                aria-label="social link"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {[
          { title: "Product", links: [["Features", "/#features"], ["Pricing", "/pricing"], ["API", "#"]] },
          { title: "Company", links: [["About", "#"], ["Contact", "#"], ["Blog", "#"]] },
          { title: "Legal", links: [["Privacy", "#"], ["Terms", "#"]] },
        ].map((col) => (
          <div key={col.title} className="flex flex-col">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">{col.title}</h4>
            <ul className="mt-4 space-y-3">
              {col.links.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground text-center md:text-left">
          <p>© {new Date().getFullYear()} SnapCut AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p>Made with precision pixels.</p>
            <div className="h-4 w-px bg-border/50 hidden md:block" />
            <p className="hidden md:block">v1.2.0</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
