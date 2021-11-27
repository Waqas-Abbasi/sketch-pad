import React, {useState} from 'react';
import './App.css';
import {Link} from "react-router-dom";


// TODO: Don't let start game if no name is provided
export default function App() {
    const [name, setName] = useState('')
    const [playersActive, setPlayersActive] = useState(0)

    return (
        <div className="root">
            <div>
                <label>Name: </label>
                <input type={'text'} placeholder={"name"} value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <Link to={`/game/${name}`}>Start Game</Link>
            <p>Testing Note: You can open new tabs to play as another player, if no one else is available</p>
            <p>Players Active: {playersActive}</p>
        </div>
    );
}

