import {Photo} from "@/types";

import avery_berg_lake_img from "@/public/photos/avery_and_i_berg_lake.jpg";
import avery_hiking_img from "@/public/photos/avery_and_i_hiking.jpg";
import bike_trip_img from "@/public/photos/bike_trip.jpg";
import brothers_camping_img from "@/public/photos/brothers_camping.jpg";
import brothers_dad_wedding_img from "@/public/photos/brothers_dad_wedding.jpg";
import dad_and_i_img from "@/public/photos/dad_and_i.jpg";
import enzo_upsidedown_img from "@/public/photos/enzo_upsidedown.jpg";
import milo_chase_img from "@/public/photos/milo_chase.jpg";
import mom_and_i_img from "@/public/photos/mom_and_i.jpg";
import zo_and_lo_img from "@/public/photos/zo_and_lo.jpg";

export const photos: Photo[] = [
  {
    slug: "bike-trip",
    title: "Bike Trip",
    hashTags: ["camping", "biking", "400km"],
    description: "Beginning of a 400km bike trip from Grand Bend to Manitoulin Island",
    image: bike_trip_img,
  },
  {
    slug: "berg-lake",
    title: "Berg Lake",
    hashTags: ["hiking", "glacier", "backpacking"],
    description: "Avery and I at Berg Lake, with the glacier right behind us",
    image: avery_berg_lake_img,
  },
  {
    slug: "hiking-the-valley",
    title: "Hiking the Valley",
    hashTags: ["hiking", "Alberta", "backpacking"],
    description: "Avery and I part way up the Berg Lake trail",
    image: avery_hiking_img,
  },
  {
    slug: "dad-and-i",
    title: "Dad and I",
    hashTags: ["hiking", "mountains", "dad"],
    description: "Dad and I nearing the treeline, at the top of a long climb",
    image: dad_and_i_img,
  },
  {
    slug: "brothers-camping",
    title: "Brothers Camping",
    hashTags: ["camping", "hiking", "Alberta"],
    description: "Somewhere part way up the trail on a backpacking trip with my brothers",
    image: brothers_camping_img,
  },
  {
    slug: "post-wedding",
    title: "Post Wedding",
    hashTags: ["family", "suits", "sunset"],
    description: "My brothers, my dad, and I right after a friend's wedding",
    image: brothers_dad_wedding_img,
  },
  {
    slug: "mom-and-i",
    title: "Mom and I",
    hashTags: ["Netherlands", "canals", "family"],
    description: "Mom and I on a walk along a canal in the Netherlands",
    image: mom_and_i_img,
  },
  {
    slug: "typical-milo",
    title: "Typical Milo",
    hashTags: ["dogs", "summer", "pool"],
    description: "Milo mid jump, chasing me into the pool",
    image: milo_chase_img,
  },
  {
    slug: "sleepin-enzo",
    title: "Sleepin' Enzo",
    hashTags: ["dogs", "passed-out", "upside-down"],
    description: "Enzo passed out upside down on the couch",
    image: enzo_upsidedown_img,
  },
  {
    slug: "zo-and-lo",
    title: "Zo and Lo",
    hashTags: ["dogs", "walkies", "spring"],
    description: "Enzo and Milo, waiting to head out for a walk",
    image: zo_and_lo_img,
  },
];
