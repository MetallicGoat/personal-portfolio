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
            true,
            500,
            false,
            CalculateMethod.MRAM,
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

    return (
        <div className="pt-2 w-full">
            <h1 className="text-4xl mb-4 font-bold p-3 text-center dark:text-white">Calculus ToolBox</h1>
            <div className="flex flex-col items-center md:items-start md:flex-row md:justify-around">
                <div className="px-5 xs:px-10 md:px-0 w-full sm:w-5/6 md:w-1/2 xl:w-2/5">
                    <Graph
                        graphInfo={graphInfo}
                        version={version}
                    />
                </div>

                <div className="p-4 md:p-0">
                    <h1 className="text-2xl pb-2 text-center dark:text-white">Options</h1>
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

                    <div className="flex flex-col items-center">
                        {equationType == "Function" && (
                            <input
                                className="border border-gray-400 p-2 mb-2"
                                type="text"
                                placeholder="Enter equation (e.g. x^2)"
                                value={graphInfo.function}
                                onChange={(event) => graphInfo.setAnyFunction(event.target.value)}
                            />
                        )}

                        {equationType == "Quad" && (
                            <div className="w-2/5">
                                <input
                                    className="border border-gray-400 p-2 mb-2 w-1/3"
                                    type="number"
                                    placeholder="a"
                                    value={graphInfo.scale}
                                    onChange={(event) => graphInfo.scale = parseFloat(event.target.value)}
                                />
                                <input
                                    className="border border-gray-400 p-2 mb-2 w-1/3"
                                    type="number"
                                    placeholder="b"
                                    value={graphInfo.scale}
                                    onChange={(event) => graphInfo.scale = parseFloat(event.target.value)}
                                />
                                <input
                                    className="border border-gray-400 p-2 mb-2 w-1/3"
                                    type="number"
                                    placeholder="c"
                                    value={graphInfo.scale}
                                    onChange={(event) => graphInfo.scale = parseFloat(event.target.value)}
                                />
                            </div>
                        )}

                        <input
                            className="border border-gray-400 p-2 mb-2"
                            type="number"
                            placeholder="Enter scale"
                            value={graphInfo.scale}
                            onChange={(event) => graphInfo.setScale(parseFloat(event.target.value))}
                        />

                        <div className="flex items-center">
                            <label htmlFor="findArea" className="mr-2 mb-2 dark:text-white">Calculate Area:</label>
                            <input type="checkbox" id="findArea" checked={graphInfo.findArea}
                                   onChange={() => {
                                       graphInfo.setFindArea(!graphInfo.findArea);
                                   }}
                            />
                        </div>

                        {graphInfo.findArea && (
                            <div className="flex flex-col items-center">
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

                                <input
                                    className="border border-gray-400 p-2 mb-2"
                                    type="number"
                                    placeholder="Start"
                                    value={graphInfo.startX}
                                    onChange={(event) => graphInfo.setStartX(parseFloat(event.target.value))}
                                />

                                <input
                                    className="border border-gray-400 p-2 mb-2"
                                    type="number"
                                    placeholder="End"
                                    value={graphInfo.endX}
                                    onChange={(event) => graphInfo.setEndX(parseFloat(event.target.value))}
                                />

                                <input
                                    className="border border-gray-400 p-2 mb-2"
                                    type="number"
                                    placeholder="# of rectangles"
                                    value={graphInfo.stepAmount}
                                    onChange={(event) => graphInfo.setStepAmount(parseFloat(event.target.value))}
                                />
                            </div>
                        )}

                        <div className="flex items-center">
                            <label htmlFor="animateToggle" className="mr-2 mb-2 dark:text-white">Animate:</label>
                            <input type="checkbox" id="animateToggle" checked={graphInfo.animate}
                                   onChange={() => {
                                       graphInfo.setAnimate(!graphInfo.animate);
                                   }}
                            />
                        </div>

                        {graphInfo.animate && (
                            <div className="flex items-center space-x-4 mb-2">
                                <label htmlFor="animationSpeed" className="font-semibold dark:text-white">
                                    Speed:
                                </label>
                                <input
                                    type="range"
                                    id="animationSpeed"
                                    min="50"
                                    max="3000"
                                    step="100"
                                    value={graphInfo.speed}
                                    onChange={(event) => graphInfo.setSpeed(Number(event.target.value))}
                                />
                            </div>
                        )}

                        {/*TODO {issue != IssueType.NoIssue && (*/}
                        {/*    <div className="text-red-600 mb-3">FAILED TO GRAPH: {issue}!</div>*/}
                        {/*)}*/}

                        <button className="bg-blue-500 text-white text-lg px-4 py-2 rounded mb-2" onClick={handleGraph}>
                            Graph
                        </button>
                    </div>
                </div>
            </div>

            <div className="m-10">

                <ProgressCard date="Known Issues" changes={[
                    "The Grapher does not handle steep asymptotes well. This is because the grapher plots a bunch of points an then draws a line to each point afterward, but if the points are far apart (steep asymptote), the graph may start to fall apart. A good example of this is tan(x) with a scale of 50 or more.",
                    "Some equations dont get parsed properly. I dont know why yet, but in some cases the site has thrown errors in console, and failed to graph the equation. Possibly an issue with Math.js",
                    "Trapezoid rule has not yet been implemented."
                ]}/>

                <br/>

                <ProgressCard date="April 8 2023" changes={[
                    "Fixed bug where some control panel buttons were not working/updating properly",
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
            </div>
        </div>
    );
};

export default MathProjectPage;


