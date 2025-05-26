import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      console.log('🔄 Route change starting...', url);
      setLoading(true);
    };

    const handleComplete = (url: string) => {
      console.log('✅ Route change complete:', url);
      setLoading(false);
    };

    const handleError = (error: Error) => {
      console.log('❌ Route change error:', error);
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError);
    };
  }, [router]);

  console.log('🎯 Current loading state:', loading);

  return (
    <>
      {loading && (
        <LoadingSpinner />
      )}
      <Component {...pageProps} />
    </>
  );
}