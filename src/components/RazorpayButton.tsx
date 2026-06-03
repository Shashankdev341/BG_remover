import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface RazorpayButtonProps {
  amount: number;
  planName: string;
  onSuccess: (response: any) => void;
}

export const RazorpayButton: React.FC<RazorpayButtonProps> = ({ amount, planName, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  console.warn("RazorpayButton Component Rendered for:", planName);

  const handlePayment = async () => {
    console.warn("Pay button clicked!");
    setLoading(true);
    
    const key = (import.meta.env.VITE_RAZORPAY_KEY_ID || "").trim();
    console.warn("--- Razorpay Debug ---");
    console.warn("Key from Env:", key ? `[${key.substring(0, 10)}...]` : "NOT FOUND");
    console.warn("Key Length:", key.length);
    console.warn("Amount (Paise):", amount * 100);
    console.warn("----------------------");
    
    if (!key) {
      toast.error('Razorpay Key ID is missing in .env file.');
      setLoading(false);
      return;
    }

    if (!(window as any).Razorpay) {
      toast.error('Razorpay SDK not loaded. Please check your internet connection and refresh.');
      setLoading(false);
      return;
    }

    const options = {
      key: key,
      amount: Math.round(amount * 100), // Ensure it's an integer
      currency: 'INR',
      name: 'SnapCut AI',
      description: `Subscription for ${planName}`,
      image: '/snapcut-logo.png',
      handler: function (response: any) {
        setLoading(false);
        onSuccess(response);
      },
      modal: {
        ondismiss: function() {
          setLoading(false);
          console.log('Checkout modal closed');
        }
      },
      prefill: {
        name: 'User Name',
        email: 'user@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'SnapCut AI Office',
        plan: planName
      },
      theme: {
        color: '#0EA5FF',
      },
    };

    try {
      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Razorpay Error:", error);
      toast.error("Failed to initialize payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Button 
      variant="hero" 
      size="xl" 
      className="w-full mt-8 font-bold h-14" 
      onClick={handlePayment}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin mr-3" />
          Initializing...
        </>
      ) : (
        `Pay ₹${amount}`
      )}
    </Button>
  );
};
