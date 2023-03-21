import React, {useState} from 'react';
import {NextPage} from "next";
import Graph from "@/components/Graph";
import {ProgressCard} from "@/components/tabs/ProgressCard";
import {evaluate} from "mathjs";

export enum IssueType {
    NoIssue = "No Issue",
    MissingEquation = "Missing Equation",
    InvalidEquation = "Invalid Equation",
    ScaleToSmall = "Scale must be greater than 0"
}

const MathProjectPage: NextPage = () => {
    const [equation, setEquation] = useState<string>('abs(x) * sin(x)');
    const [scale, setScale] = useState<number>(10);
    const [version, setVersion] = useState<number>(0);
    const [animate, setAnimate] = useState<boolean>(true);
    const [animationSpeed, setAnimationSpeed] = useState<number>(400);
    const [issue, setIssue] = useState<IssueType>(IssueType.NoIssue);

    const [findArea, setFindArea] = useState(false);
    const [method, setMethod] = useState('MRAM');
    const [startX, setStartX] = useState(-7);
    const [endX, setEndX] = useState(2);
    const [stepAmount, setStepAmount] = useState(15);

    const handleGraph = () => {
        // Test the Equation

        console.log(parseQuadraticFunction("4x^2 + 5x + 3"))

        if (equation.length > 0) {
            try {
                evaluate(equation, {x: 1});
                setIssue(IssueType.NoIssue)
            } catch (e) {
                setIssue(IssueType.InvalidEquation)
            }
        } else {
            setIssue(IssueType.MissingEquation)
        }

        if (scale <= 0)
            setIssue(IssueType.ScaleToSmall)

        // Set and update
        if (issue == IssueType.NoIssue)
            setVersion((prev) => prev + 1);
    };

    const handleToggleAnimation = () => {
        setAnimate((prev) => !prev);
    };


    return (
        <div className="pt-2 w-full min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl mb-4 font-bold p-3">Calculus ToolBox</h1>
            <div className="w-full flex justify-around items-center">
                <div>
                    <Graph
                        equation={equation}
                        scale={scale * 2}
                        version={version}
                        animate={animate}
                        speed={animationSpeed}
                        findArea={findArea}
                        method={method}
                        startX={startX}
                        endX={endX}
                        stepAmount={stepAmount}
                    />
                </div>

                <div className="p-4 text-center">
                    <h1 className="text-2xl pb-2">Options</h1>
                    <div className="flex flex-col items-center">
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

                        <div className="flex items-center">
                            <label htmlFor="findArea" className="mr-2 mb-2">Calculate Area:</label>
                            <input type="checkbox" id="findArea" checked={findArea}
                                   onChange={() => {
                                       setFindArea(!findArea);
                                       handleGraph();
                                   }}
                            />
                        </div>

                        {findArea && (
                            <div className="flex flex-col items-center">
                                <div className="w-full mb-2">
                                    <select
                                        value={method}
                                        onChange={(e) => {
                                            setMethod(e.target.value);
                                            handleGraph();
                                        }}
                                        className="border border-gray-400 p-1 w-full"
                                    >
                                        <option value="RRAM">RRAM</option>
                                        <option value="LRAM">LRAM</option>
                                        <option value="MRAM">MRAM</option>
                                        <option value="Trapezoid">Trapezoid Rule</option>
                                    </select>
                                </div>

                                <input
                                    className="border border-gray-400 p-2 mb-2"
                                    type="number"
                                    placeholder="Start"
                                    value={startX}
                                    onChange={(event) => setStartX(parseFloat(event.target.value))}
                                />

                                <input
                                    className="border border-gray-400 p-2 mb-2"
                                    type="number"
                                    placeholder="End"
                                    value={endX}
                                    onChange={(event) => setEndX(parseFloat(event.target.value))}
                                />

                                <input
                                    className="border border-gray-400 p-2 mb-2"
                                    type="number"
                                    placeholder="# of rectangles"
                                    value={stepAmount}
                                    onChange={(event) => setStepAmount(parseFloat(event.target.value))}
                                />
                            </div>
                        )}

                        <div className="flex items-center">
                            <label htmlFor="animateToggle" className="mr-2 mb-2">Animate:</label>
                            <input type="checkbox" id="animateToggle" checked={animate}
                                   onChange={() => {
                                       handleToggleAnimation();
                                       handleGraph();
                                   }}
                            />
                        </div>

                        {animate && (
                            <div className="flex items-center space-x-4 mb-2">
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

                        {issue != IssueType.NoIssue && (
                            <div className="text-red-600 mb-3">FAILED TO GRAPH: {issue}!</div>
                        )}

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

function parseQuadraticFunction(funcStr: string): { a: number; b: number; c: number } | null {
    const regex = /^([+-]?\d*(\.\d+)?x\^2)?\s*([+-]?\s*\d*(\.\d+)?x)?\s*([+-]?\s*\d+(\.\d+)?)?$/;
    const match = funcStr.replace(/\s+/g, '').match(regex);

    if (!match) {
        return null;
    }

    const [, aTerm, , bTerm, , cTerm] = match;

    const parseTerm = (term: string, degree: number): number => {
        if (!term) return 0;
        const coefficient = term.replace(/x(\^2)?/, '');
        return parseFloat(coefficient || (degree === 2 ? '1' : '-1'));
    };

    const a = parseTerm(aTerm, 2);
    const b = parseTerm(bTerm, 1);
    const c = parseFloat(cTerm || '0');

    return { a, b, c };
}



