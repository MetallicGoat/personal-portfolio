import React, {useEffect, useRef} from 'react';
import {evaluate} from 'mathjs';

type GraphProps = {
    equation: string;
    scale: number;
    version: number;
    animate: boolean;
    speed: number;
};

const Graph: React.FC<GraphProps> = ({equation, scale, version, animate, speed}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameIdRef = useRef<number | null>(null);
    const stepSize = .01; // Smaller number = better resolution
    const pointsPerFrame = speed; // Speed = how many points get drawn per frame sent

    useEffect(() => {
        if (animationFrameIdRef.current)
            cancelAnimationFrame(animationFrameIdRef.current);

        // Redraw the graph!
        drawGraph(equation);

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
        const xScale = width / scale;
        const yScale = height / scale;
        const yAxis = Math.floor(height / 2);
        const xAxis = Math.floor(width / 2);

        // Clear the Canvas
        ctx.clearRect(0, 0, width, height);

        // Draw the axis
        const drawAxis = () => {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.lineWidth = 1;
            ctx.moveTo(0, yAxis);
            ctx.lineTo(width, yAxis);
            ctx.moveTo(xAxis, 0);
            ctx.lineTo(xAxis, height);
            ctx.stroke();
        }

        // Use this to draw the grid lines
        const drawGridLines = () => {
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.lineWidth = 1;

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
                    const currentX = x + i * stepSize;
                    const yValue = evaluate(equation, {x: currentX / xScale});
                    const canvasX = currentX + xAxis;
                    const canvasY = yAxis - yValue * yScale;

                    if (canvasY >= 0 && canvasY <= height) {
                        if (i === 0) {
                            ctx.moveTo(currentX - stepSize + xAxis, yAxis - evaluate(equation, {x: (currentX - stepSize) / xScale}) * yScale);
                        }
                        ctx.lineTo(canvasX, canvasY);
                    }
                }

                ctx.stroke();

                if (x + pointsPerFrame * stepSize < xAxis) {
                    animationFrameIdRef.current = requestAnimationFrame(() => drawAnimatedLine(x + stepSize * pointsPerFrame));
                } else {
                    animationFrameIdRef.current = null;
                }
            };

            // This function graphs the line instantly
            const drawInstantGraph = () => {
                ctx.beginPath();

                for (let x = -xAxis; x <= xAxis; x += stepSize) {
                    const yValue = evaluate(equation, {x: x / xScale});
                    const canvasX = x + xAxis;
                    const canvasY = yAxis - yValue * yScale;

                    if (canvasY >= 0 && canvasY <= height) {
                        ctx.lineTo(canvasX, canvasY);
                    }
                }

                ctx.stroke();
            };

            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 2;

            if (animate) {
                let startX = -xAxis;
                while (startX < xAxis) {
                    const yValue = evaluate(equation, {x: startX / xScale});
                    const canvasY = yAxis - yValue * yScale;
                    if (canvasY >= 0 && canvasY <= height) {
                        break;
                    }
                    startX += stepSize;
                }
                drawAnimatedLine(startX);
            } else {
                drawInstantGraph();
            }
        };

        // RESULT STUFF
        drawAxis()
        drawGridLines();
        drawGraph()
    };


    return (
        <div>
            <canvas ref={canvasRef} width="500" height="500" className="border border-black"></canvas>
        </div>
    );
};

export default Graph;