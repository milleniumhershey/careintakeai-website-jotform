"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

const SCRIPT_ID = "calendly-widget-script";
const STYLE_ID = "calendly-widget-style";

export function CalendlyEmbed({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const initialize = () => {
      if (cancelled || !containerRef.current || !window.Calendly) return;
      containerRef.current.replaceChildren();
      window.Calendly.initInlineWidget({
        url: `${url}?hide_gdpr_banner=1&background_color=ffffff&text_color=0b1c17&primary_color=137d57`,
        parentElement: containerRef.current,
      });
    };

    if (!document.getElementById(STYLE_ID)) {
      const stylesheet = document.createElement("link");
      stylesheet.id = STYLE_ID;
      stylesheet.rel = "stylesheet";
      stylesheet.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(stylesheet);
    }

    if (window.Calendly) {
      initialize();
    } else {
      let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = SCRIPT_ID;
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);
      }
      script.addEventListener("load", initialize);
    }

    return () => {
      cancelled = true;
      document.getElementById(SCRIPT_ID)?.removeEventListener("load", initialize);
    };
  }, [url]);

  return <div ref={containerRef} className="calendly-inline-widget" aria-label="Schedule a CAREINTAKEAI system audit" />;
}
