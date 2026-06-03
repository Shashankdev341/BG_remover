import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("VITE_RAZORPAY_KEY_ID exists:", !!import.meta.env.VITE_RAZORPAY_KEY_ID);
console.log("Environment mode:", import.meta.env.MODE);

createRoot(document.getElementById("root")!).render(<App />);
