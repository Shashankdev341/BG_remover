import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useSubscription, Plan } from "@/hooks/use-subscription";
import { toast } from "sonner";
import { ShieldCheck, CreditCard, ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";

const CheckoutSim = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updatePlan } = useSubscription();
  const plan = (searchParams.get("plan") || "pro") as Plan;
  const [isProcessing, setIsProcessing] = useState(false);

  const price = plan === "business" ? "$49" : "$12";
  const name = plan === "business" ? "Business Plan" : "Pro Plan";

  const handleComplete = () => {
    setIsProcessing(true);
    // Simulate network delay
    setTimeout(() => {
      updatePlan(plan);
      toast.success(`Welcome to ${name}!`, { 
        description: "Your subscription is now active. Enjoy unlimited cutouts!" 
      });
      setIsProcessing(false);
      navigate("/workspace");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary/20">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Order Summary */}
          <div className="space-y-8">
            <Link to="/pricing" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to pricing
            </Link>
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold">Subscribe to SnapCut</h1>
              <p className="mt-3 text-muted-foreground leading-relaxed text-sm sm:text-base">This is a simulated secure checkout environment for your subscription.</p>
            </div>

            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-lg">{name}</p>
                  <p className="text-sm text-muted-foreground mt-1">Monthly subscription</p>
                </div>
                <p className="font-bold text-lg">{price}</p>
              </div>
              <div className="h-px bg-border/50" />
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p className="font-medium">{price}</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <p className="text-muted-foreground">Tax</p>
                  <p className="font-medium">$0.00</p>
                </div>
              </div>
              <div className="h-px bg-border/50" />
              <div className="flex items-center justify-between font-bold text-xl">
                <p>Total due today</p>
                <p className="text-primary">{price}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-primary/5 text-primary text-xs leading-relaxed border border-primary/10">
              <ShieldCheck className="h-5 w-5 shrink-0 mt-0.5" />
              <p>Secure simulated encryption active. Your real payment data is never required and never leaves this page.</p>
            </div>
          </div>

          {/* Payment Form Simulation */}
          <div className="glass-card rounded-3xl p-8 sm:p-10 shadow-glow border-primary/20 bg-background relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <CreditCard className="h-32 w-32" />
            </div>
            
            <h2 className="font-display text-xl sm:text-2xl font-bold mb-8 flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-primary" /> Payment Details
            </h2>
            
            <div className="space-y-6 relative">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Card Information</label>
                <div className="p-4 rounded-xl border bg-secondary/30 text-sm text-muted-foreground italic flex items-center justify-between">
                  <span>Simulated Card Field</span>
                  <div className="flex gap-1">
                    <div className="h-5 w-8 bg-muted rounded-sm" />
                    <div className="h-5 w-8 bg-muted rounded-sm" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Expiry Date</label>
                  <div className="p-4 rounded-xl border bg-secondary/30 text-sm text-muted-foreground italic">MM / YY</div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">CVC</label>
                  <div className="p-4 rounded-xl border bg-secondary/30 text-sm text-muted-foreground italic">***</div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Country</label>
                <div className="p-4 rounded-xl border bg-secondary/30 text-sm italic text-muted-foreground">United States</div>
              </div>

              <Button 
                variant="hero" 
                size="xl" 
                className="w-full mt-8 font-bold h-14" 
                onClick={handleComplete}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-3" />
                    Processing...
                  </>
                ) : (
                  `Pay ${price}`
                )}
              </Button>
              <p className="text-[10px] text-center text-muted-foreground mt-6 leading-relaxed px-4">
                By clicking "Pay", you agree to our simulated <span className="text-primary">Terms of Service</span>. This is a demonstration flow and no real charges will be made.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutSim;
