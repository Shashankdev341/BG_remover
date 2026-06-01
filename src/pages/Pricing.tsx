import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Perfect for trying things out.",
    features: ["5 images per day", "Up to 2K resolution", "JPG, PNG, WEBP", "Standard processing speed", "Community support"],
    cta: "Get Started",
    to: "/workspace",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    desc: "For creators and small teams.",
    features: ["Unlimited images", "Up to 5K resolution", "Priority processing", "Bulk upload (50 at once)", "Email support", "API access (1k req/mo)"],
    cta: "Start Pro Trial",
    to: "/checkout-sim?plan=pro",
    highlight: true,
  },
  {
    name: "Business",
    price: "$49",
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
      <main className="container py-20 flex-1">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Pricing</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold">
            Simple, <span className="gradient-text">scalable pricing</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free. Upgrade when you need more. Cancel anytime.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative glass-card rounded-2xl p-8 flex flex-col ${
                t.highlight ? "ring-2 ring-primary shadow-glow" : ""
              }`}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground">
                  MOST POPULAR
                </div>
              )}
              <h3 className="font-display text-2xl font-bold">{t.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold">{t.price}</span>
                <span className="text-muted-foreground">{t.period}</span>
              </div>
              <ul className="mt-8 space-y-3 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={t.highlight ? "hero" : "outline"}
                size="lg"
                className="mt-8 w-full"
                asChild
              >
                <Link to={t.to}>{t.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center text-sm text-muted-foreground">
          Need more? <Link to="/contact" className="text-primary hover:underline">Contact us</Link> for enterprise pricing & custom volume.
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
