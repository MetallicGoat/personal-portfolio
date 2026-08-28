import {StaticImageData} from "next/image";

export type BlogItem = {
  id: string;
  title: string;
  summary: string;
  date: string;
}

export type Photo = {
  slug: string;
  title: string;
  description: string;
  hashTags: string[];
  /* The full resolution original. next/image sizes it down for the grid. */
  image: StaticImageData;
}

export type ExperienceItem = {
  role: string;
  org: string;
  date: string;
  points: string[];
  /* Eg. a blog post I wrote about the job */
  link?: { href: string; label: string };
}
