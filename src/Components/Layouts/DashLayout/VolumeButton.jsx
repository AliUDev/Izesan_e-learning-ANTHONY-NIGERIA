import React, { useState } from 'react';

const VolumeButton = (prop) => {
    const [mute, setmute] = useState(false);

    const volume = (val) => {
        window.localStorage.setItem("Volume", val)
        var audio = new Audio('/assets/sounds/volumeup.wav')
        val ?
            audio.play() :
            null;

    }

    return (

        <div style={{ fontSize: "26px", paddingRight: "14px" }} >
            {
                mute ? (
                    <i className="bi bi-volume-mute text-danger cursor-pointer" onClick={() => setmute(!mute) + volume(mute)} ><span className='fs-5 ' style={{ fontFamily: "unset" }} >{prop.title?.length > 1 && mute === true ? "Off" : ""}</span></i>
                ) : (
                    <i className="bi bi-volume-up text-primary cursor-pointer" onClick={() => setmute(!mute) + volume(mute)} ><span className=' fs-5 ' style={{ fontFamily: "unset" }} >{prop.title?.length > 1 && mute === false ? "On" : ""}</span></i>
                )
            }
        </div>
    )
}

export default VolumeButton