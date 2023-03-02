import {CompatibleBubble, ProjectCard, ProjectStatus} from "@/components/ProjectCard";
import {PhotoCard} from "@/components/PhotoCard";

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
import {useState} from "react";

export default function ProjectsSection() {
    const [selectedOption, setSelectedOption] = useState(1);

    let optionClasses = "w-1/3 h-full flex justify-center items-center cursor-pointer z-10";
    let component = null;

    switch (selectedOption) {
        case 1:
            component = <Projects/>;
            break;
        case 2:
            optionClasses += " -translate-x-full";
            component = <Photos/>;
            break;
        case 3:
            optionClasses += " -translate-x-full -translate-x-full";
            component = <TodoSection/>;
            break;
        default:
            break;
    }

    return (
        <div>
            <div className="relative mb-6 w-64 mx-auto h-8 w-full h-full bg-gray-300 rounded-full flex items-center justify-center">

                {/* Options */}
                <div className="w-1/3 h-full flex justify-center items-center cursor-pointer z-50" onClick={() => setSelectedOption(1)}>
                    <span className="text-center">Projects</span>
                </div>

                <div className="w-1/3 h-full flex justify-center items-center cursor-pointer z-50" onClick={() => setSelectedOption(2)}>
                    <span className="text-center">Photos</span>
                </div>

                <div className="w-1/3 h-full flex justify-center items-center cursor-pointer z-50" onClick={() => setSelectedOption(3)}>
                    <span className="text-center">TODO</span>
                </div>

                {/* Slider */}
                <div
                    className="absolute top-0 left-0 w-1/3 h-full bg-blue-500 rounded-full transition-all ease-in-out duration-300 z-20"
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
                <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
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
                <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
                    These are some photos I have taken
                </p>
            </div>

            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center sm:place-items-stretch px-3 py-4 xs:px-0 gap-5 sm:py-10">
                <PhotoCard title="Test" hashTags={["fnn", "fff", "yay"]} description="beach" image={bike_trip_img}/>
                <PhotoCard title="Test" hashTags={["fnn", "fff", "yay"]} description="beach" image={canyon_img}/>
                <PhotoCard title="Test" hashTags={["fnn", "fff", "yay"]} description="beach" image={chipmunk_img}/>
                <PhotoCard title="Test" hashTags={["fnn", "fff", "yay"]} description="beach" image={drone_beach_img}/>
                <PhotoCard title="Test" hashTags={["fnn", "fff", "yay"]} description="beach" image={drunk_dog_img}/>
                <PhotoCard title="Test" hashTags={["fnn", "fff", "yay"]} description="beach" image={enzo_snow_img}/>
                <PhotoCard title="Test" hashTags={["fnn", "fff", "yay"]} description="beach"
                           image={enzo_upsidedown_img}/>
                <PhotoCard title="Test" hashTags={["fnn", "fff", "yay"]} description="beach" image={lizard_img}/>
                <PhotoCard title="Test" hashTags={["fnn", "fff", "yay"]} description="beach"
                           image={lizard_on_post_img}/>
                <PhotoCard title="Test" hashTags={["fnn", "fff", "yay"]} description="beach" image={milo_chair_img}/>
                <PhotoCard title="Test" hashTags={["fnn", "fff", "yay"]} description="beach" image={milo_stump_img}/>
                <PhotoCard title="Test" hashTags={["fnn", "fff", "yay"]} description="beach" image={mountain_img}/>
                <PhotoCard title="Test" hashTags={["fnn", "fff", "yay"]} description="beach" image={sunset_beach_img}/>
            </div>
        </div>
    );
}

function TodoSection() {
    return (
        <div>
            <div>
                <h3 className="text-3xl py-1 dark:text-white">TODO SECTION</h3>
                <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
                    Content here
                </p>
            </div>
        </div>
    )
}