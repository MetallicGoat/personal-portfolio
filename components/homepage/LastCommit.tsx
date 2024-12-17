import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Image from "next/image";

interface CommitProps {
    username: string;
}

interface CommitData {
    created_at: string;
    message: string;
    repoName: string;
    url: string;
}

const LastCommit: React.FC<CommitProps> = ({username}) => {
    const [commit, setCommit] = useState<CommitData | null>(null);

    useEffect(() => {
        // API call to get the latest github stats
        (async () => {
            try {
                const {data} = await axios.get(`https://api.github.com/users/${username}/events`);
                const pushEvent = data.find((event: { type: string; }) => event.type === 'PushEvent');
                if (pushEvent) {
                    const latestCommit = pushEvent.payload.commits[0];

                    setCommit({
                        created_at: pushEvent.created_at,
                        message: latestCommit.message,
                        repoName: pushEvent.repo.name,
                        url: `https://github.com/${pushEvent.repo.name}/commit/${latestCommit.sha}`,
                    });
                }
            } catch (error) {
                console.error('Error fetching commit data:', error);
            }
        })();
    }, [username]);

    const checkDayMatch = (date: Date, commitDate: Date) => {
        return date.getFullYear() === commitDate.getFullYear() &&
            date.getMonth() === commitDate.getMonth() &&
            date.getDate() === commitDate.getDate();
    };

    const checkYesterdayMatch = (date: Date, commitDate: Date) => {
        // Subtract one day from the current date
        date.setDate(date.getDate() - 1);
        return checkDayMatch(date, commitDate);
    };

    const formatTime = (date: Date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two digits for minutes
        return `${hours}:${minutes}`;
    };

    const getDateString = () => {
        if (commit == null)
            return "UNKNOWN";

        const currentDate = new Date();
        const commitDate = new Date(commit.created_at);

        if (checkDayMatch(currentDate, commitDate)) {
            return `Today at ${formatTime(commitDate)}`;
        } else if (checkYesterdayMatch(currentDate, commitDate)) {
            return `Yesterday at ${formatTime(commitDate)}`;
        } else {
            return commitDate.toLocaleDateString();
        }
    };

    if (!commit) return <div>Loading...</div>;

    return (

        <div className="pb-10 w-fit mx-auto max-w-4xl">
            <h2 className="dark:text-white font-bold text-xl text-center p-2 mb-4 RGB:animated-text-color">My Latest Open Source Contribution</h2>
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
                            <th className="dark:text-white text-left px-4 py-1 whitespace-normal break-words">Project:</th>
                            <td className="dark:text-white px-4 py-1 whitespace-normal break-words">{commit.repoName.replace("MetallicGoat/", "")}</td>
                        </tr>
                        <tr className="border-b dark:border-neutral-700">
                            <th className="dark:text-white text-left px-4 py-1 whitespace-normal break-words">Latest Contribution:</th>
                            <td className="dark:text-white px-4 py-1 whitespace-normal break-words">{getDateString()}</td>
                        </tr>
                        <tr className="border-b dark:border-neutral-700">
                            <th className="dark:text-white text-left text-wrap px-4 py-1 whitespace-normal break-words">Commit Message:</th>
                            <td className="dark:text-white px-4 py-1 whitespace-normal break-words">{commit.message}</td>
                        </tr>
                        </tbody>
                    </table>
                    <a href={commit.url} target="_blank" rel="noopener noreferrer"
                       className="-2 text-blue-600 hover:text-blue-800 block text-center mt-2 font-bold">
                        View Contribution on GitHub
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LastCommit;
