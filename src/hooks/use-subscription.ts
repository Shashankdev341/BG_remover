import { useState, useEffect } from "react";

export type Plan = "free" | "pro" | "business";

const SUBSCRIPTION_KEY = "snapcut_subscription";

export const useSubscription = () => {
  const [plan, setPlan] = useState<Plan>("free");

  useEffect(() => {
    const stored = localStorage.getItem(SUBSCRIPTION_KEY);
    if (stored) {
      setPlan(stored as Plan);
    }
  }, []);

  const updatePlan = (newPlan: Plan) => {
    localStorage.setItem(SUBSCRIPTION_KEY, newPlan);
    setPlan(newPlan);
  };

  return {
    plan,
    updatePlan,
    isPro: plan === "pro" || plan === "business",
    isBusiness: plan === "business",
  };
};
