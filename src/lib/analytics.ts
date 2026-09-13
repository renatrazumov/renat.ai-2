import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Declare gtag as a global function
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: { [key: string]: any }
    ) => void;
  }
}

// Hook to track page views
export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-WLJK6PP5ZL', {
        page_path: location.pathname + location.search
      });
    }
  }, [location]);
}

// Function to track events
export function trackEvent(
  eventName: string,
  eventParams?: { [key: string]: any }
) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, eventParams);
  }
}