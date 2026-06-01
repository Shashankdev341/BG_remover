import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Image, Zap, CreditCard, TrendingUp, ArrowUpRight, Download } from "lucide-react";
import { useQuota } from "@/hooks/use-quota";
import { useSubscription } from "@/hooks/use-subscription";

const recent = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  name: `cutout-${1000 + i}.png`,
  date: `${i + 1}h ago`,
}));

const Dashboard = () => {
  const { used, limit } = useQuota();
  const { plan } = useSubscription();

  const stats = [
    { label: "Images this week", value: "23", icon: Image, change: "+12%" },
    { label: "Daily quota", value: `${used} / ${limit === Infinity ? "∞" : limit}`, icon: Zap, change: "" },
    { label: "Plan", value: plan.charAt(0).toUpperCase() + plan.slice(1), icon: CreditCard, change: "" },
    { label: "Total cutouts", value: "147", icon: TrendingUp, change: "+8%" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">
              Welcome back 👋
            </h1>
            <p className="mt-2 text-muted-foreground">Here's what's happening with your cutouts.</p>
          </div>
          <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
            <Link to="/workspace">New Cutout</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="h-9 w-9 rounded-lg bg-primary/10 grid place-items-center text-primary">
                  <s.icon className="h-4 w-4" />
                </div>
                {s.change && <span className="text-xs text-success font-semibold">{s.change}</span>}
              </div>
              <p className="mt-4 text-[10px] text-muted-foreground uppercase tracking-widest">{s.label}</p>
              <p className="mt-1 font-display text-2xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold">Recent cutouts</h2>
              <Link to="/workspace" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                View all <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {recent.map((r) => (
                <div key={r.id} className="group cursor-pointer">
                  <div className="aspect-square rounded-xl checkered relative overflow-hidden border border-border group-hover:border-primary transition-colors">
                    <div className="absolute inset-0 grid place-items-center text-muted-foreground/40">
                      <Image className="h-8 w-8" />
                    </div>
                    <div className="absolute inset-0 bg-background/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center">
                      <Button variant="glow" size="sm"><Download className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                  <p className="mt-2 text-xs font-medium truncate">{r.name}</p>
                  <p className="text-[10px] text-muted-foreground">{r.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upgrade card */}
          <div className="relative glass-card rounded-2xl p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-hero" />
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-accent/30 rounded-full blur-[60px]" />
            <div className="relative">
              <h3 className="font-display text-2xl font-bold">Upgrade to Pro</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Unlimited cutouts, 5K resolution, priority processing, and API access.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {["Unlimited daily images", "Up to 5K resolution", "Bulk processing", "API access"].map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" /> {f}
                  </li>
                ))}
              </ul>
              <Button variant="hero" size="xl" className="mt-8 w-full" asChild>
                <Link to="/pricing">Upgrade — $12/mo</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
