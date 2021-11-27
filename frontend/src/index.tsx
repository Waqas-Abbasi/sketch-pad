import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App';
import Game from './routes/Game';
import {BrowserRouter, Route, Routes} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/game/:name" element={<Game/>}/>
                <Route path="*" element={<App/>}/>
            </Routes>
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
);
