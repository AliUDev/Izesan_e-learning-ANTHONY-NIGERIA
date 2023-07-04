import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import monophyGif from '../../../assets/splashassets/gif/monophy.gif';
import gif from '../../../assets/splashassets/gif/tortriesgif.gif';
import IzesanSchoolLogo from '../../../assets/splashassets/izesanSchoolLogo.png';
const SideButton = () => {
  const [show, setShow] = useState(false);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  return (
    <StyledSideMenu show={show} style={{ width: `${width < 769 ? "90%" : '40%'}`, left: `${show ? "0%" : `${width < 769 ? "-90%" : "-40%"}`}` }}>
      <button className='position-absolute top-0 end-0 bg-transparent border-0 text-light p-2' onClick={() => setShow(false)}><CloseIcon /></button>
      <h5 className=" text-center position-absolute top-50 start-50 translate-middle">
        <img src={monophyGif} width="100%" />
        Izesan For School Coming Soon!
      </h5>
      <div className="position-absolute top-50 end-0 translate-middle-y">
        {
          !show && width > 768 &&
          <img className='gif_transition' src={gif} height="130px" width="100px" />
        }
        {
          !show && <button
            id="neonShadow"
            className="btn btn-light p-0"
            style={{ marginRight: "-80px", height: `${width < 769 ? "200px" : ''}` }}
            onMouseEnter={() => setShow(!show)}
          >
            {
              width > 768 ? (
                <img src={IzesanSchoolLogo} alt=".." width="80px" height="80px" />

              ) : (
                <>
                  {show ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
                </>
              )
            }

          </button>
        }
      </div>
    </StyledSideMenu>
  );
};

const StyledSideMenu = styled.div`
  position: fixed;
  padding: 29px 15px;
  top: 50%;
  transform: translate(-0%, -50%);
  background-color: #000000e2;
  /* width: 40%; */
  border-radius: 0 10px 10px 0 ;
  height: 60%;
  color: white;
  bottom: 50%;
  z-index: 4;
  /* left: ${({ show }) => (show ? "0%" : "-40%")}; */
  transition: left 500ms ease-in-out;



  #neonShadow{

  border:none;
  transition:0.3s;
  animation: glow 1s infinite ;
  transition:0.5s;
}
span{
    display: block;
    width: 100%;
    height: 100%;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 700;
    padding-top: 15%;
    padding-right: 2.5%;
    margin-right: 0px;
    font-size: 1.2rem;
    transition: 0.3s;
    opacity: 0;
    }
span:hover{
    transition: 0.3s;
    opacity: 1;
    font-weight: 700;
    }

#neonShadow:hover{
  /* transform:translateX(-20px)rotate(30deg); */
  border-radius: 0 5px 5px 0 ;
  background-color:#ffffffdc;
}

.gif_transition{
  transition:10s;
  animation: thegif 7s infinite ;
  margin: 0 -90px 210px 0;
}

@keyframes thegif {
  0%{
  /* margin: 0 -150px 210px 0; */
  opacity: 0;
  margin: 0 -0px 210px 0;

}
  50%{
  /* margin: 0 -100px 210px 0; */
  opacity: 1;
  margin: 0 -100px 210px 0;


  }
  100%{
  /* margin: 0 -150px 210px 0; */
  opacity: 0;
  margin: 0 -0px 210px 0;
  }
}


@keyframes glow{
  0%{
  background-color: #53aa01a2;
  border: 1px solid #00000014;

}
  
  50%{
    background-color: #53aa01;
  border: 1px solid #00000063;

  }
  100%{
    background-color: #53aa01a2;
  border: 1px solid #00000014;


  }
}






`;

export default SideButton;
