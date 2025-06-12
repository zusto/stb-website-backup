declare global {
  interface Window {
    fbq: Function;
    _fbq: any;
  }
}

export const initPixel = () => {
  if (typeof window === 'undefined') return;

  // Initialize fbq if not already present
  if (!window.fbq) {
    window.fbq = function() {
      (window.fbq as any).callMethod ? 
        (window.fbq as any).callMethod.apply(window.fbq, arguments) : 
        (window.fbq as any).queue.push(arguments);
    };
    
    if (!window._fbq) window._fbq = window.fbq;
    (window.fbq as any).push = window.fbq;
    (window.fbq as any).loaded = true;
    (window.fbq as any).version = '2.0';
    (window.fbq as any).queue = [];
  }

  // Load the pixel script
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  // Initialize and track pageview
  window.fbq('init', '713065871196595');
  window.fbq('track', 'PageView');
};

export const trackEvent = (eventName: string, params?: object) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
};