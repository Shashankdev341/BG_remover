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
      <main className="flex-1 container py-12 flex items-center justify-center">
        <div className="max-w-4xl w-full grid lg:grid-cols-2 gap-8 items-start">
          {/* Order Summary */}
          <div className="space-y-6">
            <Link to="/pricing" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to pricing
            </Link>
            <div>
              <h1 className="font-display text-3xl font-bold">Subscribe to SnapCut</h1>
              <p className="mt-2 text-muted-foreground">This is a simulated secure checkout environment.</p>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold">{name}</p>
                  <p className="text-sm text-muted-foreground">Monthly subscription</p>
                </div>
                <p className="font-bold">{price}</p>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between text-sm">
                <p className="text-muted-foreground">Subtotal</p>
                <p>{price}</p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p className="text-muted-foreground">Tax</p>
                <p>$0.00</p>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between font-bold text-lg">
                <p>Total due today</p>
                <p className="text-primary">{price}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 text-primary text-xs">
              <ShieldCheck className="h-5 w-5 shrink-0" />
              <p>Secure simulated encryption active. Your data never leaves this page.</p>
            </div>
          </div>

          {/* Payment Form Simulation */}
          <div className="glass-card rounded-2xl p-8 shadow-glow border-primary/20 bg-background">
            <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
              <CreditCard className="h-5 w-5" /> Payment Details
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Card Information</label>
                <div className="p-3 rounded-md border bg-secondary/30 text-sm text-muted-foreground italic">
                  Simulated Card Field (No input required)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Expiry Date</label>
                  <div className="p-3 rounded-md border bg-secondary/30 text-sm text-muted-foreground italic">MM / YY</div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">CVC</label>
                  <div className="p-3 rounded-md border bg-secondary/30 text-sm text-muted-foreground italic">***</div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Country</label>
                <div className="p-3 rounded-md border bg-secondary/30 text-sm italic text-muted-foreground">United States</div>
              </div>

              <Button 
                variant="hero" 
                size="xl" 
                className="w-full mt-6" 
                onClick={handleComplete}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  `Pay ${price}`
                )}
              </Button>
              <p className="text-[10px] text-center text-muted-foreground mt-4 leading-relaxed">
                By clicking "Pay", you agree to our simulated Terms of Service. This is a demonstration flow and no real charges will be made.
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
