import React, {FunctionComponent} from "react";

interface ProgressCard {
  date: string
  changes: string[];
}

export const ProgressCard: FunctionComponent<ProgressCard> = ({date, changes}) => {

  const tags: React.ReactNode[] = [];

  let i = 1;

  changes.forEach(change => {
    tags.push(
      <li key={i}>{change}</li>
    )
    i++;
  });

  return (
    <div className="py-3 pb-5">
      <h2 className="font-bold pb-1 text-lg dark:text-white">{date}</h2>
      <ul className="ml-6 list-disc text-gray-600 dark:text-gray-300">
        {tags}
      </ul>
    </div>
  )
}