import {CompatibleBubble, ProjectCard, ProjectStatus} from "@/components/tabs/ProjectCard";
import {PhotoCard} from "@/components/tabs/PhotoCard";
import {ProgressCard} from "@/components/tabs/ProgressCard";
import React, {useState} from "react";

// Projects
import mbedwars_img from "@/public/logos/mbedwars.png";
import tweaks_img from "@/public/personalprojects/tweaks.png";
import extra_special_items_img from "@/public/personalprojects/extra-special-items.png";
import prize_commands_img from "@/public/personalprojects/prize-commands.png";
import phaser_game_img from "@/public/personalprojects/phaser-space-game.png";
import is4p_img from "@/public/personalprojects/is4p.png";
import gen_splitter_img from "@/public/personalprojects/gen-splitter.png";
import fireball_jumping_img from "@/public/personalprojects/fireball-knockback.webp";

// Images
import bike_trip_img from "@/public/photos/bike_trip.jpg";
import canyon_img from "@/public/photos/canyon.jpg";
import chipmunk_img from "@/public/photos/chipmunk.jpg";
import drone_beach_img from "@/public/photos/drone_beach.jpg";
import drunk_dog_img from "@/public/photos/drunk_dog.jpg";
import enzo_snow_img from "@/public/photos/enzo_snow.jpg";
import enzo_upsidedown_img from "@/public/photos/enzo_upsidedown.jpg";
import lizard_img from "@/public/photos/lizard.jpg";
import lizard_on_post_img from "@/public/photos/lizard_on_post.jpg";
import milo_chair_img from "@/public/photos/milo_chair.jpg";
import milo_stump_img from "@/public/photos/milo_stump.jpg";
import mountain_img from "@/public/photos/mountain.jpg";
import sunset_beach_img from "@/public/photos/sunset_beach.jpg";

export default function ProjectsSection() {
    const [selectedOption, setSelectedOption] = useState(1);

    let optionClasses = "w-1/3 h-full flex justify-center items-center cursor-pointer z-10 transition ease-in duration-200";
    let sliderClasses = "absolute top-0 left-0 w-1/3 h-full rounded-full transition-all ease-in-out duration-1000 z-20";
    let component = null;

    switch (selectedOption) {
        case 1:
            component = <Projects/>;
            sliderClasses += " bg-blue-400";
            break;
        case 2:
            optionClasses += " -translate-x-full ";
            sliderClasses += " bg-red-400";
            component = <Photos/>;
            break;
        case 3:
            optionClasses += " -translate-x-full";
            sliderClasses += " bg-green-400";
            component = <Progress/>;
            break;
        default:
            break;
    }

    return (
        <div>
            <div className="relative shadow-lg border-2 md:border-4 border-gray-400 mb-14 w-5/6 sm:w-3/4 mx-auto h-10 md:h-12 w-full h-full bg-gray-300 dark:border-neutral-700 dark:bg-neutral-900 rounded-full flex items-center justify-center">

                {/* Options */}
                <div className="w-1/3 h-full flex justify-center items-center cursor-pointer z-50 dark:text-white"
                     onClick={() => setSelectedOption(1)}>
                    <span className="text-lg md:text-xl text-center font-bold select-none">Projects</span>
                </div>

                <div className="w-1/3 h-full flex justify-center items-center cursor-pointer z-50 dark:text-white"
                     onClick={() => setSelectedOption(2)}>
                    <span className="text-lg md:text-xl text-center font-bold select-none">Photos</span>
                </div>

                <div className="w-1/3 h-full flex justify-center items-center cursor-pointer z-50 dark:text-white"
                     onClick={() => setSelectedOption(3)}>
                    <span className="text-lg md:text-xl text-center font-bold select-none">Progress</span>
                </div>

                {/* Slider */}
                <div
                    className={sliderClasses}
                    style={{transform: `translateX(${(selectedOption - 1) * (300 / 3)}%)`}}
                />
            </div>

            {component}
        </div>
    );
}

function Projects() {
    return (
        <div>
            <div>
                <h3 className="text-3xl py-1 dark:text-white">Software Projects</h3>
                <p className="text-lg py-2 leading-8 text-gray-800 dark:text-gray-200">
                    These are some projects I have worked on. The little bubble over top of the icons show what
                    the project was made for, and what it&apos;s made with. Most are completely my own, from
                    start to finish, and for the ones that are not (ie. collaborative project) it will be
                    mentioned in the project card description
                </p>
            </div>

            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center sm:place-items-stretch px-3 py-4 xs:px-0 gap-5 sm:py-10">

                <ProjectCard
                    title="MBedwars"
                    link="https://github.com/MBedwars"
                    bubbles={[CompatibleBubble.Java, CompatibleBubble.Spigot, CompatibleBubble.Paper]}
                    description="This project was NOT created by me, I help maintain it (I am not the main maintainer). It is the largest project I work on by a mile. It is made up of over 600 files. It is closed source, and it generally goes for 20 euros a copy. I have learned so much from working on this project, and have had so much fun playing around with what it can do. This is a CLOSED SOURCE project."
                    image={mbedwars_img}
                    status={ProjectStatus.Ongoing}
                />

                <ProjectCard
                    title="MBedwars Tweaks"
                    link="https://github.com/MetallicGoat/MBedwarsTweaks"
                    bubbles={[CompatibleBubble.Java, CompatibleBubble.Spigot, CompatibleBubble.MBedwars]}
                    description="By far, my largest personal project (I contribute to larger projects). I have a very hate/love relationship with this project. I have rewritten so many parts of this project so many times as my java skills have improved over time."
                    image={tweaks_img}
                    status={ProjectStatus.Ongoing}
                />

                <ProjectCard
                    title="Extra-Special-Items"
                    link="https://github.com/MetallicGoat/Extra-Special-Items"
                    bubbles={[CompatibleBubble.Java, CompatibleBubble.Spigot, CompatibleBubble.MBedwars]}
                    description="My favorite MBedwars addon! I created it to add some fun new items into the game. I learned a lot about timers/schedulers in java while working on this project. I find it the most enjoyable to work on as I get to be creative with how my custom items work."
                    image={extra_special_items_img}
                    status={ProjectStatus.Ongoing}
                />

                <ProjectCard
                    title="Prize Commands"
                    link="https://github.com/MetallicGoat/PrizeCommands"
                    bubbles={[CompatibleBubble.Java, CompatibleBubble.Spigot, CompatibleBubble.MBedwars]}
                    description="My least favorite project. It is a very useful MBedwars addon, but not much fun to work on. It makes it easy for users to reward their players for playing games, and progressing. "
                    image={prize_commands_img}
                    status={ProjectStatus.MaintenanceMode}
                />

                <ProjectCard
                    title="Phaser Space Game"
                    link="https://github.com/MetallicGoat/PhaserSpaceGame"
                    bubbles={[CompatibleBubble.JavaScript]}
                    description="A very basic idle game created with JavaScript using the Phaser library. The purpose of the project was for me to learn JavaScript. "
                    image={phaser_game_img}
                    status={ProjectStatus.OnHold}
                />

                <ProjectCard
                    title="IS4P"
                    link="https://github.com/MetallicGoat/infinite-support-4-paws"
                    bubbles={[CompatibleBubble.JavaScript]}
                    description="A website for a dog rescue called infinite support four paws. I had to put this project hold, but plan to come back to it soon. The plan is to move to next js (currently is using react and react-router), and migrate from css modules, to tailwind css"
                    image={is4p_img}
                    status={ProjectStatus.OnHold}
                />

                <ProjectCard
                    title="Gen-Splitter"
                    link="https://github.com/MetallicGoat/Gen-Splitting"
                    bubbles={[CompatibleBubble.Java, CompatibleBubble.Spigot, CompatibleBubble.MBedwars]}
                    description="The oldest one of my project's that I still maintain. An addon for MBedwars that splits resources equally amongst players. Its very simple, but very effective."
                    image={gen_splitter_img}
                    status={ProjectStatus.MaintenanceMode}
                />

                <ProjectCard
                    title="Fireball Jumping"
                    link="https://github.com/MetallicGoat/FB-Knockback"
                    bubbles={[CompatibleBubble.Java, CompatibleBubble.Spigot, CompatibleBubble.MBedwars]}
                    description="One of my very first java projects. I created it for MBedwars, but before I joined as a contributor. It became much more popular than I thought it would, which inspired me to continue learning java. I have retired it, I have built its features directly into MBedwars, and MBedwars Tweaks. Somehow it still has over 100 users according to BStats."
                    image={fireball_jumping_img}
                    status={ProjectStatus.Retired}
                />
            </div>

            {/* TODO view more on github button */}
        </div>
    );
}

function Photos() {
    return (
        <div>
            <div>
                <h3 className="text-3xl py-1 dark:text-white">Photos</h3>

                <p className="text-lg py-2 leading-8 text-gray-800 dark:text-gray-200">
                    These are some photos I have taken
                </p>
            </div>

            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center sm:place-items-stretch px-3 py-4 xs:px-0 gap-5 sm:py-10">

                <PhotoCard
                    title="Bike Trip"
                    hashTags={["camping", "biking", "400km"]}
                    description="Beginning of a 400km bike trip from Grand Bend to Manitoulin Island"
                    image={bike_trip_img}
                />

                <PhotoCard
                    title="Marble Canyon"
                    hashTags={["Alberta", "waterfall"]}
                    description="My favourite canyon in Alberta"
                    image={canyon_img}
                />

                <PhotoCard
                    title="Chipmunk"
                    hashTags={["Alberta", "friendly"]}
                    description="Friendly chipmunk, who would eat food right out of your hand"
                    image={chipmunk_img}
                />

                <PhotoCard
                    title="Turks and Caicos"
                    hashTags={["beach", "travel", "blue"]}
                    description="Drone shot of the beach at Turks and Caicos"
                    image={drone_beach_img}
                />

                <PhotoCard
                    title="New Puppy"
                    hashTags={["puppy", "drunk", "sleepin'"]}
                    description="New puppy is really tiered after playing. She fell asleep with a wine bottle under her paw"
                    image={drunk_dog_img}
                />

                <PhotoCard
                    title="Snowy Nose"
                    hashTags={["snow", "feed-me", "dogs"]}
                    description="Enzo came inside after playing in the snow"
                    image={enzo_snow_img}
                />

                <PhotoCard
                    title="Sleepin' Enzo"
                    hashTags={["tried", "dogs", "passed-out"]}
                    description="Enzo sleeping between two pillows"
                    image={enzo_upsidedown_img}
                />

                <PhotoCard
                    title="Lizard"
                    hashTags={["tiny"]}
                    description="Lizard in Turks and Cacios"
                    image={lizard_img}
                />

                <PhotoCard
                    title="Climbing Lizard"
                    hashTags={["sticky-feet", "fast-climber"]}
                    description="Lizard climg an umbrella in Costa Rica"
                    image={lizard_on_post_img}
                />

                <PhotoCard
                    title="Resting Milo"
                    hashTags={["hot", "dogs", "summer"]}
                    description="Milo resting on hos favourite chair in the summer"
                    image={milo_chair_img}
                />

                <PhotoCard
                    title="Stump Milo"
                    hashTags={["hiking", "dogs"]}
                    description="Milo sitting on a stump half-way through his walk"
                    image={milo_stump_img}
                />

                <PhotoCard
                    title="Mountain"
                    hashTags={["Alberta", "vacation"]}
                    description="Mountain in alberta shot on a dock on the lake"
                    image={mountain_img}
                />

                <PhotoCard
                    title="Sunset Beach"
                    hashTags={["sunset", "beach", "drone"]}
                    description="Sunset on the beach in Turks and Cacios, Shot on my drone"
                    image={sunset_beach_img}
                />
            </div>
        </div>
    );
}

function Progress() {
    return (
        <div>
            <h3 className="text-3xl py-1 dark:text-white">Website Progress</h3>
            <p className="text-lg py-2 leading-8 text-gray-800 dark:text-gray-200">
                I started this website with very little experience with Typescript, Tailwind, and Next.js.
                This section was created to document my progress over time,
                and to document my learning of web development.
            </p>

            <ProgressCard date="May 20 2023" changes={[
                "Updated resume",
            ]}/>

            <ProgressCard date="May 19 2023" changes={[
                "Nerfed NavBar Size",
                "Removed under construction banner"
            ]}/>

            <ProgressCard date="April 13 2023" changes={[
                "Improved NavBar styling",
            ]}/>

            <ProgressCard date={"March 20th 2023"} changes={[
                "NavBar is now displayed on every page",
                "Added dropdown to NavBar to select the page you want to visit",
                "Added 3D effect on GitHub profile image",
                "Improved animations"
            ]}/>

            <ProgressCard date={"March 18th 2023"} changes={[
                "Added under construction banner"
            ]}/>

            <ProgressCard date={"March 17th 2023"} changes={[
                "Created new page for Calculus project",
            ]}/>

            <ProgressCard date={"March 4th 2023"} changes={[
                "Added Page load animation"
            ]}/>

            <ProgressCard date={"March 3rd 2023"} changes={[
                "Added dummy resume (for testing)",
                "Added Descriptions/hashtags to photos",
            ]}/>

            <ProgressCard date={"March 2nd 2023"} changes={[
                "Improved the styling of the content slider",
                "Added progress tracking content section",
                "Added titles to Photos",
                "Implemented dark mode"
            ]}/>

            <ProgressCard date={"March 1st 2023"} changes={[
                "Fixed some weird rendering on small displays",
                "Added 'slider' to content section, allowing users to choose what content they want to view.",
                "Learned how to do basic conditional rendering",
                "Temporally disabled SlideIn animation, until bugs can be fixed"
            ]}/>

            <ProgressCard date={"February 27th 2023"} changes={[
                "Improve SlideIn animation on photo cards",
                "Fixed Photos section never gets rendered on small displays"
            ]}/>

            <ProgressCard date={"February 12th 2023"} changes={[
                "Added scroll animation",
            ]}/>

            <ProgressCard date={"February 11th 2023"} changes={[
                "Added new photos to Photos section",
                "Fixes/Improvements to page styling"
            ]}/>

            <ProgressCard date={"February 10th 2023"} changes={[
                "Added some new Projects to Projects section",
                "Better support for weird screen sizes",
                "Misc improvements to Project cards (especially compatibility bubbles)"
            ]}/>

            <ProgressCard date={"February 9th 2023"} changes={[
                "Added fancy RGB animated name text (Based on the code I used for the Mars weather app project)",
                "Make Project status bar on projects cards look cleaner",
                "Added github links to projects cards"
            ]}/>

            <ProgressCard date={"February 8th 2023"} changes={[
                "Learned how to link Github project to Vercel and started hosting this website",
                "Fixed a small bug casing the app not to build properly"
            ]}/>

            <ProgressCard date={"February 3rd 2023"} changes={[
                "Started the portfolio website project",
                "Created using create-next-app"
            ]}/>
        </div>
    )
}