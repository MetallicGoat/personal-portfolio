import Image, {StaticImageData} from "next/image";
import React, {FunctionComponent} from "react";

/* Cards are a fixed height, so every image gets letterboxed by some amount */
export const CARD_IMAGE_SIZES = "(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw";

interface BlurBackdropProps {
  image: StaticImageData;
}

/*
  Fills the letterboxing around the image. Static imports carry a tiny inlined blurDataURL, so
  using it as a background costs no extra request (the old version rendered the photo twice).
 */
export const BlurBackdrop: FunctionComponent<BlurBackdropProps> = ({image}) => {
  if (!image.blurDataURL)
    return <Image className="absolute blur-xl inset-0 h-full w-full" src={image} alt="" aria-hidden sizes="32px"/>;

  return (
    <span
      aria-hidden
      className="absolute inset-0 blur-xl scale-110 bg-cover bg-center"
      style={{backgroundImage: `url(${image.blurDataURL})`}}
    />
  );
};
