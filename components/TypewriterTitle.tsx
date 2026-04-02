"use client";

import { useEffect, useState } from "react";

const fullTitle = "Fumi";
const suffix = " | Portfolio";

export default function TypewriterTitle() {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(fullTitle.slice(0, i + 1));
      i++;
      if (i >= fullTitle.length) {
        clearInterval(interval);
        setTimeout(() => {
          document.title = fullTitle + suffix;
        }, 1500);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (displayed) {
      document.title = displayed + suffix;
    }
  }, [displayed]);

  return null;
}
