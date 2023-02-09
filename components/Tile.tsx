import Image, {StaticImageData} from "next/image";
import React, {FunctionComponent} from "react";

/*
const Tile = () => {
    return(

        <div className="basis-1/3 lg:basis-1/4 flex-1">
            <Image
                src={blank_img}
                alt="Failed to load tile Image!"
                style={{width: "100%", height: "auto"}}
                className="rounded-lg object-cover px-6 sm:px-0 shadow-lg"
            />
        </div>
    )
}
 */

interface TileProps {
    title: string
    description: string;
    image: StaticImageData;
    hashTags: string[];
}

export const Tile: FunctionComponent<TileProps> = ({title, image, description,  hashTags}) => {
    return(
        <div className="bg-gray-200 border-4 basis-1/2 sm:basis-1/3 lg:basis-1/4 flex-1 max-w-sm rounded-xl overflow-hidden shadow-lg" >
            <Image className="w-full" src={image} alt="Image failed to load!"/>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{title}</div>
                    <p className="text-gray-700 text-base">
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

    hashTags.forEach( tag => {
        tags.push(
            <span className="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #{tag}
            </span>
        )
    });

    return <div className="px-6 pt-4 pb-2">{tags}</div>
};