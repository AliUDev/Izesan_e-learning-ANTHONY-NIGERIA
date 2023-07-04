import React from 'react'
import './SplashLoader.css'

const SplashLoader = () => {
    return (
        <div>
            <div className="loader position-fixed top-50 start-50 translate-middle">
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
            </div>
        </div>
    )
}

export default SplashLoader