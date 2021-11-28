import React, {ChangeEvent, MouseEvent, useEffect, useRef, useState} from "react";
import floodFill from "./api/floodfill";

import CanvasControl from "./CanvasControls";
import './App.css';

export enum DrawingTool {
    Eraser,
    Pen,
    Fill,
}

export default function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [mousePosition, setMousePosition] = useState<{ x: number, y: number }>({x: 0, y: 0})
    const [lineWidth, setLineWidth] = useState(25);
    const [color, setColor] = useState('#000000');
    const [drawingColor, setDrawingColor] = useState('#000000');
    const [activeTool, setActiveTool] = useState(DrawingTool.Pen)

    // Setup Canvas
    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            canvas.width = document.body.clientWidth;
            canvas.height = document.body.clientHeight;

            const context = canvasRef.current.getContext('2d')!;

            context.fillStyle = "white";
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
    }, [canvasRef])

    const updateLineWidth = (event: ChangeEvent<HTMLInputElement>) => {
        setLineWidth(parseInt(event.target.value))
    }

    const updateColor = (color: string) => {
        setColor(color);
    }

    const startDrawing = (event: MouseEvent<HTMLCanvasElement>) => {
        const newXPosition = event.nativeEvent.offsetX;
        const newYPosition = event.nativeEvent.offsetY;

        switch (activeTool) {
            case DrawingTool.Eraser:
                setIsDrawing(true);
                setMousePosition({x: newXPosition, y: newYPosition})
                setDrawingColor('#FFFFFF')
                break;
            case DrawingTool.Pen:
                setDrawingColor(color);
                setIsDrawing(true);
                setMousePosition({x: newXPosition, y: newYPosition})
                break;
            case DrawingTool.Fill:
                const canvas = canvasRef.current;
                if (canvas) {
                    const context = canvas.getContext('2d')!;
                    let imageData = context.getImageData(0, 0, canvas.width, canvas.height)
                    imageData = floodFill(imageData, color, newXPosition, newYPosition)
                    context.putImageData(imageData, 0, 0);
                }
                break;

        }
    }

    const stopDrawing = (_event: MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(false);
    }

    const draw = (event: MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !canvasRef.current) {
            return;
        }

        const context = canvasRef.current.getContext('2d')!;
        const newXPosition = event.nativeEvent.offsetX;
        const newYPosition = event.nativeEvent.offsetY;

        context.beginPath();

        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = drawingColor;
        context.fillStyle = drawingColor;
        context.lineWidth = lineWidth;


        context.moveTo(mousePosition.x, mousePosition.y);
        context.lineTo(newXPosition, newYPosition);
        context.stroke()

        context.closePath();

        setMousePosition({x: newXPosition, y: newYPosition})

    }

    const clearCanvas = () => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current

        const context = canvas.getContext('2d')!;

        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    return (
        <div className="root">
            <div id={'sketch'}>
                <canvas id={'canvas'}
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseUp={stopDrawing}
                        onMouseMove={draw}/>
            </div>
            <CanvasControl lineWidth={lineWidth} updateLineWidth={updateLineWidth} color={color}
                           updateColor={updateColor} updateCurrentTool={setActiveTool} clearCanvas={clearCanvas}/>
        </div>
    )
}