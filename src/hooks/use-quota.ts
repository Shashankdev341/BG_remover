import { useState, useEffect } from "react";
import { useSubscription } from "./use-subscription";

const QUOTA_LIMIT = 5;
const QUOTA_KEY = "snapcut_quota";

interface QuotaData {
  used: number;
  date: string;
}

export const useQuota = () => {
  const { isPro } = useSubscription();
  const [used, setUsed] = useState(0);

  useEffect(() => {
    try {
      const today = new Date().toDateString();
      const stored = localStorage.getItem(QUOTA_KEY);
      
      if (stored) {
        const data: QuotaData = JSON.parse(stored);
        if (data.date === today) {
          setUsed(data.used);
        } else {
          // New day, reset quota
          const newData = { used: 0, date: today };
          localStorage.setItem(QUOTA_KEY, JSON.stringify(newData));
          setUsed(0);
        }
      } else {
        const newData = { used: 0, date: today };
        localStorage.setItem(QUOTA_KEY, JSON.stringify(newData));
        setUsed(0);
      }
    } catch (e) {
      // Failed to load quota from localStorage - using default state (0)
    }
  }, []);

  const incrementQuota = () => {
    // If user is Pro, we still track usage but don't limit it
    try {
      const today = new Date().toDateString();
      const newUsed = used + 1;
      const newData = { used: newUsed, date: today };
      localStorage.setItem(QUOTA_KEY, JSON.stringify(newData));
      setUsed(newUsed);
    } catch (e) {
      // Failed to save quota to localStorage
    }
  };

  const limit = isPro ? Infinity : QUOTA_LIMIT;

  return {
    used,
    limit,
    incrementQuota,
    isOverQuota: used >= limit,
  };
};
