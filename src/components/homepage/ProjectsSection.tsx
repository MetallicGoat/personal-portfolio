'use client'

import {ProjectCard, ProjectStatus} from "@/components/homepage/cards/ProjectCard";
import PhotoGallery from "@/components/homepage/PhotoGallery";
import {ExperienceCard} from "@/components/homepage/cards/ExperienceCard";
import {certifications, education, work} from "@/data/experience";
import React, {useState} from "react";

// Projects
import mbedwars_img from "@/public/logos/mbedwars.png";
import tweaks_img from "@/public/personalprojects/tweaks.png";
import extra_special_items_img from "@/public/personalprojects/extra-special-items.png";
import prize_commands_img from "@/public/personalprojects/prize-commands.png";
import phaser_game_img from "@/public/personalprojects/phaser-space-game.png";
import enviro_anti_mwp from "@/public/personalprojects/EnviroAntiMWP.png";
import is4p_img from "@/public/personalprojects/is4p.png";
import gen_splitter_img from "@/public/personalprojects/gen-splitter.png";
import fireball_jumping_img from "@/public/personalprojects/fireball-knockback.webp";
import dwlc from "@/public/personalprojects/dwlc.png";
import physics_balls from "@/public/personalprojects/physics-balls.png";

const options = [
  {id: 1, label: "Projects", gradient: "from-sky-400 to-blue-500"},
  {id: 2, label: "My Life", gradient: "from-red-400 to-rose-500"},
  {id: 3, label: "Experience", gradient: "from-green-400 to-teal-400"},
];

export default function ProjectsSection() {
  const [selectedOption, setSelectedOption] = useState(1);
  let component = null;

  switch (selectedOption) {
    case 1:
      component = <Projects/>;
      break;
    case 2:
      component = <Photos/>;
      break;
    case 3:
      component = <Experience/>;
      break;
    default:
      break;
  }

  return (
    <div>
      <div
        className="relative shadow-inner mb-14 w-5/6 sm:w-3/4 mx-auto h-10 md:h-12 bg-gray-300/80 dark:bg-neutral-800 rounded-full flex items-center justify-center ring-1 ring-black/5 dark:ring-white/10">

        {/* Slider */}
        <div
          className="absolute top-0 left-0 w-1/3 h-full p-[3px] transition-transform ease-in-out duration-500 z-10"
          style={{transform: `translateX(${(selectedOption - 1) * 100}%)`}}
        >
          <div className="relative w-full h-full rounded-full shadow-md overflow-hidden">
            {/*
              One layer per option, cross-faded with opacity. Gradients cannot be
              transitioned directly, so we stack them instead of tweening colors.
            */}
            {options.map((option) => (
              <div
                key={option.id}
                className={`absolute inset-0 bg-gradient-to-r ${option.gradient} transition-opacity ease-in-out duration-500 ${selectedOption === option.id ? "opacity-100" : "opacity-0"}`}
              />
            ))}

            {/* Glossy highlight so the pill reads as a raised button */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/5 to-black/10 pointer-events-none"/>
          </div>
        </div>

        {/* Options */}
        {options.map((option) => (
          <div
            key={option.id}
            className="w-1/3 h-full flex justify-center items-center cursor-pointer z-20"
            onClick={() => setSelectedOption(option.id)}
          >
            <span
              className={`text-lg md:text-2xl text-center font-bold select-none transition-colors duration-500 ${
                selectedOption === option.id
                  ? "text-white drop-shadow-sm"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {option.label}
            </span>
          </div>
        ))}
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
          These are some projects I have worked on. Click a project&apos;s image to open its page.
          Most are completely my own, from start to finish, and for the ones that are not solely mine
          (ie. a project I collaborated on with someone) it will be mentioned in the top left of the project card
        </p>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center sm:place-items-stretch px-3 py-4 xs:px-0 gap-5 sm:py-10">

        <ProjectCard
          title="MBedwars"
          link="https://wiki.mbedwars.com"
          description="This project was NOT created by me, I help maintain it (I am not the main maintainer). It is the largest project I work on by a mile. It is made up of over 600 files. It is closed source, and it generally goes for 20 euros a copy. I have learned so much from working on this project, and have had so much fun playing around with what it can do. This is a closed source project."
          image={mbedwars_img}
          collaborators={["MrEAlderson"]}
          status={ProjectStatus.Ongoing}
        />

        <ProjectCard
          title="MBedwars Tweaks"
          link="https://github.com/MetallicGoat/MBedwarsTweaks"
          description="By far, my largest personal project (I contribute to larger projects). I have a love/hate relationship with this project. I have rewritten so many parts of this project so many times as my java skills have improved over the years. It is a colletion of various tweaks that were deemed to insignificant as an MBedwars feature."
          image={tweaks_img}
          status={ProjectStatus.Ongoing}
        />

        <ProjectCard
          title="Gen-Splitter"
          link="https://github.com/MetallicGoat/Gen-Splitting"
          description="The oldest one of my project's that I still maintain. An addon for MBedwars that splits resources equally amongst players. Its very simple, but very effective."
          image={gen_splitter_img}
          status={ProjectStatus.Ongoing}
        />

        <ProjectCard
          title="Extra-Special-Items"
          link="https://github.com/MetallicGoat/Extra-Special-Items"
          description="My favorite MBedwars addon! I created it to add some fun new items into the game. I learned a lot about timers/schedulers in java while working on this project. I find it the most enjoyable to work on as I get to be creative with how my custom items work."
          image={extra_special_items_img}
          status={ProjectStatus.Ongoing}
        />

        <ProjectCard
          title="Prize Commands"
          link="https://github.com/MetallicGoat/PrizeCommands"
          description="My least favorite project. It is a very useful MBedwars addon, but not much fun to work on. It makes it easy for users to reward their players for playing games, and progressing. "
          image={prize_commands_img}
          status={ProjectStatus.Ongoing}
        />

        <ProjectCard
          title="Kinetic Kolor"
          link="https://kolor.azzamfamily.com/"
          description="An app that models 2D ball physics using rigid bodies. Gravity is determined by the device's accelerometer (if present) and by touch points. I originally built it in Godot, then ported it to WebAssembly to make it easier to run anywhere."
          image={physics_balls}
          status={ProjectStatus.MaintenanceMode}
        />

        <ProjectCard
          title="Dundas Weight Loss Clinic"
          link="https://www.dundasweightlossclinic.ca/"
          description="The website for Dundas Weight Loss Clinic, built by my friend Russell Passmore and I for his Mom's clinic. The clinic is now winding down, and the site will eventually be sunset, though it remains up as of this writing."
          image={dwlc}
          collaborators={["rpassmore01"]}
          status={ProjectStatus.MaintenanceMode}
        />

        <ProjectCard
          title="EnviroAntiMWP"
          link="https://github.com/MetallicGoat/EnviroAntiMWP"
          description="A tool developed to automate repetitive and time consuming data entry tasks for a large environmental firm. This tool was initially developed by me for a friend. Once the initial tool was built, my friend contributed bug fixes, and UI tweaks. See the GitHub page for a more complete writeup."
          image={enviro_anti_mwp}
          collaborators={["baff-collab"]}
          status={ProjectStatus.Retired}
        />

        <ProjectCard
          title="Fireball Jumping"
          link="https://github.com/MetallicGoat/FB-Knockback"
          description="One of my very first java projects. I created it for MBedwars, but before I joined as a contributor. It became much more popular than I thought it would, which inspired me to continue learning java. I have retired it, I have built its features directly into MBedwars, and MBedwars Tweaks."
          image={fireball_jumping_img}
          status={ProjectStatus.Retired}
        />

        <ProjectCard
          title="IS4P"
          link="https://github.com/MetallicGoat/infinite-support-4-paws"
          description="A website for a dog rescue called infinite support four paws. I had to put this project hold (School), but plan to come back to it soon. The plan is to move to next js (currently is using react and react-router), and migrate from css modules, to tailwind css."
          image={is4p_img}
          status={ProjectStatus.Retired}
        />

        <ProjectCard
          title="Phaser Space Game"
          link="https://github.com/MetallicGoat/PhaserSpaceGame"
          description="A very basic idle game created with JavaScript using the Phaser library. The purpose of the project was for me to learn JavaScript. "
          image={phaser_game_img}
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
          These are some photos I have taken, from some places I have been, me with some friends and family, and the doggies of course.
        </p>
      </div>

      <PhotoGallery/>
    </div>
  );
}

function Experience() {
  return (
    <div>
      <h3 className="text-3xl py-1 dark:text-white">Where I Have Worked</h3>
      <p className="text-lg py-2 leading-8 text-gray-800 dark:text-gray-200">
        A rundown of the jobs I have had, and what I have studied. It follows my resume pretty
        closely, which you can open from the navbar at the top of the page.
      </p>

      <h4 className="text-2xl font-bold pt-8 pb-4 dark:text-white">Work Experience</h4>
      {work.map((item) => (
        <ExperienceCard key={item.role} item={item}/>
      ))}

      <h4 className="text-2xl font-bold pt-4 pb-4 dark:text-white">Education</h4>
      {education.map((item) => (
        <ExperienceCard key={item.role} item={item}/>
      ))}

      <h4 className="text-2xl font-bold pt-4 pb-4 dark:text-white">Training and Certifications</h4>
      <ul className="ml-6 list-disc text-gray-600 dark:text-gray-300">
        {certifications.map((certification) => (
          <li key={certification.name}>
            {certification.name} &mdash; {certification.date}
          </li>
        ))}
      </ul>
    </div>
  )
}