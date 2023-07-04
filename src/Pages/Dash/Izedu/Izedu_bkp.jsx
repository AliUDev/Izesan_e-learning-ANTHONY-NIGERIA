// import { CommentOutlined } from '@mui/icons-material';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Lrc } from "react-lrc";
// import ReactPlayer from 'react-player';
// import { useParams } from 'react-router-dom';
// import { api, lyricsSrt } from '../../../url';
// import Loader from '../../Loader/Loader';



// const IzeduVideo = () => {
//     const params = useParams();
//     const [data, setdata] = useState({});
//     const [lyricsData, setlyricsData] = useState('');
//     const [annotation, setannotation] = useState([]);
//     console.log(annotation);
//     const [playing, setPlaying] = useState(true)


//     const getData = () => {
//         const video_url = localStorage.getItem('api_for_current_video')
//         axios.get(video_url ? video_url : `${api}lyrics/list`)
//             .then((res) => {
//                 const filteredData = res?.data.data.data.filter(data => data.id === Number(params.key));
//                 setdata(filteredData);
//                 getLyrics(filteredData);
//             }).catch((err) => {
//                 console.log(err)
//             })
//     }
//     const getAnnotation = () => {
//         const id = Number(params.key)
//         axios.post(`${api}annotation/list`, {
//             lyric_id: id
//         })
//             .then((res) => {
//                 setannotation(res.data.data);
//             }).catch((err) => {
//                 console.log(err)
//             })
//     }

//     const getLyrics = (key) => {
//         axios.get(`${lyricsSrt + key[0].srt_file}`)
//             .then((res) => {
//                 const formattedText = res.data.replace(/$/gm, '\n');
//                 setlyricsData(formattedText)
//             }).catch((err) => {
//                 console.log(err)
//             })
//     }
//     useEffect(() => {
//         getData();
//         getAnnotation();
//     }, [])

//     const [currentTimeOfProgress, setcurrentTimeOfProgress] = useState(0);
//     function handleProgress(progress) {
//         const currentTime = progress.playedSeconds * 1000;
//         setcurrentTimeOfProgress(currentTime)
//     }

//     return (
//         <div>
//             {
//                 data[0]?.song_link ? (
//                     <div className='p-4 rounded'>
//                         <ReactPlayer
//                             className='rounded'
//                             width="100%"
//                             height="400px"
//                             onProgress={handleProgress}
//                             playing={playing && true}
//                             controls={true}
//                             url={data[0]?.song_link} />
//                         <div style={{ position: "relative" }}>

//                             <Lrc
//                                 className='text-center position-absolute w-100'
//                                 lrc={lyricsData}
//                                 currentMillisecond={currentTimeOfProgress}
//                                 style={{ height: "calc(100vh - 350px)", padding: "8px 30px", overflow: "scroll", top: "50%", left: "50%", transform: "translate(-50%, -0%)" }}
//                                 autoScroll={false}
//                                 topBlank={false}
//                                 bottomBlank={false}
//                                 lineRenderer={({ index, active, line }) => (
//                                     <>
//                                         <span className='cursor-pointer' style={{ float: "left" }} onClick={() => setPlaying(!playing)} >
//                                             {active && <CommentOutlined />}
//                                         </span>
//                                         <div
//                                             style={{
//                                                 fontSize: active ? "20px" : "18px",
//                                                 color: active ? "orange" : "#333",
//                                                 // backgroundColor: active ? "orange" : "",
//                                                 fontWeight: active ? 500 : 300,
//                                                 lineHeight: "33px",
//                                                 transitionDuration: '400ms',
//                                             }}
//                                         >
//                                             {line.content}
//                                         </div>
//                                     </>
//                                 )}
//                             />
//                         </div>
//                     </div>
//                 ) : (
//                     <Loader />
//                 )
//             }


//         </div>
//     )
// }

// export default IzeduVideo