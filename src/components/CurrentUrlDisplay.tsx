"use client";
/**
 * CurrentUrlDisplay component
 * Purpose: Show current URL for debugging
 * Location: src/components/CurrentUrlDisplay.tsx
 */
import { useEffect, useState } from "react";

export function CurrentUrlDisplay() {
  const [currentUrl, setCurrentUrl] = useState<string>("Loading...");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <div className="alert alert-info">
      <p className="text-sm">Current URL: {currentUrl}</p>
    </div>
  );
}

export default CurrentUrlDisplay;
