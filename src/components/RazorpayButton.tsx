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

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
    
    if (!key || key.includes('YOUR_KEY_ID_HERE')) {
      toast.error('Invalid Razorpay Key ID', { 
        description: 'Please update VITE_RAZORPAY_KEY_ID in your .env file with your real test key.' 
      });
      return;
    }

    setLoading(true);
    const res = await loadRazorpayScript();

    if (!res) {
      toast.error('Razorpay SDK failed to load. Are you online?');
      setLoading(false);
      return;
    }

    // In a real implementation, you would call your backend here to create an order
    // const orderData = await fetch('/api/create-order', { method: 'POST', body: JSON.stringify({ amount }) }).then(t => t.json());
    
    // For demonstration, we'll use a dummy order ID or let Razorpay handle it (Standard Checkout)
    // Note: Standard Checkout without Order ID is less secure and not recommended for production.
    
    const options = {
      key: key, // Use the validated key
      amount: amount * 100,
      currency: 'INR',
      name: 'SnapCut AI',
      description: `Subscription for ${planName}`,
      image: '/snapcut-logo.png',
      handler: function (response: any) {
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
      },
      theme: {
        color: '#0EA5FF',
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
    setLoading(false);
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
