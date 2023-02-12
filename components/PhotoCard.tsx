import Image, {StaticImageData} from "next/image";
import React, {FunctionComponent} from "react";
import SlideIn from "@/components/SlideIn";

interface TileProps {
    title: string
    description: string;
    image: StaticImageData;
    hashTags: string[];
}

export const PhotoCard: FunctionComponent<TileProps> = ({title, image, description, hashTags}) => {
    return (
        <SlideIn>
        <div className="relative w-full mx-auto max-w-sm bg-gray-200 border-2 sm:border-4 rounded-xl overflow-hidden shadow-lg">

            <div className="relative flex justify-center bg-gray-300 max-h-60 sm:h-72 overflow-hidden">
                {/*Background*/}
                <Image className="absolute blur-xl inset-0 h-full w-full" src={image} alt="Image failed to load!"/>

                {/*Real Image*/}
                <Image className= "z-20 w-auto object-contain" src={image} alt="Image failed to load!"/>
            </div>

            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">
                    {description}
                </p>
            </div>

            <HashTag hashTags={hashTags}/>
        </div></SlideIn>
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
                className="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #{tag}
            </span>
        )
        val++;
    });

    return <div className="px-6 pt-4 pb-2">{tags}</div>
};