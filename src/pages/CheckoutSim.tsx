import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useSubscription, Plan } from "@/hooks/use-subscription";
import { toast } from "sonner";
import { ShieldCheck, CreditCard, ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { RazorpayButton } from "@/components/RazorpayButton";

const CheckoutSim = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updatePlan } = useSubscription();
  const plan = (searchParams.get("plan") || "pro") as Plan;
  const [isProcessing, setIsProcessing] = useState(false);

  const priceUSD = plan === "business" ? 49 : 12;
  const priceINR = plan === "business" ? 3999 : 999;
  const name = plan === "business" ? "Business Plan" : "Pro Plan";

  const handlePaymentSuccess = (response: any) => {
    setIsProcessing(true);
    console.log("Payment Successful:", response);
    
    // In a real app, you MUST verify the payment signature on your backend before granting access
    // For this demo, we'll simulate the backend verification
    setTimeout(() => {
      updatePlan(plan);
      toast.success(`Welcome to ${name}!`, { 
        description: "Payment verified. Your subscription is now active." 
      });
      setIsProcessing(false);
      navigate("/workspace");
    }, 1000);
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
              <p className="mt-3 text-muted-foreground leading-relaxed text-sm sm:text-base">Secure payment via Razorpay. Choose your preferred payment method in the next step.</p>
            </div>

            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-lg">{name}</p>
                  <p className="text-sm text-muted-foreground mt-1">Monthly subscription</p>
                </div>
                <p className="font-bold text-lg">₹{priceINR}</p>
              </div>
              <div className="h-px bg-border/50" />
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p className="font-medium">₹{priceINR}</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <p className="text-muted-foreground">Tax (GST 18% included)</p>
                  <p className="font-medium">₹0.00</p>
                </div>
              </div>
              <div className="h-px bg-border/50" />
              <div className="flex items-center justify-between font-bold text-xl">
                <p>Total due today</p>
                <p className="text-primary">₹{priceINR}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-primary/5 text-primary text-xs leading-relaxed border border-primary/10">
              <ShieldCheck className="h-5 w-5 shrink-0 mt-0.5" />
              <p>Secure encrypted transaction. Your payment information is processed directly by Razorpay and never stored on our servers.</p>
            </div>
          </div>

          {/* Payment Card */}
          <div className="glass-card rounded-3xl p-8 sm:p-10 shadow-glow border-primary/20 bg-background relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <CreditCard className="h-32 w-32" />
            </div>
            
            <h2 className="font-display text-xl sm:text-2xl font-bold mb-8 flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-primary" /> Checkout
            </h2>
            
            <div className="space-y-6 relative">
              <div className="p-6 rounded-2xl border bg-secondary/20 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Product</span>
                  <span className="text-sm font-bold">{name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="text-sm font-bold text-primary">₹{priceINR}</span>
                </div>
              </div>

              {isProcessing ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  <p className="text-sm font-medium">Verifying payment...</p>
                </div>
              ) : (
                <RazorpayButton 
                  amount={priceINR} 
                  planName={name} 
                  onSuccess={handlePaymentSuccess} 
                />
              )}

              <p className="text-[10px] text-center text-muted-foreground mt-6 leading-relaxed px-4">
                By clicking "Pay", you agree to our <span className="text-primary">Terms of Service</span> and <span className="text-primary">Privacy Policy</span>. Transactions are handled by Razorpay Software Pvt. Ltd.
              </p>
              
              <div className="flex justify-center gap-4 opacity-50 grayscale mt-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1200px-Stripe_Logo%2C_revised_2016.svg.png" alt="Stripe" className="h-4 hidden" />
                <div className="flex gap-2">
                  <div className="h-5 w-8 bg-muted rounded-sm" />
                  <div className="h-5 w-8 bg-muted rounded-sm" />
                  <div className="h-5 w-8 bg-muted rounded-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutSim;

