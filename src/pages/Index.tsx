import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Link } from "react-router-dom";
import { useReveal } from "@/hooks/use-reveal";
import { Sparkles, Zap, Shield, Layers, Code2, ArrowRight, Check, Upload, Cpu, Download } from "lucide-react";

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "Get studio-grade cutouts in under 3 seconds. No waiting, no friction." },
  { icon: Cpu, title: "AI Precision", desc: "Pixel-perfect edges, even on hair, fur, and complex transparencies." },
  { icon: Layers, title: "Bulk Processing", desc: "Process hundreds of product photos at once. Built for e-commerce scale." },
  { icon: Code2, title: "Developer API", desc: "Drop our REST API into your workflow. Generous free tier included." },
  { icon: Shield, title: "Privacy First", desc: "Files auto-delete after 24 hours. We never train on your data." },
  { icon: Sparkles, title: "Up to 5K resolution", desc: "Export full-quality PNGs ready for print, web, or marketplace." },
];

const steps = [
  { icon: Upload, title: "Upload", desc: "Drag & drop your image — JPG, PNG, or WEBP up to 10MB." },
  { icon: Cpu, title: "AI Magic", desc: "Our model isolates the subject with photorealistic precision." },
  { icon: Download, title: "Download", desc: "Grab your transparent PNG. Ready for any design tool." },
];

const Marquee = () => (
  <div className="relative py-12 overflow-hidden bg-primary/5 border-y border-primary/10 select-none">
    <div className="flex whitespace-nowrap animate-marquee w-fit">
      {/* First set of items */}
      <div className="flex items-center gap-16 px-8">
        {[...Array(5)].map((_, i) => (
          <div key={`m1-${i}`} className="flex items-center gap-8">
            <span className="text-3xl sm:text-6xl lg:text-7xl font-display font-black text-white/30 hover:text-transparent hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:bg-clip-text hover:opacity-100 transition-all duration-500 cursor-default uppercase whitespace-nowrap">
              Remove Background
            </span>
            <Sparkles className="h-10 w-10 text-primary/40 shrink-0" />
          </div>
        ))}
      </div>
      {/* Second set of items (identical for seamless loop) */}
      <div className="flex items-center gap-16 px-8">
        {[...Array(5)].map((_, i) => (
          <div key={`m2-${i}`} className="flex items-center gap-8">
            <span className="text-4xl sm:text-7xl font-display font-black text-white/30 hover:text-transparent hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:bg-clip-text hover:opacity-100 transition-all duration-500 cursor-default uppercase whitespace-nowrap">
              Remove Background
            </span>
            <Sparkles className="h-10 w-10 text-primary/40 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Index = () => {
  const revealRef1 = useReveal();
  const revealRef2 = useReveal();
  const revealRef3 = useReveal();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute top-10 -right-40 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-float-slow [animation-delay:2s]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-medium text-primary mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Powered by next-gen AI
            </div>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Remove backgrounds.
              <br />
              <span className="gradient-text">Instantly. Perfectly.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              SnapCut AI delivers studio-quality cutouts in seconds. Built for creators,
              e-commerce teams, and developers who refuse to compromise on quality.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
              <Button variant="hero" size="xl" asChild className="w-full sm:w-auto">
                <Link to="/workspace">
                  Try It Free <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="glass" size="xl" asChild className="w-full sm:w-auto">
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-muted-foreground">
              {["No credit card required", "5 free images daily", "Cancel anytime"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-primary shrink-0" /> {t}
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-in-up [animation-delay:200ms] w-full max-w-2xl mx-auto lg:max-w-none">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-card rounded-2xl overflow-hidden shadow-glow">
                <BeforeAfter />
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-4">
              Drag the slider to compare
            </p>
          </div>
        </div>
      </section>

      {/* RUNNING TEXT */}
      <Marquee />

      {/* LOGOS / TRUST */}
      <section className="border-y border-border/50 bg-secondary/20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-muted-foreground">
          <p className="text-xs uppercase tracking-widest w-full text-center lg:w-auto lg:text-left mb-2 lg:mb-0">Trusted by teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {["NOVA Studio", "PixelForge", "ShopRise", "Atlas Design", "Lumen Co."].map((b) => (
              <span key={b} className="font-display font-bold text-base opacity-40 hover:opacity-100 hover:text-primary transition-all cursor-default whitespace-nowrap">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 reveal overflow-hidden" ref={revealRef1}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">How it works</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold">Three steps. Zero friction.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={s.title} className="relative glass-card p-8 rounded-2xl group hover:shadow-glow transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <s.icon className="h-24 w-24" />
                </div>
                <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-gradient-primary grid place-items-center font-bold text-primary-foreground shadow-glow">
                  {i + 1}
                </div>
                <s.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-16 reveal overflow-hidden" ref={revealRef2}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">Features</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold">
              Everything you need.<br />
              <span className="gradient-text">Nothing you don't.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="glass-card p-7 rounded-2xl hover:border-primary/40 transition-all duration-300 group relative overflow-hidden">
                <div className="h-11 w-11 rounded-lg bg-primary/10 grid place-items-center text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-glow transition-all">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                <div className="absolute -bottom-1 -right-1 h-20 w-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 reveal overflow-hidden" ref={revealRef3}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl glass-card p-8 sm:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-hero" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/30 rounded-full blur-[100px]" />
            <div className="relative">
              <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight">
                Ready to <span className="gradient-text">cut the noise</span>?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
                Join thousands of creators using SnapCut AI to ship faster.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button variant="hero" size="xl" asChild className="w-full sm:w-auto">
                  <Link to="/register">Start Free <ArrowRight className="h-5 w-5" /></Link>
                </Button>
                <Button variant="glass" size="xl" asChild className="w-full sm:w-auto">
                  <Link to="/workspace">Try Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
