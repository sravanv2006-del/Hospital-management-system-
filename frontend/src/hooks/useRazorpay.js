import { useState, useEffect } from 'react';

const useRazorpay = () => {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    // Check if already loaded
    if (window.Razorpay) {
      setRazorpayLoaded(true);
      return;
    }

    // Load the script dynamically
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => {
      setRazorpayLoaded(true);
    };
    
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      setRazorpayLoaded(false);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return razorpayLoaded;
};

export default useRazorpay;