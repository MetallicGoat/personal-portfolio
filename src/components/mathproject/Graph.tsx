import React, {useEffect, useRef} from 'react';
import {abs, evaluate, round} from 'mathjs';
import {CalculateMethod, GraphInfo} from "@/components/mathproject/GraphInfo";

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

    ctx.font = "32px Arial";
    const width = canvas.width;
    const height = canvas.height;
    const xScale = width / graphInfo.getScaleX();
    const yScale = height / graphInfo.getScaleY();
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

      ctx.strokeStyle = "rgba(0,72,255,0.75)";
      ctx.lineWidth = 2.5;

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

        const stepSize = (graphInfo.getEndX() - graphInfo.getStartX()) / graphInfo.stepAmount;
        let estimate = 0;
        let estimateTotal = 0;
        let currX = graphInfo.getStartX()

        // 3 steps
        for (let pos = 0; pos < graphInfo.stepAmount; pos++) {
          const startX = currX * xScale

          if (pos % 2 == 0)
            ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
          else
            ctx.fillStyle = "rgba(255, 0, 0, 0.2)";

          let currRectArea = 0

          if (graphInfo.findAreaMethod != CalculateMethod.TRULE) {
            let x = currX; // LRAM as fall back
            let offset = 0

            switch (graphInfo.findAreaMethod) {
              case CalculateMethod.LRAM:
                offset = 0;
                x = currX;
                break;
              case CalculateMethod.RRAM:
                offset = stepSize * xScale;
                x = currX + stepSize;
                break;
              case CalculateMethod.MRAM:
                offset = (stepSize / 2) * xScale
                x = currX + (stepSize / 2);
                break;
            }

            const rectY = evaluate(equation, {x: x});

            currRectArea = (rectY * stepSize);

            // Draw the rectangle with the fill and stroke colors
            ctx.fillRect(xAxis + startX, yAxis, xScale * stepSize, -(yScale * rectY));
            ctx.strokeRect(xAxis + startX, yAxis, xScale * stepSize, -(yScale * rectY));

            ctx.fillStyle = "rgba(255, 0, 0)";
            ctx.fillRect(xAxis + startX + offset - 3, yAxis + -(yScale * rectY) - 3, 6, 6);

          } else {
            const startY = evaluate(equation, {x: currX});
            const endY = evaluate(equation, {x: currX + stepSize});

            currRectArea = ((startY + endY) / 2) * stepSize; // Area of trapezoid

            ctx.beginPath();
            ctx.moveTo(xAxis + startX, yAxis); // Bottom-left point
            ctx.lineTo((xAxis + startX) + (xScale * stepSize), yAxis); // Bottom-right point
            ctx.lineTo((xAxis + startX) + (xScale * stepSize), yAxis - (yScale * endY)); // Top-right point
            ctx.lineTo(xAxis + startX, yAxis - (yScale * startY)); // Top-left point
            ctx.closePath();
            ctx.stroke();
            ctx.fill()

            ctx.fillStyle = "rgba(255, 0, 0)";
            ctx.fillRect(xAxis + startX - 3, yAxis + -(yScale * startY) - 3, 6, 6);

            // Last Marker
            if (pos + 1 == graphInfo.stepAmount)
              ctx.fillRect((xScale * stepSize) + xAxis + startX - 3, yAxis + -(yScale * endY) - 3, 6, 6);
          }

          currRectArea = round(currRectArea * 100000) / 100000

          estimateTotal += abs(currRectArea)
          estimate += currRectArea

          currX += stepSize
        }

        ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.fillText("Integral Approx: " + estimate.toPrecision(8), 10, (yAxis * 2) - 10)
        ctx.fillText("Combined Area: " + estimateTotal.toPrecision(8), 10, (yAxis * 2) - 40)
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