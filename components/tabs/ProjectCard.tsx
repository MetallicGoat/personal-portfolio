import Image, {StaticImageData} from "next/image";
import React, {FunctionComponent} from "react";
import java_icon from "@/public/logos/java.png";
import javascript_icon from "@/public/logos/javascript.png";
import mbedwars_icon from "@/public/logos/mbedwars.png";
import spigot_icon from "@/public/logos/spigot.png";
import papermc_icon from "@/public/logos/papermc.png";

import {BsGithub} from 'react-icons/bs';

export enum ProjectStatus {
    Ongoing = 'ACTIVE DEVELOPMENT',
    OnHold = 'ON HOLD',
    Retired = 'RETIRED PROJECT',
    MaintenanceMode = 'MAINTENANCE MODE'
}

function getStatusClass(status: ProjectStatus) {
    switch (status) {
        case ProjectStatus.Ongoing:
            return 'bg-gradient-to-r from-green-500 to-lime-500';
        case ProjectStatus.OnHold:
            return 'bg-gradient-to-r from-yellow-600 to-yellow-400';
        case ProjectStatus.Retired:
            return 'bg-gradient-to-r from-red-600 to-red-400';
        case ProjectStatus.MaintenanceMode:
            return 'bg-gradient-to-r from-indigo-600 to-indigo-400';

    }
}

export enum CompatibleBubble {
    Java,
    JavaScript,
    MBedwars,
    Spigot,
    Paper
}

function getCompatibleBubbleImage(type: CompatibleBubble) {
    switch (type) {
        case CompatibleBubble.Java:
            return java_icon;
        case CompatibleBubble.JavaScript:
            return javascript_icon;
        case CompatibleBubble.MBedwars:
            return mbedwars_icon;
        case CompatibleBubble.Spigot:
            return spigot_icon;
        case CompatibleBubble.Paper:
            return papermc_icon;
    }
}

interface TileProps {
    title: string
    description: string;
    link: string;
    image: StaticImageData;
    bubbles: CompatibleBubble[];
    status: ProjectStatus;
}

export const ProjectCard: FunctionComponent<TileProps> = ({title, image, link, description, bubbles, status}) => {
    return (
        <div className="relative w-full mx-auto max-w-sm bg-gray-200 rounded-xl overflow-hidden shadow-lg RGB:rgb-border">
            <Bubbles
                className="absolute inset-0 z-50"
                bubbles={bubbles}
                link={link}
            />

            <div className="relative flex justify-center bg-gray-300 dark:bg-neutral-700 max-h-60 sm:h-72 overflow-hidden">
                {/*Background*/}
                <Image className="absolute blur-xl inset-0 h-full w-full" src={image} alt="Image failed to load!"/>

                {/*Real Image*/}
                <Image className="z-20 w-auto object-contain" src={image} alt="Image failed to load!"/>
            </div>

            <h3 className={`font-bold text-center px-2 dark:text-white ${getStatusClass(status)}`}>Status: {status}</h3>

            <div className="px-1 md:p-3 py-2 h-full dark:bg-neutral-900">
                <h1 className="font-bold text-lg sm:mb-1 dark:text-white">
                    {title}
                </h1>

                <p className="text-sm text-gray-700 dark:text-gray-300">
                    {description}
                </p>
            </div>
        </div>

    )
}

interface BubblesProps {
    bubbles: CompatibleBubble[];
    link: string
    className: string;
}

const Bubbles: FunctionComponent<BubblesProps> = ({bubbles, className, link}) => {
    const tags: React.ReactNode[] = [];

    let i = 1;

    bubbles.forEach(bubble => {
        tags.push(
            <Image
                className="rounded-full w-2/6 bg-white text-sm font-semibold text-gray-700"
                width="1000"
                height="1000"
                src={getCompatibleBubbleImage(bubble)}
                alt="X"
                key={i}
            />
        )
        i++;
    });

    return (
        <div className={`flex justify-between  ${className}`}>
            <a className="rounded-full bg-white w-16 h-16 p-2 m-2 xs:m-1 sm:m-2 ease-in duration-150 hover:bg-gray-200"
               href={link} target="_blank" rel="noreferrer noopener">
                <BsGithub className="w-full h-full text-neutral-700"/>
            </a>

            <div className=" w-1/2 flex flex-col items-end gap-2 xs:gap-1 sm:gap-2 p-2 xs:p-1 sm:p-2">{tags}</div>
        </div>
    )
};
