import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from "../components/Layout";
import {useState} from 'react';
import {useRouter} from 'next/router';
import NavBar from "@/components/utils/NavBar";
import Head from "next/head";

export default function App({Component, pageProps}: AppProps) {
    const [darkMode, setDarkMode] = useState(false);
    const router = useRouter();

    return (
        <div className={darkMode ? "dark" : ""}>
            <Head>
                <title>Portfolio</title>
                <meta name="description" content="Christian Azzam's Website (JavaScript < TypeScript < Java)"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Layout>
                <main className="z-10 ease-in duration-300 bg-white px-5 sm:px-8 md:px-10 xl:px-20 dark:bg-black">
                    <NavBar darkMode={darkMode} setDarkMode={setDarkMode} currentPath={router.pathname}/>
                    <Component {...pageProps} />
                </main>
            </Layout>
        </div>
    )
}
