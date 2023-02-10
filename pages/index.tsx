import Head from 'next/head'
import Image from "next/image";

import blank_img from "@/public/blank_img.jpg";
import mbedwars_img from "@/public/logos/mbedwars.png";
import tweaks_img from "@/public/personalprojects/tweaks.png";
import extra_special_items_img from "@/public/personalprojects/extra-special-items.png";
import prize_commands_img from "@/public/personalprojects/prize-commands.png";
import gen_splitter_img from "@/public/personalprojects/gen-splitter.png";
import fireball_jumping_img from "@/public/personalprojects/fireball-knockback.webp";

import {BsDiscord, BsFillMoonStarsFill, BsGithub, BsInstagram} from 'react-icons/bs';
import {FunctionComponent, useState} from "react";
import {ProjectTile, CompatibleBubble, ProjectStatus} from "@/components/ProjectTile";
import {Tile} from "@/components/Tile";

export default function Home() {

    const [darkMode, setDarkMode] = useState(false);

    return (
        <div>
            <Head>
                <title>Portfolio</title>
                <meta name="description" content="blah"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className="bg-white dark:bg-gray-900 px-5 sm:px-8 md:px-10 xl:px-20">

                {/* INTRO SECTION */}
                <section className="min-h-screen flex flex-col">
                    <nav className="py-6 lg:py-10 flex justify-between">
                        <h1 className="text-md sm:text-xl lg:text-2xl">Portfolio</h1>
                        <ul className="flex items-center">
                            <li>
                                <BsFillMoonStarsFill
                                    onClick={() => setDarkMode(!darkMode)}
                                    className="cursor-pointer text-xl sm:text-2xl lg:text-3xl"
                                />
                            </li>

                            <li>
                                <a
                                    className="bg-gradient-to-r from-green-400 to-teal-400 text-white px-2 sm:px-4 py-2 rounded-md ml-4 sm:ml-8 lg:text-xl"
                                    href="#">Resume
                                </a>
                            </li>
                        </ul>
                    </nav>


                    <div
                        className="lg:flex lg:flex-row lg:justify-between lg:items-center lg:h-full lg:my-auto lg:pb-20">
                        <div className=" text-center lg:text-left">
                            <h2 className="text-4xl sm:text-5xl py-2 font-medium font-extrabold animated-text-color">
                                Christian Azzam
                            </h2>

                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold py-2 text-gray-800 ">
                                AKA - MetallicGoat
                            </h3>

                            <p className="text-md mx-auto sm:text-lg md:text-xl text-gray-800 max-w-md sm:max-w-xl">
                                I am an aspiring software developer from Canada. I am currently in high school, and I
                                generally go by MetallicGoat online. I have taught myself Java through coding spigot
                                plugins, and I am currently trying to teach myself Javascript, html, and css. This site
                                contains some projects I have worked on, some photos I have taken, and some stories
                                about them.
                            </p>

                            <Socials className="hidden lg:block mr-20"/>

                        </div>

                        <div
                            className="flex justify-end mx-auto lg:mx-0 relative py-3 sm:my-6 lg:pl-8 w-9/12 h-9/12  lg:w-2/5 lg:h-2/5">
                            <Image
                                src="https://github.com/MetallicGoat.png"
                                alt="GitHub profile picture"
                                width="0"
                                height="0"
                                sizes="100vw"
                                className="w-full h-auto rounded-3xl"
                            />

                        </div>

                        <Socials className="lg:hidden"/>
                    </div>


                </section>

                {/* PROJECTS SECTION */}

                <section className="py-10">
                    <div>
                        <h3 className="text-3xl py-1 dark:text-white ">Software Projects</h3>
                        <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
                            These are some projects I have worked on. The little bubble over top of the icons show what
                            the project was made for, and what it&apos;s made with. Most are completely my own, from
                            start to finish, and for the ones that are not (ie. collaborative project) it will be
                            mentioned in the project card description
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center px-3 py-4 xs:px-0 gap-5 xs:gap-2 sm:gap-5 sm:py-10 ">

                        <ProjectTile
                            title="MBedwars"
                            bubbles={[CompatibleBubble.Java, CompatibleBubble.Spigot, CompatibleBubble.Paper]}
                            description="This project was NOT created by me, I help maintain it (I am not the main maintainer). It is the largest project I work on by a mile. It is made up of over 600 files. It is closed source, and it generally goes for 20 euros a copy. I have learned so much from working on this project, and have had so much fun playing around with what it can do. This is a CLOSED SOURCE project."
                            image={mbedwars_img}
                            status={ProjectStatus.Ongoing}
                        />

                        <ProjectTile
                            title="MBedwars Tweaks"
                            bubbles={[CompatibleBubble.Java, CompatibleBubble.Spigot, CompatibleBubble.MBedwars]}
                            description="By far, my largest personal project (I contribute to larger projects). I have a very hate/love relationship with this project. I have rewritten so many parts of this project so many times as my java skills have improved over time."
                            image={tweaks_img}
                            status={ProjectStatus.Ongoing}
                        />

                        <ProjectTile
                            title="Extra-Special-Items"
                            bubbles={[CompatibleBubble.Java, CompatibleBubble.Spigot, CompatibleBubble.MBedwars]}
                            description="My favorite MBedwars addon! I created it to add some fun new items into the game. I learned a lot about timers/schedulers in java while working on this project. I find it the most enjoyable to work on as I get to be creative with how my custom items work."
                            image={extra_special_items_img}
                            status={ProjectStatus.Ongoing}
                        />

                        <ProjectTile
                            title="Prize Commands"
                            bubbles={[CompatibleBubble.Java, CompatibleBubble.Spigot, CompatibleBubble.MBedwars]}
                            description="My least favorite project. It is a very useful MBedwars addon, but not much fun to work on. It makes it easy for users to reward their players for playing games, and progressing. "
                            image={prize_commands_img}
                            status={ProjectStatus.MaintenanceMode}
                        />

                        <ProjectTile
                            title="Gen-Splitter"
                            bubbles={[CompatibleBubble.Java, CompatibleBubble.Spigot, CompatibleBubble.MBedwars]}
                            description="The oldest one of my project's that I still maintain. An addon for MBedwars that splits resources equally amongst players. Its very simple, but very effective."
                            image={gen_splitter_img}
                            status={ProjectStatus.MaintenanceMode}
                        />

                        <ProjectTile
                            title="Fireball Jumping"
                            bubbles={[CompatibleBubble.Java, CompatibleBubble.Spigot, CompatibleBubble.MBedwars]}
                            description="One of my very first java projects. I created it for MBedwars, but before I joined as a contributor. It became much more popular than I thought it would, which inspired me to continue learning java. I have retired it, I have built its features directly into MBedwars, and MBedwars Tweaks. Somehow it still has over 100 users according to BStats."
                            image={fireball_jumping_img}
                            status={ProjectStatus.Retired}
                        />
                    </div>

                    {/* TODO view more on github button */}
                </section>

                {/* PHOTOS SECTION */}

                <section className="py-10">
                    <div>
                        <h3 className="text-3xl py-1 dark:text-white">Photos</h3>
                        <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
                            These are some photos I have taken
                        </p>
                    </div>
                    <div className="flex flex-row flex-wrap justify-center gap-4 lg:gap-12 sm:gap-10 py-4 sm:py-10 ">
                        <Tile title="Test" hashTags={["fnn", "fff", "yay"]} description="stupid" image={blank_img}/>
                        <Tile title="Test" hashTags={["fnn", "fff"]} description="Very very cool" image={blank_img}/>
                        <Tile title="Test" hashTags={["fnn", "fff"]} description="Very very cool" image={blank_img}/>
                        <Tile title="Test" hashTags={["fnn", "fff"]} description="Very very cool" image={blank_img}/>
                        <Tile title="Test" hashTags={["fnn", "fff"]} description="Very very cool" image={blank_img}/>
                        <Tile title="Test" hashTags={["fnn", "fff"]} description="Very very cool" image={blank_img}/>
                    </div>
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
            <div className="text-4xl sm:text-5xl flex justify-center gap-8 sm:gap-16 my-3 py-6 text-gray-600">

                <a href="https://github.com/MetallicGoat" target="blank_">
                    <BsGithub className="transition ease-in duration-200 hover:scale-110 hover:text-gray-900"/>
                </a>

                <BsDiscord className="transition ease-in duration-200 hover:scale-110 hover:text-gray-900"/>
                <BsInstagram className="transition ease-in duration-200 hover:scale-110 hover:text-gray-900"/>
            </div>
        </div>
    )
}
