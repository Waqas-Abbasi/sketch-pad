import React, {ChangeEvent} from "react";
import {DrawingTool} from "./App";
import Draggable from 'react-draggable';
import './CanvasControls.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faEraser, faFillDrip} from '@fortawesome/free-solid-svg-icons'



const COLORS = ['#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#99FF99', '#B34D4D',
    '#80B300', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#33FFCC']


type ControlControlProps = {
    lineWidth: number
    updateLineWidth: (event: ChangeEvent<HTMLInputElement>) => void
    color: string
    updateColor: (color: string) => void
    updateCurrentTool: (tool: DrawingTool) => void
    clearCanvas: () => void
};

export default function CanvasControl(
    {
        lineWidth,
        updateLineWidth,
        color,
        updateColor,
        updateCurrentTool,
        clearCanvas,
    }: ControlControlProps
) {
    return (
        <Draggable bounds="parent" cancel=".cancel">
            <div className={"canvas-setting  no-hover"}>
                <div className={'button-icon'}>
                    <div className="predefined-color no-hover" style={{background: color}}/>
                </div>
                <div className={'button-icon'} onClick={() => updateCurrentTool(DrawingTool.Pen)}>
                    <FontAwesomeIcon icon={faPen}  />
                    <p className={'button-text'}>Pen</p>
                </div>
                <div className={'button-icon no-hover'}>
                    <div className="value">{lineWidth}</div>
                    <input type="range" min="10" max="50" onChange={updateLineWidth} value={lineWidth}
                           className="slider cancel"/>
                </div>
                <div className={'button-icon'} onClick={() => updateCurrentTool(DrawingTool.Eraser)}>
                    <FontAwesomeIcon icon={faEraser}  />
                    <p className={'button-text'}>Eraser</p>
                </div>
                <div className={'button-icon'} onClick={clearCanvas}>
                    <p className={'button-text'}>Clear</p>
                </div>
                <div className={'button-icon'} onClick={() => updateCurrentTool(DrawingTool.Fill)}>
                    <FontAwesomeIcon icon={faFillDrip}  />
                    <p className={'button-text'}>Fill</p>
                </div>
                <div className={'button-icon no-hover'}>
                {COLORS.map(color => <div key={color} className="predefined-color hover-opacity" style={{background: color}}
                                          onClick={() => updateColor(color)}/>)}
                </div>
            </div>
        </Draggable>
    )

}
