import React from 'react'
import imgError from '../assets/error404.jpg';
import { Link } from 'react-router-dom';
const Error404Page = () => {
    return (
        <div className="centered">
        <img className="imgError" src={imgError} alt=""/>
        <button style={{marginTop:"2vh"}}><Link to="/">Home</Link></button>
        </div>
    )
}

export default Error404Page