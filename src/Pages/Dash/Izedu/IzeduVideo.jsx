import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
import { Lrc } from 'react-lrc';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import GreyPic from '../../../assets/images/gray_pic.png';
import { api, img, lyricsSrt } from '../../../url';
import Loader from '../../Loader/Loader';
import './Izedu.css';
const IzeduVideo = () => {
  const params = useParams();
  const [data, setdata] = useState({});
  const [lyricsData, setlyricsData] = useState('');
  const [annotation, setannotation] = useState([]);
  const [playing, setPlaying] = useState(true);
  const navigate = useNavigate();
  const getData = () => {
    const video_url = localStorage.getItem('api_for_current_video');
    axios
      .get(video_url ? video_url : `${api}lyrics/list`)
      .then((res) => {
        const filteredData = res?.data.data.data.filter((data) => data.id === Number(params.key));
        setdata(filteredData);
        getLyrics(filteredData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAnnotation = () => {
    const id = Number(params.key);
    axios
      .post(`${api}annotation/list`, {
        lyric_id: id
      })
      .then((res) => {
        setannotation(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLyrics = (key) => {
    axios
      .get(`${lyricsSrt + key[0].srt_file}`, {
        'Access-Control-Allow-Origin': '*'
      })
      .then((res) => {
        const formattedText = res.data.replace(/$/gm, '\n');
        setlyricsData(formattedText);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
    getAnnotation();
  }, []);

  const [currentTimeOfProgress, setcurrentTimeOfProgress] = useState(0);
  function handleProgress(progress) {
    const currentTime = progress.playedSeconds * 1000;
    setcurrentTimeOfProgress(currentTime);
  }

  const divRef = useRef(null);
  const [show, setShow] = useState(false);
  const [commentSectionState, setcommentSectionState] = useState([]);
  const [handleComment, sethandleComment] = useState('');
  const [lineToComment, setlineToComment] = useState({});
  const [editform, seteditform] = useState(false);
  const [handleEditComment, sethandleEditComment] = useState('');

  const handleClick = (line) => {
    setPlaying(false);
    setShow(true);
    setlineToComment(line);

    const filteredData = annotation?.filter((item) => {
      return item.lyrics.toLowerCase().includes(line.content.toLowerCase());
    });
    setcommentSectionState(filteredData);
  };

  const handleCommentSubmit = () => {
    const id_lrc = Number(params.key);
    const email_id = localStorage.getItem('email_id');
    axios
      .post(`${api}annotation/add`, {
        lyric_id: id_lrc,
        lyrics: lineToComment.content,
        annotation: handleComment,
        annotator_email: email_id
      })
      .then((res) => {
        sethandleComment('');
        getAnnotation();
        handleClick(lineToComment);
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeAnnotation = (id) => {
    axios
      .post(`${api}annotation/remove`, {
        id: id
      })
      .then((res) => {
        getAnnotation();
        handleClick(lineToComment);
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editAnnotation = (id) => {
    axios
      .post(`${api}annotation/edit`, {
        id: id,
        annotation: handleEditComment
      })
      .then((res) => {
        getAnnotation();
        handleClick(lineToComment);
        seteditform(false);
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const annotationLikeDislike = (id, state) => {
    console.log(id, state);
    const emaiId = localStorage.getItem('email_id');
    axios
      .post(`${api}annotation/like`, {
        annotation_id: id,
        email_id: emaiId,
        is_liked: state
      })
      .then((res) => {
        getAnnotation();
        handleClick(lineToComment);
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [commentBadgeState, setcommentBadgeState] = useState([]);
  const handleCommentBadge = (line) => {
    const filteredData = annotation?.filter((item) => {
      return item.lyrics.toLowerCase().includes(line.content.toLowerCase());
    });
    setcommentBadgeState(filteredData);
  };

  const [activationMargin, setactivationMargin] = useState({});
  console.log(activationMargin);
  return (
    <div>
      {data[0]?.song_link ? (
        <div className="p-4 rounded">
          <div className="row">
            <div className="col-3">
              <ArrowLeftShort
                className="fs-1 m-2 text-warning"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(-1)}
              />
            </div>
          </div>
          <ReactPlayer
            className="rounded izedu_video "
            width="100%"
            onProgress={handleProgress}
            playing={playing && true}
            controls={true}
            url={data[0]?.song_link}
          />

          <div style={{ position: 'relative' }}>
            <Lrc
              autoScroll={true}
              topBlank={false}
              bottomBlank={true}
              className="text-center position-absolute w-100 lyrics_styling"
              lrc={lyricsData}
              currentMillisecond={currentTimeOfProgress}
              style={{
                height: 'calc(100vh - 400px)',
                padding: '-20px 20px',
                overflowY: 'scroll',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, 1%)'
              }}
              lineRenderer={({ index, active, line }) => (
                <>
                  <div
                    ref={divRef}
                    onClick={() => handleClick(line)}
                    onMouseEnter={() => handleCommentBadge(line)}
                    onMouseLeave={() => setcommentBadgeState([])}
                    style={{
                      fontSize: active
                        ? `${window.innerWidth > 500 ? '20px' : '18px'}`
                        : `${window.innerWidth > 500 ? '18px' : '16px'}`,
                      color: active ? 'orange' : '#333',
                      marginTop: '-2px',
                      fontWeight: active ? 500 : 300,
                      lineHeight: '38px',
                      transitionDuration: '400ms',
                      overflow: active ? '' : 'auto',
                      position: active ? 'relative' : '',
                      top: active ? 0 : ''
                    }}
                    className="hover_styling_css ">
                    <span className="flex">
                      {commentBadgeState?.slice(0, 4).map((data, key) => (
                        <span>
                          {data.lyrics == line.content ? (
                            <span>
                              <span style={{ position: 'block', float: 'left', marginLeft: '4px' }}>
                                <i
                                  className="bi bi-chat-left-text"
                                  style={{ position: 'absolute', float: 'left' }}></i>
                              </span>
                              <img
                                style={{
                                  width: '29px',
                                  height: '29px',
                                  borderRadius: '50px',
                                  marginLeft: '-15px'
                                }}
                                src={data.annotator?.dp ? `${img}${data.annotator?.dp}` : GreyPic}
                              />
                            </span>
                          ) : (
                            <></>
                          )}
                        </span>
                      ))}
                    </span>
                    {line.content}
                  </div>
                </>
              )}
            />
          </div>
        </div>
      ) : (
        <Loader />
      )}

      <Modal show={show}>
        <Modal.Header closeButton onClick={() => setShow(false)}>
          <Modal.Title>Add Annotation</Modal.Title>
        </Modal.Header>
        {commentSectionState?.map((data, key) => (
          <div className="row p-3" key={key}>
            <div className="col-3 ">
              <i className=""></i>
              <img
                src={data.annotator?.dp ? img + data.annotator?.dp : GreyPic}
                style={{
                  width: `${window.innerWidth > 500 ? '80px' : '60px'}`,
                  height: `${window.innerWidth > 500 ? '80px' : '60px'}`,
                  borderRadius: '50px'
                }}
              />
            </div>
            <div className="col-9">
              <p className="fw-bold">{data?.annotator.name}</p>
              <p>{data?.annotation}</p>
              <div>
                <i
                  className={`bi bi-hand-thumbs-up-fill mx-2 cursor-pointer ${data.likes.some((item) => item.email_id === localStorage.getItem('email_id'))
                    ? 'text-warning'
                    : ''
                    } `}
                  onClick={() => annotationLikeDislike(data.id, 1)}>
                  {' '}
                  {data.likes_count}{' '}
                </i>
                <i
                  className={`bi bi-hand-thumbs-down-fill mx-2 cursor-pointer ${data.dislikes.some((item) => item.email_id === localStorage.getItem('email_id'))
                    ? 'text-danger'
                    : ''
                    }  `}
                  onClick={() => annotationLikeDislike(data.id, 0)}>
                  {' '}
                  {data.dislikes_count}
                </i>
                {data.annotator.email_id === localStorage.getItem('email_id') && (
                  <>
                    <i
                      className="bi bi-trash text-danger mx-2 cursor-pointer"
                      onClick={() => removeAnnotation(data.id)}></i>
                    <i
                      className="bi bi-pencil text-success mx-2 cursor-pointer"
                      onClick={() => seteditform(true)}></i>
                  </>
                )}
              </div>
            </div>
            {editform && (
              <div style={{ zIndex: '1' }}>
                <Modal show={editform}>
                  <Modal.Header closeButton onClick={() => seteditform(false)}>
                    <Modal.Title>Edit Comment</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <input
                      className="form-control"
                      value={handleEditComment}
                      onChange={(e) => sethandleEditComment(e.target.value)}
                    />
                    <Modal.Footer>
                      <button className="btn btn-success" onClick={() => editAnnotation(data.id)}>
                        Edit
                      </button>
                    </Modal.Footer>
                  </Modal.Body>
                </Modal>
              </div>
            )}
          </div>
        ))}

        <Modal.Footer>
          <input
            className="form-control"
            value={handleComment}
            onChange={(e) => sethandleComment(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleCommentSubmit}>
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IzeduVideo;
