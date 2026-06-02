import { useState, useEffect } from "react";

export interface Cutout {
  id: string;
  name: string;
  date: string;
  url: string;
}

const RECENT_KEY = "snapcut_recent";
const MAX_RECENT = 12;

export const useRecentCutouts = () => {
  const [cutouts, setCutouts] = useState<Cutout[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_KEY);
      if (stored) {
        setCutouts(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load recent cutouts", e);
    }
  }, []);

  const addCutout = (cutout: Omit<Cutout, "id" | "date">) => {
    const newCutout: Cutout = {
      ...cutout,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    const updated = [newCutout, ...cutouts].slice(0, MAX_RECENT);
    setCutouts(updated);
    
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    } catch (e) {
      // If quota exceeded (likely due to base64 URLs), try saving without URLs or just the most recent ones
      console.error("Failed to save cutouts to localStorage", e);
      // Fallback: save only metadata
      const metaOnly = updated.map(c => ({ ...c, url: "" }));
      localStorage.setItem(RECENT_KEY, JSON.stringify(metaOnly));
    }
  };

  return { cutouts, addCutout };
};
