import Image, {StaticImageData} from "next/image";
import React, {FunctionComponent} from "react";

import {BsBoxArrowUpRight, BsPeopleFill} from 'react-icons/bs';
import {BlurBackdrop, CARD_IMAGE_SIZES} from "@/components/homepage/cards/BlurBackdrop";

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

interface TileProps {
  title: string
  description: string;
  link: string;
  image: StaticImageData;
  status: ProjectStatus;
  /* GitHub usernames of the people I built this with */
  collaborators?: string[];
}

const CollaboratorLink: FunctionComponent<{ username: string }> = ({username}) => (
  <a
    className="font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
    href={`https://github.com/${username}`}
    target="_blank"
    rel="noreferrer noopener">
    @{username}
  </a>
);

/* Shared by the linked and unlinked versions of the image panel */
const IMAGE_PANEL_CLASSES = "group relative flex justify-center bg-gray-300 dark:bg-neutral-700 max-h-60 sm:h-72 overflow-hidden";

export const ProjectCard: FunctionComponent<TileProps> = ({title, image, link, description, status, collaborators}) => {
  const hasCollaborators = !!collaborators && collaborators.length > 0;

  const picture = (
    <>
      {/*Background*/}
      <BlurBackdrop image={image}/>

      {/*Real Image*/}
      <Image
        className="z-20 w-auto object-contain transition duration-300 group-hover:scale-105"
        src={image}
        sizes={CARD_IMAGE_SIZES}
        alt={title}
      />
    </>
  );

  return (
    <div
      className="relative flex h-full w-full max-w-sm mx-auto flex-col bg-gray-200 rounded-xl overflow-hidden shadow-lg dark:bg-neutral-900 RGB:rgb-border">
      {link ? (
        <a
          className={`${IMAGE_PANEL_CLASSES} cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-inset`}
          href={link}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Open the ${title} project page`}>

          {picture}

          {/*Click affordance*/}
          <span
            className="z-30 absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
            <BsBoxArrowUpRight className="w-8 h-8 text-white drop-shadow"/>
          </span>
        </a>
      ) : (
        <div className={IMAGE_PANEL_CLASSES}>{picture}</div>
      )}

      {hasCollaborators && (
        <div className="group/collab absolute top-2 right-2 z-40">
          <span
            tabIndex={0}
            aria-label={`Built in collaboration with ${collaborators.join(', ')}`}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm ring-1 ring-white/25 cursor-help focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
            <BsPeopleFill className="h-4 w-4"/>
          </span>

          {/* pt-2 bridges the gap, so the panel stays hovered while the cursor travels onto it */}
          <div
            className="absolute right-0 top-full pt-2 w-max max-w-56 invisible opacity-0 transition-opacity duration-200 group-hover/collab:visible group-hover/collab:opacity-100 group-focus-within/collab:visible group-focus-within/collab:opacity-100">
            <div
              className="rounded-lg bg-white/95 dark:bg-neutral-800/95 px-3 py-2 text-sm shadow-lg ring-1 ring-black/10 dark:ring-white/10">
              <p className="font-bold mb-1 dark:text-white">Built in collaboration with</p>
              <ul>
                {collaborators.map((username) => (
                  <li key={username}><CollaboratorLink username={username}/></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <h3 className={`font-bold text-center px-2 py-1 dark:text-white ${getStatusClass(status)}`}>Status: {status}</h3>

      <div className="flex-1 px-6 py-4">
        <h1 className="font-bold text-xl mb-2 dark:text-white">
          {title}
        </h1>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          {description}
        </p>
      </div>
    </div>

  )
}
