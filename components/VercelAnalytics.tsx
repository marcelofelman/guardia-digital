'use client';

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";

export default function VercelAnalytics() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("[Vercel Analytics] componente montado");
    }
  }, []);

  return <Analytics debug={process.env.NODE_ENV === "development"} />;
}
