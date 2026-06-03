import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    desc: "Perfect for trying things out.",
    features: ["5 images per day", "Up to 2K resolution", "JPG, PNG, WEBP", "Standard processing speed", "Community support"],
    cta: "Get Started",
    to: "/workspace",
    highlight: false,
  },
  {
    name: "Pro",
    price: "₹1",
    period: "/month",
    desc: "For creators and small teams.",
    features: ["Unlimited images", "Up to 5K resolution", "Priority processing", "Bulk upload (50 at once)", "Email support", "API access (1k req/mo)"],
    cta: "Start Pro Trial",
    to: "/checkout-sim?plan=pro",
    highlight: true,
  },
  {
    name: "Business",
    price: "₹3999",
    period: "/month",
    desc: "Built for high-volume teams.",
    features: ["Everything in Pro", "Bulk upload (500 at once)", "API access (50k req/mo)", "Team workspace (5 seats)", "Dedicated SLA", "Priority support"],
    cta: "Contact Sales",
    to: "/checkout-sim?plan=business",
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 flex-1 overflow-hidden">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">Pricing</p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Simple, <span className="gradient-text">scalable pricing</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Start free. Upgrade when you need more. Cancel anytime.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative glass-card rounded-3xl p-8 sm:p-10 flex flex-col transition-all duration-500 hover:translate-y-[-8px] ${
                t.highlight ? "ring-2 ring-primary shadow-glow bg-primary/5" : "hover:border-primary/30"
              }`}
            >
              {t.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-primary text-[10px] font-bold text-primary-foreground tracking-widest uppercase shadow-glow">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="font-display text-2xl font-bold">{t.name}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{t.desc}</p>
              </div>
              <div className="mb-8 flex items-baseline gap-1">
                <span className="font-display text-5xl sm:text-6xl font-bold tracking-tight">{t.price}</span>
                <span className="text-muted-foreground font-medium">{t.period}</span>
              </div>
              <ul className="space-y-4 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={t.highlight ? "hero" : "outline"}
                size="xl"
                className="mt-10 w-full font-bold"
                asChild
              >
                <Link to={t.to}>{t.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center text-sm text-muted-foreground border-t border-border/50 pt-10">
          Need more? <Link to="/contact" className="text-primary font-semibold hover:underline">Contact us</Link> for enterprise pricing & custom volume.
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
