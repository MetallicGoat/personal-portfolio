'use client'

import React, {FunctionComponent} from "react";
import Lightbox, {SlideImage} from "yet-another-react-lightbox";
import {Captions, Thumbnails, Zoom} from "yet-another-react-lightbox/plugins";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import {photos} from "@/data/photos";

/*
  The Zoom plugin does not play nicely with next/image, so instead of a custom slide renderer we
  hand the lightbox a plain srcSet pointed at the Next image optimizer (see the library's Next.js
  example). These must match the imageSizes/deviceSizes the optimizer accepts, /_next/image
  answers 400 for any other width.
 */
const IMAGE_SIZES = [32, 48, 64, 96, 128, 256, 384];
const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
const ALL_SIZES = [...IMAGE_SIZES, ...DEVICE_SIZES];

// q=90 is allowed by images.qualities in next.config.ts
const nextImageUrl = (src: string, size: number, quality = 90) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=${size}&q=${quality}`;

// The largest width the optimizer will accept that does not upscale the source
const largestSizeFor = (width: number) => ALL_SIZES.filter(size => size <= width).pop() ?? ALL_SIZES[0];

function buildSlides(): SlideImage[] {
  return photos.map(photo => {
    const {src, width, height} = photo.image;

    return {
      // width/height stay the intrinsic size, the Zoom plugin uses them to work out its max zoom
      width,
      height,
      src: nextImageUrl(src, largestSizeFor(width)),
      // the strip is ~120px wide, it must not pull the original
      thumbnail: nextImageUrl(src, 384, 75),
      alt: photo.title,
      title: photo.title,
      description: photo.description,
      srcSet: ALL_SIZES
        .filter(size => size <= width)
        .map(size => ({
          src: nextImageUrl(src, size),
          width: size,
          height: Math.round((height / width) * size),
        })),
    };
  });
}

// The manifest never changes, so the slides can be built once
const slides = buildSlides();

interface PhotoLightboxProps {
  open: boolean;
  index: number;
  close: () => void;
}

const PhotoLightbox: FunctionComponent<PhotoLightboxProps> = ({open, index, close}) => {
  return (
    <Lightbox
      open={open}
      index={index}
      close={close}
      slides={slides}
      plugins={[Zoom, Thumbnails, Captions]}
      zoom={{maxZoomPixelRatio: 3, scrollToZoom: true}}
      thumbnails={{width: 120, height: 80, border: 0, borderRadius: 8, padding: 4, gap: 8, showToggle: true}}
      captions={{descriptionTextAlign: "center", showToggle: true}}
      styles={{container: {backgroundColor: "rgba(0, 0, 0, .92)"}}}
    />
  );
};

export default PhotoLightbox;
