import React, {ChangeEvent, MouseEvent, useEffect, useRef, useState} from "react";
import './Sketch.css';
import floodFill from "../../api/floodfill";

const COLORS = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC']


export default function Sketch() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [mousePosition, setMousePosition] = useState<{ x: number, y: number }>({x: 0, y: 0})
    const [lineWidth, setLineWidth] = useState(5);
    const [color, setColor] = useState('#000000');
    const [isFillActive, setIsFillActive] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const context = canvasRef.current.getContext('2d')!;
            context.fillStyle = "white";
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
    }, [canvasRef])

    const updateLineWidth = (event: ChangeEvent<HTMLInputElement>) => {
        setLineWidth(parseInt(event.target.value))
    }

    const updateColor = (event: ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value);
    }

    const startDrawing = (event: MouseEvent<HTMLCanvasElement>) => {
        const newXPosition = event.nativeEvent.offsetX;
        const newYPosition = event.nativeEvent.offsetY;

        if (isFillActive) {
            const canvas = canvasRef.current;
            if (canvas) {
                const context = canvas.getContext('2d')!;
                let imageData = context.getImageData(0, 0, canvas.width, canvas.height)

                imageData = floodFill(imageData, color, newXPosition, newYPosition)

                context.putImageData(imageData, 0, 0);
            }
            return;
        }


        setIsDrawing(true);


        setMousePosition({x: newXPosition, y: newYPosition})
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
        context.strokeStyle = color;
        context.fillStyle = color;
        context.lineWidth = lineWidth;


        context.moveTo(mousePosition.x, mousePosition.y);
        context.lineTo(newXPosition, newYPosition);
        context.stroke()

        context.closePath();

        setMousePosition({x: newXPosition, y: newYPosition})

    }

    const clear = () => {
        if (!canvasRef.current) {
            return;
        }

        const context = canvasRef.current.getContext('2d')!;

        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    return (
        <div className="root">
            <div id={'sketch'}>
                <canvas id={'canvas'}
                        width={600}
                        height={600}
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onMouseMove={draw}/>
            </div>
            <div className={"canvas-setting "}>
                <input type="range" min="5" max="50" onChange={updateLineWidth} value={lineWidth} className="slider"/>
                <div className={'colors-list'}>
                    <input type="color"
                           onChange={updateColor}
                           value={color}/>
                    {COLORS.map(color => <div key={color} className="predefined-color" style={{background: color}}
                                              onClick={() => setColor(color)}/>)}
                </div>
                <button onClick={() => setColor('#ffffff')}>Erase</button>
                <button onClick={clear}>Clear</button>
                <button onClick={() => setIsFillActive(true)}>Fill</button>
                <button onClick={() => setIsFillActive(false)}>Pen</button>
            </div>
        </div>
    )
}