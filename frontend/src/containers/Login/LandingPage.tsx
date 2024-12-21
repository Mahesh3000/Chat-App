// import React from 'react'
import { Link } from 'react-router-dom'
import BackgroundImage from '../../assets/bg.png'

const LandingPage = () => {
    return (
        <header style={HeaderStyle}>
            <h1 className="main-title text-center">Welcome to ChatVerse</h1>
            <p className="main-para text-center">Connect with friends and the world instantly</p>
            <div className="buttons text-center">
                <Link to="/login">
                    <button className="primary-button">log in</button>
                </Link>
                <Link to="/signup">
                    <button className="primary-button" id="reg_btn"><span>Get Started</span></button>
                </Link>
            </div>
        </header>
    )
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}

export default LandingPage;