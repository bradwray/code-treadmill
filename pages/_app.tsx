import '../public/styles.css';

import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  const router = useRouter();

  const handleRouteChange = (url: string) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', 'G-FCRXD9SM0E', {
        page_path: url,
      });
    }
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}

export default MyApp;
