import '../public/styles.css';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

// import { AppContext } from '../components/AppContext';

function MyApp({ Component, pageProps }) {
   const router = useRouter();

   const handleRouteChange = (url) => {
      window.gtag('config', 'G-FCRXD9SM0E', {
         page_path: url,
      });
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
