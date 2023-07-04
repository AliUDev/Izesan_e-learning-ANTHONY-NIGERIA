import React from 'react';
import styled from 'styled-components';
import bg from '../../../assets/splashassets/bkg.png';
import bg2 from '../../../assets/splashassets/bkg_2.png';
import cloud from '../../../assets/splashassets/cloud.png';
import leader_board from '../../../assets/splashassets/leader_board.png';
const LeaderBoard = () => {
    return (
        <LeaderBoardParent>
            <img className='background_img' src={bg} width="100%" />
            <img className='background_img2' src={bg2} width="100%" />
            <img className='cloud_img' src={cloud} width="100%" />
            <div className='row leaderboard_body'>
                <div className='col-xl-7 col-lg-6 col-md-7 col-sm-8 col-12 p-5'>
                    <h1 className='text-success' style={{ fontFamily: "HeadingFont " }} >LeaderBoard</h1>
                    <p className='leaderBoardPara'>Learning is fun with friends. See how you match up with your friends on the leaderboard.</p>
                </div>
                <div className='col-xl-5 col-lg-6 col-md-5 col-sm-4 col-0'>
                    <img className='w-100 leaderBoard_imgg' src={leader_board} />
                </div>
            </div>
        </LeaderBoardParent>
    )
}

export default LeaderBoard

const LeaderBoardParent = styled.div`
.leaderBoard_imgg{
  animation: shake 1.5s ;
  animation-iteration-count: infinite;
}
@keyframes shake {
  0% { transform: translate(0px, 0px) rotate(0deg); }
  50% { transform: translate(-3px, 6px) rotate(0deg); }
  100% { transform: translate(0px, 0px) rotate(0deg); }
}
    .background_img {
        position: absolute;
        z-index: -1;
        margin-top: -2%;
    }
      .background_img2{
        position: absolute;
        z-index: -1;
        margin-top: -82%;
    }
    .cloud_img{
        position: absolute;
        margin-top: 50px;
    }
    .leaderboard_body{
        margin: 22% 0 0 0;
        position: absolute;
    }
@media (min-width: 768px) {
    .background_img2 {
        display:none
    }
  
}
.leaderBoardPara{
    font-size: 1.6rem;
    /* margin: 8px 0; */
}
@media ( max-width:1005px) {
    .leaderBoardPara{
    font-size: 1rem;
    /* margin: 8px 0; */
}
}
@media (max-width: 767px) {
    .cloud_img{
        position: absolute;
        margin-top: 15px;
    }
    .leaderboard_body{
        margin: 5% 0 0 0;
        position: absolute;
    }
    .background_img2{
        display: none;
    }
    .background_img {
        display:none
    }
} 
@media (max-width: 575px) {
    .leaderBoard_imgg {
        display:none
    }
    .cloud_img{
        position: absolute;
        margin-top: -40px;
    }
} 
@media (max-width: 320px) {
    .cloud_img{
        position: absolute;
        margin-top: -40px;
    }
    .leaderboard_body{
        margin: -5% 0 0 0;
    position: absolute;
    }
}
`