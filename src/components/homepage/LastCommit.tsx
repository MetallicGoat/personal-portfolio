import React from 'react';
import Image from "next/image";

interface CommitProps {
  username: string;
}

interface GitHubEvent {
  type: string;
  repo: {
    name: string;
  };
  payload: {
    // PushEvent payloads no longer carry the commits themselves, only the SHAs
    head?: string;
  };
  created_at: string;
}

interface GitHubCommit {
  html_url: string;
  // The GitHub account behind the commit, null when the email matches no account
  author: {
    login: string;
  } | null;
  commit: {
    message: string;
  };
  stats?: {
    additions: number;
    deletions: number;
  };
  files?: unknown[];
}

// Each push event costs an extra request to resolve
const MAX_PUSH_EVENTS_CHECKED = 5;

// One shared fetch per hour for every visitor, rather than two per page load per visitor
const REVALIDATE_SECONDS = 3600;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/* The page is prerendered, so there is no visitor clock to read. Commits are shown in my timezone */
const DAY = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Toronto',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
});

const TIME = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Toronto',
  hour: 'numeric',
  minute: '2-digit',
  hourCycle: 'h23'
});

/*
  GitHub rejects requests with no User-Agent (403), which the browser used to set for us.
  Returns null rather than throwing, so an outage cannot take the whole page down.
 */
async function githubFetch<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`https://api.github.com${path}`, {
      cache: 'force-cache',
      next: {revalidate: REVALIDATE_SECONDS},
      headers: {'Accept': 'application/vnd.github+json', 'User-Agent': 'personal-portfolio'},
    });

    if (!response.ok) {
      console.error(`GitHub API ${path} responded ${response.status}`);
      return null;
    }

    return await response.json() as T;
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
    return null;
  }
}

const getDateString = (date: Date) => {
  const now = Date.now();
  const day = DAY.format(date);

  if (day === DAY.format(now))
    return `Today at ${TIME.format(date)}`;

  if (day === DAY.format(now - MS_PER_DAY))
    return `Yesterday at ${TIME.format(date)}`;

  return day;
};

const LastCommit = async ({username}: CommitProps) => {
  const events = await githubFetch<GitHubEvent[]>(`/users/${username}/events/public`);

  const pushEvents = (events ?? [])
    .filter((event) =>
      event.type === 'PushEvent' &&
      event.repo.name !== `${username}/personal-portfolio` &&
      event.payload.head
    )
    .slice(0, MAX_PUSH_EVENTS_CHECKED);

  // Eg. for a pull request, show my merge, not someone else's work
  // Don't want to claim something that's not mine
  let latest: { event: GitHubEvent, commit: GitHubCommit } | null = null;

  for (const event of pushEvents) {
    // Eg. null when the push was force pushed away, or the repo went private
    const commit = await githubFetch<GitHubCommit>(`/repos/${event.repo.name}/commits/${event.payload.head}`);

    if (!commit)
      continue;

    // Falls back to the most recent push when none of them turn out to be mine
    latest ??= {event, commit};

    if (commit.author?.login.toLowerCase() === username.toLowerCase()) {
      latest = {event, commit};
      break;
    }
  }

  if (!latest)
    return null;

  const {event, commit} = latest;
  const filesChanged = commit.files?.length ?? 0;

  return (
    <>
      <hr className="w-full rounded-full my-10 border-2 border-gray-300 dark:border-neutral-700"/>

      <div className="pb-10 w-fit mx-auto max-w-4xl">
        <h2 className="dark:text-white font-bold text-xl text-center p-2 mb-4 RGB:animated-text-color">My Latest Open
          Source Contribution</h2>
        <div className="flex">
          <div className="md:flex flex-col items-center justify-center min-w-36 hidden">
            <Image width={400} height={400} src={`https://github.com/${username}.png`}
                   alt={`${username}'s profile picture`}
                   className="w-32 rounded-full shadow-xl shadow-gray-300 dark:shadow-gray-800 RGB:rgb-border"
            />

          </div>

          <div className="flex flex-col items-center justify-center">
            <table className="table-fixed mx-4">
              <tbody>
              <tr className="border-b dark:border-neutral-700">
                <th className="dark:text-white min-w-52 text-left px-4 py-1 whitespace-normal break-words">Project:</th>
                <td
                  className="dark:text-white px-4 py-1 whitespace-normal break-words">{event.repo.name.replace("MetallicGoat/", "")}</td>
              </tr>
              <tr className="border-b dark:border-neutral-700">
                <th className="dark:text-white text-left px-4 py-1 whitespace-normal break-words">Latest Contribution:
                </th>
                <td className="dark:text-white px-4 py-1 whitespace-normal break-words">
                  <time dateTime={event.created_at}>{getDateString(new Date(event.created_at))}</time>
                </td>
              </tr>
              <tr className="border-b dark:border-neutral-700">
                <th className="dark:text-white text-left text-wrap px-4 py-1 whitespace-normal break-words">Commit
                  Message:
                </th>
                <td
                  className="dark:text-white px-4 py-1 whitespace-normal break-words">{commit.commit.message.split('\n')[0]}</td>
              </tr>
              <tr className="border-b dark:border-neutral-700">
                <th className="dark:text-white text-left px-4 py-1 whitespace-normal break-words">Changes:</th>
                <td className="dark:text-white px-4 py-1 whitespace-normal break-words">
                  <span className="text-green-700 dark:text-green-400 font-bold">+{commit.stats?.additions ?? 0}</span>
                  <span className="ml-2 text-red-700 dark:text-red-400 font-bold">&minus;{commit.stats?.deletions ?? 0}</span>
                  <span className="ml-2">
                    across {filesChanged} {filesChanged === 1 ? "file" : "files"}
                  </span>
                </td>
              </tr>
              </tbody>
            </table>
            <a href={commit.html_url} target="_blank" rel="noopener noreferrer"
               className="text-blue-600 hover:text-blue-800 block text-center mt-2 font-bold">
              View Contribution on GitHub
            </a>
          </div>
        </div>
      </div>

      <hr className="w-full rounded-full my-10 border-2 border-gray-300 dark:border-neutral-700"/>
    </>
  );
};

export default LastCommit;
