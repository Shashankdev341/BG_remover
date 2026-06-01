import { Link } from "react-router-dom";
import logo from "@/assets/snapcut-logo.png";
import { Twitter, Github, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 mt-24">
      <div className="container py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <img src={logo} alt="SnapCut AI" className="h-8 w-auto" />
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            Studio-quality background removal powered by AI. Fast, accurate, and built for creators and teams.
          </p>
          <div className="flex gap-3 mt-5">
            {[Twitter, Github, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 grid place-items-center rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                aria-label="social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {[
          { title: "Product", links: [["Features", "/#features"], ["Pricing", "/pricing"], ["API", "#"]] },
          { title: "Company", links: [["About", "#"], ["Contact", "#"], ["Blog", "#"]] },
          { title: "Legal", links: [["Privacy", "#"], ["Terms", "#"]] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
            <ul className="mt-4 space-y-2">
              {col.links.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/50">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} SnapCut AI. All rights reserved.</p>
          <p>Made with precision pixels.</p>
        </div>
      </div>
    </footer>
  );
};
