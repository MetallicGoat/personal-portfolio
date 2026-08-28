'use client'

import React, {useCallback, useState} from "react";
import dynamic from "next/dynamic";

import {PhotoCard} from "@/components/homepage/cards/PhotoCard";
import {photos} from "@/data/photos";

/*
  Kept out of the initial bundle, only needed once a photo is actually clicked.
  Hovering a card warms the chunk up so the click still feels instant.
 */
const PhotoLightbox = dynamic(() => import("@/components/homepage/PhotoLightbox"), {ssr: false});
const preloadLightbox = () => import("@/components/homepage/PhotoLightbox");

export default function PhotoGallery() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  // Once opened it stays mounted, otherwise the closing animation gets cut off
  const [everOpened, setEverOpened] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  const openAt = (i: number) => {
    setIndex(i);
    setEverOpened(true);
    setOpen(true);
  };

  return (
    <>
      <div
        onMouseEnter={preloadLightbox}
        onFocus={preloadLightbox}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center sm:place-items-stretch px-3 py-4 xs:px-0 gap-5 sm:py-10">

        {photos.map((photo, i) => (
          <PhotoCard key={photo.slug} photo={photo} onOpen={() => openAt(i)}/>
        ))}
      </div>

      {everOpened && <PhotoLightbox open={open} index={index} close={close}/>}
    </>
  );
}
