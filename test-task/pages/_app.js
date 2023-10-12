import '@/styles/globals.scss';
import '@/styles/cropper.scss';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const { route } = useRouter();
  return route === '/login' || route === '/registration' ? (
    <Component {...pageProps} />
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
