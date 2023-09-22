import '../app/globals.css';
import Layout from '../Components/layout'
import Script from 'next/script';

function MyApp({ Component, pageProps }) {

    return (
        <Layout>
            <Script
                src="https://kit.fontawesome.com/1a2ad00ec6.js"
                crossOrigin="anonymous"
            />
            <Component {...pageProps} />
        </Layout>
        );
    }

export default MyApp;