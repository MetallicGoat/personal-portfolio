import Image, {StaticImageData} from "next/image";
import React, {FunctionComponent} from "react";


interface PhotoCardProps {
    title: string
    description: string;
    image: StaticImageData;
    hashTags: string[];
}

export const PhotoCard: FunctionComponent<PhotoCardProps> = ({title, image, description, hashTags}) => {
    return (
        <div
            className="relative w-full mx-auto max-w-sm bg-gray-200 rounded-xl overflow-hidden shadow-lg dark:bg-neutral-900 RGB:rgb-border">

            <div className="relative flex justify-center bg-gray-300 dark:bg-neutral-700 max-h-60 sm:h-72 overflow-hidden">
                {/*Background*/}
                <Image className="absolute blur-xl inset-0 h-full w-full" src={image}
                       alt="Image failed to load!"/>

                {/*Real Image*/}
                <Image className="z-20 w-auto object-contain" src={image} alt="Image failed to load!"/>
            </div>

            <div className="px-6 py-4">
                <h1 className="font-bold text-xl mb-2 dark:text-white">{title}</h1>
                <p className="text-gray-700 text-base dark:text-gray-300">
                    {description}
                </p>
            </div>

            <HashTag hashTags={hashTags}/>
        </div>
    )
}

interface HashTagProps {
    hashTags: string[];
}

const HashTag: FunctionComponent<HashTagProps> = ({hashTags}) => {
    const tags: React.ReactNode[] = [];
    let val = 1;

    hashTags.forEach(tag => {
        tags.push(
            <span
                key={val}
                className="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 dark:bg-neutral-700 dark:text-gray-300">
                #{tag}
            </span>
        )
        val++;
    });

    return <div className="px-6 pt-4 pb-2">{tags}</div>
};