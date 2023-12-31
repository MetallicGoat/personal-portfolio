import {BsDiscord, BsGithub, BsInstagram} from 'react-icons/bs';
import {FunctionComponent} from "react";
import {motion} from 'framer-motion';
import ProjectsSection from "@/components/ProjectsSection";
import LastCommit from "@/components/utils/LastCommit";
import {InteractiveImage} from "@/components/utils/InteractiveImage";
import LinkParticles from "@/components/LinkParticles";
import {BsChevronDoubleDown} from 'react-icons/bs';

export default function Home() {

    return (
        <div>
            <LinkParticles/>

            {/* INTRO SECTION */}
            <section
                className="z-20 min-h-screen flex flex-col"
            >
                <motion.div
                    className="z-20 md:flex md:flex-row md:justify-between md:items-center md:h-full md:my-auto md:pb-20"
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: .3}}
                >
                    <div className="text-center md:w-3/5 md:text-left py-2 md:pb-0">
                        <h2
                            className="text-4xl lg:text-5xl xl:text-6xl sm:py-2 font-extrabold animated-text-color"
                        >
                            Christian Azzam
                        </h2>

                        <h3
                            className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold sm:py-2 text-gray-800 dark:text-white"
                        >
                            AKA - MetallicGoat
                        </h3>

                        <p
                            className="leading-5 text-md lg:text-xl xl:text-2xl text-gray-800 mx-auto max-w-md md:max-w-full md:pr-10 md:mx-0 dark:text-white"
                        >
                            I am an 18 year old aspiring software developer from Canada. I am currently
                            enrolled in my first year of Engineering Systems & Computing at the
                            University of Guelph. Online, I go by MetallicGoat. I am self taught
                            in Java, and have 3 years of experience with it. I learned Java though
                            working on Spigot plugins, and I am currently trying to teach myself
                            Javascript, HTML, and CSS through the making of this site. This portfolio
                            contains some projects I have worked on, some photos I have taken, as
                            well as some background about them.
                        </p>

                        <Socials className="hidden md:block mr-20"/>
                    </div>

                    <div
                        className="flex justify-center md:justify-end mx-auto md:mx-0 relative pt-2 w-3/4 md:w-1/3"
                    >
                        <InteractiveImage
                            src="https://github.com/MetallicGoat.png"
                            alt="GitHub profile picture"
                            className="w-full rounded-3xl mx-auto shadow-xl shadow-gray-300 dark:shadow-gray-950 RGB:rgb-border"
                        />
                    </div>

                    <Socials className="md:hidden"/>

                    {/* Scroll Arrow */}
                    <div
                        className="pt-2 mx-auto md:absolute md:bottom-5 md:right-0 md:left-1/2 md:transform md:-translate-x-1/2"
                    >
                        <BsChevronDoubleDown
                            className="mx-auto animate-bounce text-4xl md:text-5xl font-bold text-gray-600 dark:text-gray-400"
                        />
                    </div>
                </motion.div>

            </section>

            <div className="pt-24 pb-36">
                <LastCommit username="MetallicGoat"/>
            </div>

            {/*Projects or Photos*/}
            <section>
                <ProjectsSection/>
            </section>
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
                className="text-4xl md:text-5xl lg:text-6xl flex justify-center gap-10 sm:gap-16 my-3 py-2 md:py-6 text-gray-600 dark:text-gray-400"
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
