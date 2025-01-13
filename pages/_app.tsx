import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import NavBar from "@/components/NavBar";
import Head from "next/head";

export default function App({Component, pageProps}: AppProps) {
    const [darkMode, setDarkMode] = useState(true);
    const router = useRouter();

    // Effect to toggle the `dark` class on the `html` element
    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <div className={"dark:bg-black"}>
            <Head>
                <title>Christian Azzam</title>
                <meta name="description" content="Christian Azzam's Website"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className="z-10 ease-in duration-300 bg-white px-5 sm:px-8 md:px-10 xl:px-20 dark:bg-black">
                <NavBar darkMode={darkMode} setDarkMode={setDarkMode} currentPath={router.pathname}/>
                <Component {...pageProps} />
            </main>
        </div>
    )
}
