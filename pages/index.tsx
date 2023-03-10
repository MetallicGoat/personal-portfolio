import Head from 'next/head'
import Image from "next/image";

import {BsDiscord, BsFillMoonStarsFill, BsGithub, BsInstagram} from 'react-icons/bs';
import {FunctionComponent, useState} from "react";
import {motion} from 'framer-motion';
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={darkMode ? "dark" : ""}>
            <Head>
                <title>Portfolio</title>
                <meta name="description" content="blah"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            
            <main className="ease-in duration-300 bg-white px-5 sm:px-8 md:px-10 xl:px-20 dark:bg-black">

                {/* INTRO SECTION */}
                <section
                    className="min-h-screen flex flex-col"
                >
                    <motion.nav
                        className="py-6 lg:py-10 flex justify-between"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="text-md sm:text-xl lg:text-2xl dark:text-white">Portfolio</h1>
                        <ul className="flex items-center">
                            <li>
                                <BsFillMoonStarsFill
                                    onClick={() => setDarkMode(!darkMode)}
                                    className="cursor-pointer text-xl sm:text-2xl lg:text-3xl dark:text-white"
                                />
                            </li>

                            <li>
                                <button
                                    className="bg-gradient-to-r from-green-400 to-teal-400 text-white px-2 sm:px-4 py-2 rounded-md ml-4 sm:ml-8 lg:text-xl"
                                    onClick={
                                        openResume
                                    }>Resume
                                </button>
                            </li>
                        </ul>
                    </motion.nav>

                    <motion.div
                        className="md:flex md:flex-row md:justify-between md:items-center md:h-full md:my-auto md:pb-20"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="text-center md:text-left">
                            <h2
                                className="text-4xl lg:text-5xl py-2 font-medium font-extrabold animated-text-color"
                            >
                                Christian Azzam
                            </h2>

                            <h3
                                className="text-lg md:text-2xl font-bold py-2 text-gray-800 dark:text-white"
                            >
                                AKA - MetallicGoat
                            </h3>

                            <p
                                className="text-md lg:text-lg mx-auto text-gray-800 max-w-md sm:max-w-xl dark:text-white"
                            >
                                I am an aspiring software developer from Canada. I am currently in high school, and I
                                generally go by MetallicGoat online. I have taught myself Java through coding spigot
                                plugins, and I am currently trying to teach myself Javascript, html, and css through
                                the making of this site. This site contains some projects I have worked on, some
                                photos I have taken, and some background about them.
                            </p>

                            <Socials className="hidden md:block mr-20"/>

                        </div>

                        <div
                            className="flex justify-end mx-auto lg:mx-0 relative py-3 sm:my-6 md:pl-8 w-9/12 h-9/12 md:w-3/5 md:h-3/5 lg:w-2/5 lg:h-2/5"
                        >
                            <Image
                                src="https://github.com/MetallicGoat.png"
                                alt="GitHub profile picture"
                                width="0"
                                height="0"
                                sizes="100vw"
                                className="w-full h-auto rounded-3xl border-4 border-neutral-700 dark:border-neutral-300"
                            />

                        </div>

                        <Socials className="md:hidden"/>
                    </motion.div>


                </section>

                {/*Projects or Photos*/}
                <section className="py-10">
                    <ProjectsSection/>
                </section>
            </main>
        </div>
    )
}

interface HashTagProps {
    className: string;
}

const Socials: FunctionComponent<HashTagProps> = ({className}) => {
    return (
        <div className={className}>
            <div
                className="text-4xl md:text-5xl flex justify-center gap-8 sm:gap-16 my-3 py-6 text-gray-600 dark:text-gray-400 dark:text-gray-400"
            >

                <a href="https://github.com/MetallicGoat" target="blank_">
                    <BsGithub
                        className="ease-in duration-200 hover:scale-110 hover:text-gray-900 hover:dark:text-white"/>
                </a>

                <BsDiscord
                    className="ease-in duration-200 hover:scale-110 hover:text-gray-900 hover:dark:text-white"/>
                <BsInstagram
                    className="ease-in duration-200 hover:scale-110 hover:text-gray-900 hover:dark:text-white"/>
            </div>
        </div>
    )
}

function openResume() {
    window.open("/pdfs/resume.pdf", '_blank');
}