import {BrowserRouter, Routes, Route } from 'react-router-dom';
import React from "react";
import Home from './pages/Home';
import Game from './pages/Game';

function RoutesApp(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/game" element={<Game/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;