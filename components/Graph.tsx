import React, {useEffect, useRef} from 'react';
import {abs, evaluate} from 'mathjs';
import {CalculateMethod, GraphInfo} from "@/components/utils/GraphInfo";

type GraphProps = {
    graphInfo: GraphInfo;
    version: number;
};

const Graph: React.FC<GraphProps> = ({graphInfo, version}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameIdRef = useRef<number | null>(null);
    const pointDistance = .01; // Smaller number = better resolution
    const pointsPerFrame = graphInfo.speed; // Speed = how many points get drawn per frame sent

    useEffect(() => {
        if (animationFrameIdRef.current)
            cancelAnimationFrame(animationFrameIdRef.current);

        // Redraw the graph!
        drawGraph(graphInfo.function);

        // Suppress this because we only want it to update on this one event
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [version]);

    const drawGraph = (equation: string) => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;
        const xScale = width / graphInfo.getScale();
        const yScale = height / graphInfo.getScale();
        const yAxis = Math.floor(height / 2);
        const xAxis = Math.floor(width / 2);

        // Clear the Canvas
        ctx.clearRect(0, 0, width, height);

        // Draw the axis
        const drawAxis = () => {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.lineWidth = 2;
            ctx.moveTo(0, yAxis);
            ctx.lineTo(width, yAxis);
            ctx.moveTo(xAxis, 0);
            ctx.lineTo(xAxis, height);
            ctx.stroke();
        }

        // Use this to draw the grid lines
        const drawGridLines = () => {
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.lineWidth = 2;

            // Draw vertical gridlines
            for (let x = xAxis % xScale; x < width; x += xScale) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }

            // Draw horizontal gridlines
            for (let y = yAxis % yScale; y < height; y += yScale) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }
        };

        // This function draws the line
        const drawGraph = () => {
            // This function draws the graph the fancy way
            const drawAnimatedLine = (x: number) => {
                if (animationFrameIdRef.current) {
                    cancelAnimationFrame(animationFrameIdRef.current);
                }

                ctx.beginPath();

                for (let i = 0; i < pointsPerFrame; i++) {
                    const currentX = x + i * pointDistance;
                    const yValue = evaluate(equation, {x: currentX / xScale});
                    const canvasX = currentX + xAxis;
                    const canvasY = yAxis - yValue * yScale;

                    if (canvasY >= 0 && canvasY <= height) {
                        if (i === 0) {
                            ctx.moveTo(currentX - pointDistance + xAxis, yAxis - evaluate(equation, {x: (currentX - pointDistance) / xScale}) * yScale);
                        }
                        ctx.lineTo(canvasX, canvasY);
                    }
                }

                ctx.stroke();

                if (x + pointsPerFrame * pointDistance < xAxis) {
                    animationFrameIdRef.current = requestAnimationFrame(() => {
                        drawAnimatedLine(x + pointDistance * pointsPerFrame)
                    });
                } else {
                    animationFrameIdRef.current = null;
                }
            };

            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 3;

            let startX = -xAxis;
            while (startX < xAxis) {
                const yValue = evaluate(equation, {x: startX / xScale});
                const canvasY = yAxis - yValue * yScale;
                if (canvasY >= 0 && canvasY <= height) {
                    break;
                }
                startX += pointDistance;
            }
            drawAnimatedLine(startX);
        };


        const findAreaEstimate = () => {
            if (graphInfo.findAreaMethod != CalculateMethod.DISABLED) {
                ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
                ctx.strokeStyle = "rgb(255, 0, 0)";
                ctx.lineWidth = .2;

                const stepSize = (graphInfo.endX - graphInfo.startX) / graphInfo.stepAmount;
                let estimate = 0;
                let currX = graphInfo.startX

                // 3 steps
                for (let pos = 0; pos < graphInfo.stepAmount; pos++) {
                    if (abs(xScale * currX) > xAxis)
                        break;

                    if (pos % 2 == 0)
                        ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
                    else
                        ctx.fillStyle = "rgba(255, 0, 0, 0.2)";

                    if (graphInfo.findAreaMethod != CalculateMethod.TRULE) {
                        let x = currX; // LRAM as fall back

                        switch (graphInfo.findAreaMethod) {
                            case CalculateMethod.LRAM:
                                x = currX;
                                break;
                            case CalculateMethod.RRAM:
                                x = currX + stepSize;
                                break;
                            case CalculateMethod.MRAM:
                                x = currX + (stepSize / 2);
                                break;
                        }

                        const rectY = evaluate(equation, {x: x});

                        estimate += (rectY * stepSize);

                        // Draw the rectangle with the fill and stroke colors
                        ctx.fillRect(xAxis + (xScale * currX), yAxis, xScale * stepSize, -(yScale * rectY));
                        ctx.strokeRect(xAxis + (xScale * currX), yAxis, xScale * stepSize, -(yScale * rectY));
                    } else {
                        const startY = evaluate(equation, {x: currX});
                        const endY = evaluate(equation, {x: currX + stepSize});

                        ctx.beginPath();
                        // TODO optimize
                        ctx.moveTo(xAxis + (xScale * currX), yAxis); // Bottom-left point
                        ctx.lineTo((xAxis + (xScale * currX)) + (xScale * stepSize), yAxis); // Bottom-right point
                        ctx.lineTo((xAxis + (xScale * currX)) + (xScale * stepSize), yAxis - (yScale * endY)); // Top-right point
                        ctx.lineTo(xAxis + (xScale * currX), yAxis - (yScale * startY)); // Top-left point
                        ctx.closePath();
                        ctx.stroke();
                        ctx.fill()
                    }

                    currX += stepSize
                }
            }
        }

        // Draw :)
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(0, 0, width, height)

        drawAxis();
        drawGridLines();
        findAreaEstimate();
        drawGraph();
    };


    return (
        <div className="w-full">
            <canvas ref={canvasRef} width={1000} height={1000}
                    className="border border-black shadow-xl w-full h-auto"></canvas>
        </div>
    );
};

export default Graph;