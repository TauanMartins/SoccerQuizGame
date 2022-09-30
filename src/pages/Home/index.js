import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function Home(){
    return(
        <Fragment>
            <Header/>
            <Link to="/game">Play</Link>
            <Footer/>
        </Fragment>
    )
}