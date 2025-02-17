import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {NextPage} from "next";
import Graph from "@/components/mathproject/Graph";
import {ProgressCard} from "@/components/homepage/cards/ProgressCard";
import {CalculateMethod, GraphInfo, IssueType} from "@/components/mathproject/GraphInfo";

const MathProjectPage: NextPage = () => {
    const [issue, setIssue] = useState<boolean>(false);
    const [version, setVersion] = useState<number>(0);
    const [graphInfo, setGraphInfo] = useState<GraphInfo | null>(null);

    useEffect(() => {
        const initialGraphInfo = new GraphInfo(
            "abs(x) * sin(x)",
            10,
            10,
            450,
            CalculateMethod.RRAM,
            "-7",
            "2",
            25,
            () => {
                setGraphInfo((prevInstance) => {
                    if (prevInstance) {
                        return GraphInfo.cloneFromInstance(prevInstance);
                    }
                    return prevInstance;
                });
            });

        setGraphInfo(initialGraphInfo);
    }, []);

    if (!graphInfo) {
        return <div>Loading...</div>;
    }

    const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        graphInfo.setFindAreaMethod(event.target.value as CalculateMethod);
    };

    const handleGraph = () => {
        // Set and update
        if (graphInfo.getIssue() == IssueType.NoIssue) {
            setIssue(false)
            setVersion((prev) => prev + 1);
        } else {
            setIssue(true)
        }
    };

    const titleClassNames = "text-xs dark:text-white";

    return (
        <motion.div
            className="w-full"
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: .5}}
        >
            <h1 className="text-2xl sm:text-3xl font-bold text-center animated-text-color">Calculus ToolBox</h1>
            <h2 className="text-lg sm:text-xl mb-2 font-bold text-center dark:text-white">By: Christian Azzam</h2>
            <div className="flex flex-col items-center lg:flex-row lg:justify-around bg-slate-50 ease-in duration-300 dark:bg-gray-800 rounded-2xl">
                <div className="w-5/6 md:w-2/3 lg:w-2/5 xl:w-1/3 my-5 lg:m-5 border-gray-200 dark:border-gray-500 border-8 rounded-lg">
                    <Graph
                        graphInfo={graphInfo}
                        version={version}
                    />
                </div>

                <div className="">

                    {/*For smaller screens*/}
                    <button className="lg:hidden ease-in duration-200 hover:scale-105 flex mx-auto bg-blue-500 hover:bg-blue-600 text-white text-lg px-4 py-1 mb-3 rounded"
                            onClick={handleGraph}>
                        Graph
                    </button>

                    <h1 className="text-xl xl:text-2xl text-center font-bold dark:text-white">Options</h1>

                    <div className="flex flex-col sm:flex-row">
                        <div className="bg-gray-200 p-3 m-3 rounded-xl dark:bg-gray-500">

                            <h1 className={titleClassNames}>Equation</h1>
                            <input
                                className="border border-gray-400 p-2 mb-2 w-full"
                                type="text"
                                placeholder="Enter equation (e.g. x^2)"
                                value={graphInfo.function}
                                onChange={(event) => graphInfo.setAnyFunction(event.target.value)}
                            />

                            <h1 className={titleClassNames}>Scale X</h1>
                            <input
                                className="border border-gray-400 p-2 mb-2 w-full"
                                type="number"
                                placeholder="Enter X Scale"
                                value={graphInfo.scaleX}
                                onChange={(event) => graphInfo.setScaleX(parseFloat(event.target.value))}
                            />

                            <h1 className={titleClassNames}>Scale Y</h1>
                            <input
                                className="border border-gray-400 p-2 mb-2 w-full"
                                type="number"
                                placeholder="Enter Y Scale"
                                value={graphInfo.scaleY}
                                onChange={(event) => graphInfo.setScaleY(parseFloat(event.target.value))}
                            />

                            <h1 className={titleClassNames}>Animation Speed</h1>
                            <div className="flex items-center space-x-4 mb-2 w-full">
                                <input
                                    type="range"
                                    id="animationSpeed"
                                    min="50"
                                    max="3000"
                                    step="50"
                                    className="w-full"
                                    value={graphInfo.speed}
                                    onChange={(event) => graphInfo.setSpeed(Number(event.target.value), 3000)}
                                />
                            </div>
                        </div>

                        <div className="bg-gray-200 p-3 m-3 rounded-xl dark:bg-gray-500">
                            <h1 className={titleClassNames}>Calculation Method</h1>
                            <div className="w-full mb-2">
                                <select
                                    value={graphInfo.findAreaMethod}
                                    onChange={(handleSelectionChange)}
                                    className="border border-gray-400 p-1 w-full"
                                >
                                    {Object.values(CalculateMethod).map((method) => (
                                        <option key={method} value={method}>
                                            {method}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <h1 className={titleClassNames}>Start X</h1>
                            <input
                                className="border border-gray-400 p-2 mb-2 w-full"
                                type="number"
                                placeholder="Start X"
                                value={graphInfo.startX}
                                onChange={(event) => graphInfo.setStartX(event.target.value)}
                            />

                            <h1 className={titleClassNames}>End X</h1>
                            <input
                                className="border border-gray-400 p-2 mb-2 w-full"
                                type="number"
                                placeholder="End X"
                                value={graphInfo.endX}
                                onChange={(event) => graphInfo.setEndX(event.target.value)}
                            />

                            <h1 className={titleClassNames}># of Rectangles or Trapezoids</h1>
                            <input
                                className="border border-gray-400 p-2 mb-2 w-full"
                                type="number"
                                placeholder="# of rectangles or trapezoids"
                                value={graphInfo.stepAmount}
                                onChange={(event) => graphInfo.setStepAmount(parseFloat(event.target.value))}
                            />
                        </div>
                    </div>

                    {issue && (
                        <div className="w-3/4 text-red-600 mb-3 text-center mx-auto">FAILED TO GRAPH: Check to make sure
                            your equation is valid! It is case sensitive!</div>
                    )}

                    <button className="hidden lg:block ease-in duration-200 hover:scale-105 mx-auto bg-blue-500 hover:bg-blue-600 text-white text-lg px-4 py-1 rounded m-2"
                            onClick={handleGraph}>
                        Graph
                    </button>
                </div>
            </div>

            <div className="flex justify-center">
                <a href="https://github.com/MetallicGoat/personal-portfolio" target="_blank"
                   className="ease-in duration-200 hover:scale-105 text-center bg-green-600 hover:bg-green-700 text-white text-lg px-4 py-1 rounded m-4" rel="noreferrer">
                    Source Code
                </a>
            </div>

            <br/>
            <ProgressCard date="Known Issues" changes={[
                "The Grapher does not handle steep asymptotes well. This is because the grapher plots a bunch of points an then draws a line to each point afterward, but if the points are far apart (like a steep asymptote), it may fail. A good example of this is tan(x) with a scale of 10 at a fast animation speed",
            ]}/>

            <br/>
            <br/>

            <ProgressCard date="May 20 2023" changes={[
                "Fix graph was being re-rendered in some cases when it did not need to",
                "Even more styling improvements"
            ]}/>
            <ProgressCard date="May 19 2023" changes={[
                "Fix web app crashing when entering an invalid equation",
                "Fix red areas do not get rendered if the the scale is to small",
                "Fix issues with entering negative StartX and EndX values",
                "Now Displaying integral estimations on graph canvas (Total area, and integral approximation)",
                "Added intersection markers for the red areas",
                "Huge styling improvements (especially in dark mode)"
            ]}/>
            <ProgressCard date="May 18 2023" changes={[
                "Removed the mode for quadratic formulas, as it was redundant",
                "Use LRAM by default (instead of having it disabled)",
                "Misc changes to labels",
                "Add Source code link"
            ]}/>
            <ProgressCard date="April 13 2023" changes={[
                "Fixed XScale and YScale do the same thing",
            ]}/>
            <ProgressCard date="April 10 2023" changes={[
                "Fixed bug where some control panel buttons were not working/updating properly",
                "Improved styling for larger devices + fixed dark mode support",
                "Split scale into X-Scale and Y-Scale",
                "Removed Instant Animation"
            ]}/>
            <ProgressCard date="April 8 2023" changes={[
                "Removed check boxes and replaced them with dropdowns",
                "Fixed Area Calculator would sometimes add an extra an extra rectangle",
                "Implemented Trapezoid rule"
            ]}/>
            <ProgressCard date="April 6 2023" changes={[
                "Simplify graph logic, and make more modular",
            ]}/>
            <ProgressCard date="March 21 2023" changes={[
                "Improved styling & small device support",
            ]}/>
            <ProgressCard date="March 19 2023" changes={[
                "Added ability to calculate area under curves with LRAM, RRAM, MRAM",
                "Improved styling in fixed some input bugs"
            ]}/>
            <ProgressCard date="March 18 2023" changes={[
                "No longer manually parsing the equation (because that's very stupid) and I am now using the Math.js javascript library",
                "Greatly improved the grapher by adding animation option, adding the ability to change the graph scale, improving the graph resolution, adding grid lines, and more",
                "Added some styling",
                "Added progress tracker (this)"
            ]}/>
            <ProgressCard date="March 17 2023" changes={[
                "Started math project :)",
                "Created custom equation parser, and basic equation grapher",
                "Created tool to sub an x value into a parsed equation and return an output (y-value)",
                "Using a HTML Canvas to display a basic graph (plotted a bunch of points and drew lines connecting them)"
            ]}/>

            <br/>
        </motion.div>
    );
};

export default MathProjectPage;


