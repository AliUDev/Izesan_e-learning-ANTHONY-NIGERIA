import { useState } from 'react';
import styled from 'styled-components';
import MessageIcon from '../../../../assets/images/tutorial_message_icon.png';
import Background from '../../../../assets/images/tutor_video_background.png';
import Thumbnail from '../../../../assets/images/video_tutorial_thumbnail.png';

import Heading from '../../../../Components/Common/Heading';

function VideoTutorial() {
  // const name = 'Paul Walker';
  const [selected, setSelected] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const [subtitle] = useState([
    {
      section: 0,
      content: 'I let it fall, my heart'
    },
    {
      section: 1,
      content: 'And as it fell, you rose to claim it'
    },
    {
      section: 2,
      content: 'It was dark and I was over'
    },
    {
      section: '2a',
      content: 'Until you kissed my lips and you saved me'
    },
    {
      section: 3,
      content: 'My hands, they were strong But my knees were far too weak'
    },
    {
      section: 4,
      content: 'To stand in your arms Without falling to your feet'
    },
    {
      section: 5,
      content: "But there's a side to you That I never knew, never knew"
    },
    {
      section: 6,
      content: "All the things you'd say They were never true, never true"
    }
  ]);

  const handleSelectLine = (section) => {
    setSelected(section);
  };
  return (
    <StyledBVideoTutorial>
      <div className="header-section">
        <Heading title="Become a Tutor" />
      </div>
      <StyledContent>
        <div className="section1">
          <div className="my-title font-poppins">Set Fire</div>
          <div>
            <img src={MessageIcon} alt="msg" />
          </div>
        </div>
        <div className="section2">
          <img src={Thumbnail} alt="video" />
        </div>
        <div className="section3">
          {subtitle?.map((sub) => {
            return (
              <StyledP
                key={sub.section}
                current={currentSection === sub.section}
                selected={selected === sub.section}
                onMouseEnter={() => {
                  setCurrentSection(sub.section);
                }}
                onClick={() => handleSelectLine(sub.section)}>
                {sub.content}
              </StyledP>
            );
          })}
          <div className="overlay"></div>
        </div>
      </StyledContent>
      {/* {selected > 0 && (
        <StyledCommentPanel>
          {console.log({ selected })}
          <div className="comment-row w-100 d-flex justify-content-between">
            <div className="d-flex">
              <div>
                <img src={UserComment} alt="img" />
              </div>
              <div className="ms-2 ms-md-4">
                <div className="d-flex">
                  <div className="d-flex flex-column">
                    <span className="username font-roboto">{name}</span>
                    <span className="comment">Awesome lines</span>
                  </div>
                  <div className="ms-4 ms-md-5 d-flex align-items-end">
                    <img src={ThumpsUp} alt="like" />
                    <span className="d-flex mx-1 mx-md-3 font-roboto like-count">1.1k</span>
                    <img src={ThumpsDown} alt="unlike" />
                  </div>
                </div>
              </div>
            </div>

            <div className="cursor-pointer" onClick={() => setSelected(false)}>
              <img src={YellowCross} />
            </div>
          </div>

          <div className="d-flex mt-3">
            <div className="place"></div>
            <div className="input-container">
              <input className="comment-input" placeholder="Write..." />
              <div className="sendBtn">
                <img src={YellowSend} />
              </div>
            </div>
          </div>
        </StyledCommentPanel>
      )} */}
    </StyledBVideoTutorial>
  );
}

export default VideoTutorial;
const StyledBVideoTutorial = styled.div`
  .header-section {
    padding: 2rem 1rem 1rem;
    display: flex;
    justify-content: space-between;

    @media (min-width: 768px) {
      padding: 1.5rem 1.5rem 0.6rem 1.5rem;
    }
    @media (min-width: 992px) {
      padding: 3rem 3rem 0.6rem 3rem;
    }
  }
`;

const StyledContent = styled.div`
  margin: 0 0.3rem;

  background-image: url(${Background});
  border-radius: 25px;
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  .section1 {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }
  .section1 .my-title {
    font-size: 28px;
    font-weight: bolder;
    text-align: center;
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
  }
  .section2 {
    margin-top: 2rem;
    img {
      width: 100%;
    }
  }

  .section3 {
    text-align: center;
    font: normal normal normal 19px/26px Segoe UI;
    letter-spacing: 0px;
    color: #707070;
    max-width: 300px;
    min-width: 280px;
    margin-top: 4rem;
    position: relative;
    .overlay {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 200px;
      background: linear-gradient(0deg, #ffffff, transparent);
    }
  }

  @media (min-width: 768px) {
    margin: 0 1.5rem 1.5rem 1.5rem;
  }
`;
const StyledP = styled.p`
  color: ${(props) => (props.selected ? '#F19C00' : props.current ? '#F19C00' : '#707070')};
  margin-bottom: 0.1rem;
  cursor: pointer;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 18px;
  position: relative;
  background-color: ${(props) => (props.selected ? '#f19c0050' : 'transparent')};

  padding: 0 4px;
  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: ${(props) => (props.selected ? '#F19C00' : '#707070')};
    opacity: ${(props) => (props.selected ? 1 : 0)};
    transition: opacity 0.3s ease-in-out;
  }
  ::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 4px;
    height: 100%;
    background-color: ${(props) => (props.selected ? '#F19C00' : '#707070')};
    opacity: ${(props) => (props.selected ? 1 : 0)};
    transition: opacity 0.3s ease-in-out;
  }
`;

// const StyledCommentPanel = styled.div`
//   background-color: white;
//   padding: 0.8rem;
//   border-radius: 15px;
//   margin: 1rem 0.3rem 2rem;
//   display: flex;
//   flex-direction: column;
//   box-shadow: 0px 3px 6px #00000029;
//   width: 100%;
//   .comment-row {
//     .username {
//       font-weight: bold;
//     }
//     .comment {
//       margin-top: 0.5rem;
//       color: #8f8f8f;
//       font-size: 14px;
//     }
//     .like-count {
//       font-size: 14px;
//     }
//   }
//   .input-container {
//     position: relative;
//     flex: 1;
//     .comment-input {
//       border: 1px solid #b8b8b8;
//       border-radius: 6px;
//       outline: 0;
//       font-size: 14px;
//       padding: 0.5rem;
//       width: 100%;
//     }
//     .sendBtn {
//       position: absolute;
//       top: 6px;
//       right: 12px;
//     }
//   }
//   @media (min-width: 768px) {
//     width: 80%;
//     margin: 1rem auto 2rem;

//     .place {
//       width: 100%;
//     }
//   }
// `;
