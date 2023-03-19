import React, {useState} from 'react';
import {NextPage} from "next";
import Graph from "@/components/Graph";
import {evaluate} from 'mathjs';
import {ProgressCard} from "@/components/tabs/ProgressCard";

export enum IssueType {
    NoIssue = "No Issue",
    MissingEquation = "Missing Equation",
    InvalidEquation = "Invalid Equation",
    ScaleToSmall = "Scale must be greater than 0"
}

const MathProjectPage: NextPage = () => {
    const [equation, setEquation] = useState<string>('');
    const [scale, setScale] = useState<number>(10);
    const [version, setVersion] = useState<number>(0);
    const [animate, setAnimate] = useState<boolean>(true);
    const [animationSpeed, setAnimationSpeed] = useState<number>(400);
    const [issue, setIssue] = useState<IssueType>(IssueType.NoIssue);

    const handleGraph = () => {
        // Test the Equation

        if(equation.length > 0) {
            try {
                evaluate(equation, {x: 1});
                setIssue(IssueType.NoIssue)
            } catch (e) {
                setIssue(IssueType.InvalidEquation)
            }
        } else {
            setIssue(IssueType.MissingEquation)
        }

        if(scale <= 0)
            setIssue(IssueType.ScaleToSmall)

        // Set and update
        if(issue == IssueType.NoIssue)
            setVersion((prev) => prev + 1);
    };

    const handleToggleAnimation = () => {
        setAnimate((prev) => !prev);
    };


    return (
        <div className="pt-2 w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl mb-4">Calculus ToolBox</h1>
            <div className="flex flex-col items-center mb-4">
                <input
                    className="border border-gray-400 p-2 mb-2"
                    type="text"
                    placeholder="Enter equation (e.g. x^2)"
                    value={equation}
                    onChange={(event) => setEquation(event.target.value)}
                />

                <input
                    className="border border-gray-400 p-2 mb-2"
                    type="number"
                    placeholder="Enter scale"
                    value={scale}
                    onChange={(event) => setScale(parseFloat(event.target.value))}
                />

                {issue != IssueType.NoIssue && (
                    <div className="text-red-600 mb-3">FAILED TO GRAPH: {issue}!</div>
                )}

                <button className="bg-blue-500 text-white px-4 py-2 rounded mb-2" onClick={handleGraph}>
                    Graph
                </button>

                <div className="flex items-center">
                    <label htmlFor="animateToggle" className="mr-2">Animate:</label>
                    <input type="checkbox" id="animateToggle" checked={animate} onChange={handleToggleAnimation}/>
                </div>

                {animate && (
                    <div className="flex items-center space-x-4">
                        <label htmlFor="animationSpeed" className="font-semibold">
                            Speed:
                        </label>
                        <input
                            type="range"
                            id="animationSpeed"
                            min="50"
                            max="3000"
                            step="100"
                            value={animationSpeed}
                            onChange={(event) => setAnimationSpeed(Number(event.target.value))}
                        />
                    </div>
                )}
            </div>
            <Graph equation={equation} scale={scale * 2} version={version} animate={animate} speed={animationSpeed}/>

            <div className="m-10">

                <ProgressCard date="Known Issues" changes={[
                    "The Grapher does not handle steep asymptotes well. This is because the grapher plots a bunch of points an then draws a line to each point afterward, but if the points are far apart (steep asymptote), the graph may start to fall apart. A good example of this is tan(x) with a scale of 50 or more.",
                    "Some equations dont get parsed properly. I dont know why yet, but in some cases the site has thrown errors in console, and failed to graph the equation. Possibly an issue with Math.js",
                ]}/>


                <ProgressCard date="March 18 2023" changes={[
                    "No longer manually parsing the equation (because that's very stupid) and I am now using the Math.js javascript library",
                    "Greatly improved the grapher by adding animation option, adding the ability to change the graph scale, improving the graph resolution, adding grid lines, and more",
                    "Added some styling",
                    "Added progress tracker (this)"
                ]}/>
                <ProgressCard date="March 17 2023" changes={[
                    "Created custom equation parser, and basic equation grapher",
                    "Created tool to sub an x value into a parsed equation and return an output (y-value)",
                    "Using a HTML Canvas to display a basic graph"
                ]}/>
            </div>
        </div>
    );
};

export default MathProjectPage;