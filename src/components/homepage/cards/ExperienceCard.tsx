import React, {FunctionComponent} from "react";
import Link from "next/link";
import {ExperienceItem} from "@/types";

interface ExperienceCardProps {
  item: ExperienceItem;
}

export const ExperienceCard: FunctionComponent<ExperienceCardProps> = ({item}) => {
  return (
    <div className="relative pl-6 pb-8 border-l-2 border-gray-300 dark:border-neutral-700 last:border-transparent">
      {/* Dot sitting on the timeline, pulled half its width to the left to center it on the line */}
      <span className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-green-600"/>

      <div className="md:flex md:items-baseline md:justify-between md:gap-4">
        <h2 className="font-bold text-lg dark:text-white">{item.role}</h2>
        <span className="text-gray-600 dark:text-gray-400 whitespace-nowrap">{item.date}</span>
      </div>

      <p className="italic text-gray-700 dark:text-gray-300">{item.org}</p>

      {item.points.length > 0 && (
        <ul className="ml-6 mt-2 list-disc text-gray-600 dark:text-gray-300">
          {item.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}

      {item.link && (
        <Link
          href={item.link.href}
          className="inline-block mt-2 font-bold text-blue-600 hover:text-blue-800"
        >
          {item.link.label}
        </Link>
      )}
    </div>
  )
}
