import Image, {StaticImageData} from "next/image";
import React, {FunctionComponent} from "react";
import java_icon from "@/public/logos/java.png";
import javascript_icon from "@/public/logos/javascript.png";
import mbedwars_icon from "@/public/logos/mbedwars.png";
import spigot_icon from "@/public/logos/spigot.png";
import papermc_icon from "@/public/logos/papermc.png";

export enum ProjectStatus {
    Ongoing = 'ACTIVE DEVELOPMENT',
    OnHold = 'ON HOLD',
    Retired = 'RETIRED PROJECT',
    MaintenanceMode = 'MAINTENANCE MODE'
}

function getStatusClass(status: ProjectStatus) {
    switch (status) {
        case ProjectStatus.Ongoing:
            return 'bg-lime-500';
        case ProjectStatus.OnHold:
            return 'bg-yellow-400';
        case ProjectStatus.Retired:
            return 'bg-red-400';
        case ProjectStatus.MaintenanceMode:
            return 'bg-indigo-400';

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
    image: StaticImageData;
    bubbles: CompatibleBubble[];
    status: ProjectStatus;
}

export const ProjectTile: FunctionComponent<TileProps> = ({title, image, description, bubbles, status}) => {
    return (
        <div
            className="bg-gray-200 border-2 sm:border-4 basis-1/2 xs:basis-1/3 lg:basis-1/4 flex-1 max-w-sm rounded-xl overflow-hidden shadow-lg">

            <div className="relative">
                <Image className="w-full" src={image} alt="Image failed to load!"/>
                <Bubbles className="absolute w-full inset-0 flex flex-col items-end gap-2 xs:gap-1 sm:gap-2 p-2 xs:p-1 sm:p-2" bubbles={bubbles}/>
            </div>

            <h3 className={`border-t-4 border-b-4 border-gray-500 font-bold text-center px-2 ${getStatusClass(status)}`}>Status: {status}</h3>

            <div className="px-1 md:p-3 py-2 sm:py-4">
                <h1 className="font-bold text-lg sm:text-xl sm:mb-2">
                    {title}
                </h1>

                <p className="text-xs sm:text-lg text-gray-700 text-base">
                    {description}
                </p>

                <a href="components" target="_blank">
                    <button className="flex mx-auto rounded-xl text-lg font-bold px-6 py-2 mt-4 bg-gray-500 transition ease-in duration-200 hover:scale-110 hover:bg-green-500">View Project</button>
                </a>
            </div>
        </div>
    )
}

interface HashTagProps {
    bubbles: CompatibleBubble[];
    className: string;
}

const Bubbles: FunctionComponent<HashTagProps> = ({bubbles, className}) => {
    const tags: React.ReactNode[] = [];

    bubbles.forEach(bubble => {
        tags.push(
            <Image
                className="rounded-full w-1/6 bg-white text-sm font-semibold text-gray-700 border-4 border-gray-500"
                width="1000"
                height="1000"
                src={getCompatibleBubbleImage(bubble)}
                alt="X"
            />
        )
    });

    return <div className={className}>{tags}</div>
};