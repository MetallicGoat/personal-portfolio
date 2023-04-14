import React, {useEffect, useState} from 'react';
import {NextPage} from "next";
import Graph from "@/components/Graph";
import {ProgressCard} from "@/components/tabs/ProgressCard";
import {CalculateMethod, GraphInfo, IssueType} from "@/components/utils/GraphInfo";

const MathProjectPage: NextPage = () => {
    const [equationType, setEquationType] = useState('Function');
    const [version, setVersion] = useState<number>(0);
    const [graphInfo, setGraphInfo] = useState<GraphInfo | null>(null);

    useEffect(() => {
        const initialGraphInfo = new GraphInfo(
            "abs(x) * sin(x)",
            10,
            10,
            500,
            CalculateMethod.DISABLED,
            -7,
            2,
            15,
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
        if (graphInfo.getIssue() == IssueType.NoIssue)
            setVersion((prev) => prev + 1);
    };

    const titleClassNames = "text-xs dark:text-white";

    return (
        <div className="w-full">
            <h1 className="text-2xl mb-4 font-bold text-center dark:text-white">Calculus ToolBox</h1>
            <div className="flex flex-col items-center lg:items-start lg:flex-row lg:justify-around">
                <div className="px-5 xs:px-10 md:px-0 w-full sm:w-5/6 md:w-1/2 xl:w-2/5">
                    <Graph
                        graphInfo={graphInfo}
                        version={version}
                    />
                </div>

                <div className="p-4 md:p-0">
                    <h1 className="text-xl text-center font-bold dark:text-white">Options</h1>

                    <div className="flex flex-col sm:flex-row">
                        <div className="bg-gray-200 p-3 m-3 rounded-xl dark:bg-gray-700">

                            <h1 className={titleClassNames}>Scale</h1>
                            <div className="w-full mb-2">
                                <select
                                    value={equationType}
                                    onChange={(e) => {
                                        setEquationType(e.target.value);
                                    }}
                                    className="border border-gray-400 p-1 w-full"
                                >
                                    <option value="Function">Any Function</option>
                                    <option value="Quad">Quadratic (more features)</option>
                                </select>
                            </div>

                            <h1 className={titleClassNames}>Equation</h1>
                            {equationType == "Function" && (
                                <input
                                    className="border border-gray-400 p-2 mb-2 w-full"
                                    type="text"
                                    placeholder="Enter equation (e.g. x^2)"
                                    value={graphInfo.function}
                                    onChange={(event) => graphInfo.setAnyFunction(event.target.value)}
                                />
                            )}

                            {equationType == "Quad" && (
                                <div className="flex">
                                    <input
                                        className="border border-gray-400 p-2 mb-2 w-full"
                                        type="number"
                                        placeholder="a"
                                        value={graphInfo.scaleX}
                                        onChange={(event) => graphInfo.scaleX = parseFloat(event.target.value)}
                                    />
                                    <input
                                        className="border border-gray-400 p-2 mb-2 w-full"
                                        type="number"
                                        placeholder="b"
                                        value={graphInfo.scaleX}
                                        onChange={(event) => graphInfo.scaleX = parseFloat(event.target.value)}
                                    />
                                    <input
                                        className="border border-gray-400 p-2 mb-2 w-full"
                                        type="number"
                                        placeholder="c"
                                        value={graphInfo.scaleX}
                                        onChange={(event) => graphInfo.scaleX = parseFloat(event.target.value)}
                                    />
                                </div>
                            )}

                            <h1 className={titleClassNames}>Scale X</h1>
                            <input
                                className="border border-gray-400 p-2 mb-2 w-full"
                                type="number"
                                placeholder="Enter scale"
                                value={graphInfo.scaleX}
                                onChange={(event) => graphInfo.setScaleX(parseFloat(event.target.value))}
                            />

                            <h1 className={titleClassNames}>Scale Y</h1>
                            <input
                                className="border border-gray-400 p-2 mb-2 w-full"
                                type="number"
                                placeholder="Enter scale"
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

                        <div className="bg-gray-200 p-3 m-3 rounded-xl dark:bg-gray-700">
                            <h1 className={titleClassNames}>Calculate Method</h1>
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
                                placeholder="Start"
                                value={graphInfo.startX}
                                onChange={(event) => graphInfo.setStartX(parseFloat(event.target.value))}
                            />

                            <h1 className={titleClassNames}>End X</h1>
                            <input
                                className="border border-gray-400 p-2 mb-2 w-full"
                                type="number"
                                placeholder="End"
                                value={graphInfo.endX}
                                onChange={(event) => graphInfo.setEndX(parseFloat(event.target.value))}
                            />

                            <h1 className={titleClassNames}># of Rectangles</h1>
                            <input
                                className="border border-gray-400 p-2 mb-2 w-full"
                                type="number"
                                placeholder="# of rectangles"
                                value={graphInfo.stepAmount}
                                onChange={(event) => graphInfo.setStepAmount(parseFloat(event.target.value))}
                            />
                        </div>

                        {/*TODO {issue != IssueType.NoIssue && (*/}
                        {/*    <div className="text-red-600 mb-3">FAILED TO GRAPH: {issue}!</div>*/}
                        {/*)}*/}

                    </div>

                    <button className="flex mx-auto bg-blue-500 text-white text-lg px-4 py-2 rounded m-2"
                            onClick={handleGraph}>
                        Graph
                    </button>
                </div>
            </div>

            <br/>

            <ProgressCard date="Known Issues" changes={[
                "The Grapher does not handle steep asymptotes well. This is because the grapher plots a bunch of points an then draws a line to each point afterward, but if the points are far apart (like a steep asymptote), it may fail. A good example of this is tan(x) with a scale of 10 at a fast animation speed",
                "Some equations with holes or that are not continuous can cause errors.",
                "Using capital letters in your equations will break it. For example using Tan(x) will break the site, but tan(x) will work without issues",
            ]}/>

            <br/>
            <br/>

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
        </div>
    );
};

export default MathProjectPage;


