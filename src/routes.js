import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Fragment } from "react";
import Home from './pages/Home';
import Game from './pages/Game';
import Header from './components/Header';
import Footer from './components/Footer';

function RoutesApp() {
    return (
        <BrowserRouter>
            <Fragment>
                <Header />
                <div className='Body'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/game" element={<Game />} />
                    </Routes>
                </div>
                <Footer />
            </Fragment>
        </BrowserRouter>

    )
}

export default RoutesApp;