import Sketch from "../components/sketch/Sketch";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

export default function Game(){
    // TODO: Validate params
    let params = useParams();

    useEffect(() => {
        // Search or create a new game

        // Wait for the game to be populated
    }, [])
    return (
        <>
        <h1>{params.name}</h1>
        <Sketch />
        </>
    )
}