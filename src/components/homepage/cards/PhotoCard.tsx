import Image from "next/image";
import React, {FunctionComponent} from "react";
import {BsArrowsFullscreen} from "react-icons/bs";
import {Photo} from "@/types";
import {BlurBackdrop, CARD_IMAGE_SIZES} from "@/components/homepage/cards/BlurBackdrop";

interface PhotoCardProps {
  photo: Photo;
  onOpen: () => void;
}

export const PhotoCard: FunctionComponent<PhotoCardProps> = ({photo, onOpen}) => {
  const {title, description, hashTags, image} = photo;

  return (
    <div
      className="relative flex h-full w-full max-w-sm mx-auto flex-col bg-gray-200 rounded-xl overflow-hidden shadow-lg dark:bg-neutral-900 RGB:rgb-border">

      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${title} full screen`}
        className="group relative flex justify-center bg-gray-300 dark:bg-neutral-700 max-h-60 sm:h-72 overflow-hidden cursor-zoom-in focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-inset">

        {/*Background*/}
        <BlurBackdrop image={image}/>

        {/*Real Image*/}
        <Image
          className="z-20 w-auto object-contain transition duration-300 group-hover:scale-105"
          src={image}
          sizes={CARD_IMAGE_SIZES}
          alt={title}
        />

        {/*Click affordance*/}
        <span
          className="z-30 absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          <BsArrowsFullscreen className="w-8 h-8 text-white drop-shadow"/>
        </span>
      </button>

      <div className="flex-1 px-6 py-4">
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
