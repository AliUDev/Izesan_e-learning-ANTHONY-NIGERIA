import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Lrc } from "react-lrc";
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { api, storage_api } from '../../../url';
import Loader from '../../Loader/Loader';
import LibraryAudio2 from './LibraryAudio2';

const LibraryAudio = () => {

    const params = useParams();
    const [data, setdata] = useState({});
    const [lyricsData, setlyricsData] = useState('');


    const getData = () => {
        const audio_url = localStorage.getItem('api_for_current_library')
        axios.post(audio_url ? audio_url : `${api}lyrics/list`)
            .then((res) => {
                const filteredData = res?.data.data.data.filter(data => data.id === Number(params.id));
                setdata(filteredData);
                getLyrics(filteredData);
            }).catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getData();
    }, [])

    const getLyrics = (key) => {
        axios.get(`${storage_api + key[0]?.lrc_file}`)
            .then((res) => {
                const formattedText = res.data.replace(/$/gm, '\n');
                setlyricsData(formattedText)
            }).catch((err) => {
                console.log(err)
            })
    }


    const audioElement = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);

    function handleTimeUpdate() {
        setCurrentTime(audioElement.current.currentTime * 1000);
    }

    const [activeLineIs, setactiveLineIs] = useState('');
    return (
        <div>
            <LibraryAudioParent>
                {/* <h4 className='p-3 text-decoration-underline fw-bold position-absolute'>{data[0]?.name}</h4> */}
                {
                    data[0]?.book_audio ? (
                        <div className=' rounded'>
                            <Lrc
                                className='text-center'
                                lrc={lyricsData}
                                currentMillisecond={currentTime}
                                style={{ height: "calc(100vh - 200px)", padding: "100px 20px", display: 'none' }}
                                topblank="false"
                                bottomblank="false"
                                lineRenderer={({ index, active, line }) => (
                                    <div
                                        style={{
                                            fontSize: active ? "20px" : "18px",
                                            color: active ? "white" : "#333",
                                            backgroundColor: active ? "orange" : "",
                                            fontWeight: active ? 500 : 300,
                                            lineHeight: "35px",
                                            transitionDuration: '400ms',
                                        }}
                                        className="hover-able"
                                    >
                                        {
                                            active &&

                                            setactiveLineIs(line.content)
                                        }
                                        {line.content}
                                    </div>
                                )}
                            />
                            <LibraryAudio2 id={params.id} activeLine={activeLineIs} />
                            <div className='text-center mt-4 '>
                                <audio
                                    controlsList="nodownload"
                                    className='audio_style rounded'
                                    src={`${storage_api + data[0]?.book_audio}`}
                                    ref={audioElement}
                                    onTimeUpdate={handleTimeUpdate}
                                    controls
                                    autoPlay
                                >

                                </audio>
                            </div>
                        </div>
                    ) : (
                        <Loader />
                    )
                }
            </LibraryAudioParent >
        </div >
    )
}

const LibraryAudioParent = styled.div`
.audio_style{
    width: 75%;
}
@media(max-width:425px){
    .audio_style{
        width: 100%;
} 

}
    padding: 20px;
    text-align: center;
    audio::-webkit-media-controls-panel {
    background-color: orange;
    color:#fff;
    }

    audio::-webkit-media-controls-mute-button {
        -webkit-appearance: media-mute-button;
    }

    .hover-able:hover{
        background-color: rgb(0,0,0,0.1);
        cursor: pointer;
    }
`;


export default LibraryAudio