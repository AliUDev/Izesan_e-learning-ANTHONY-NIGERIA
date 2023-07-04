import React from 'react';
import styled from 'styled-components';
import bkg from '../../../assets/splashassets/bkg.png';
import cloud_3 from '../../../assets/splashassets/cloud_3.png';
const Achivements = () => {
    return (
        <AchivementsCloud>
            <img className='cloud' src={cloud_3} width="100%" />
            <div className='achivements_row'>
                <div className='row m-0 text-center'>
                    <div className='col-4'>
                        <h1 className='text-warning achievmentH1'>295+</h1>
                        <div className='text-success achievmentDiv  fw-bold'>Happy Kids</div>
                    </div>
                    <div className='col-4'>
                        <h1 className='text-warning achievmentH1'>30+</h1>
                        <div className='text-success achievmentDiv fw-bold'>Activities</div>
                    </div>
                    <div className='col-4'>
                        <h1 className='text-warning achievmentH1'>60+</h1>
                        <div className='text-success achievmentDiv fw-bold'>Teachers</div>
                    </div>
                </div>
            </div>
        </AchivementsCloud>
    )
}

export default Achivements

const AchivementsCloud = styled.div`
@media (max-width:800px) {
    background-image: url${(bkg)};
background-position: center;
background-repeat: no-repeat;
background-size: cover;
    
}
.achievmentH1{
    font-size: 1.5rem;
}
.achievmentDiv{
    font-size: 1rem;
}
    .cloud{
        margin-top: -40px;
        height: 100%;
    }
    .achivements_row{
        margin-top: -16%;
        z-index: 1;
    }
    @media (min-width: 950px) {
        .achievmentH1{
    font-size: 2.5rem;
}
.achievmentDiv{
    font-size: 1.2rem;
}
    }
    @media (max-width: 750px){
        .achivements_row{
        margin-top: -17%;
        padding: 0 40px;

        }
        
    }
    @media (min-width: 400px) and (max-width: 415px){
.achivements_row {
    margin-top: -23%;
    padding: 0 10px;
}
    }
    @media (min-width: 393px) and (max-width: 399px){
.achivements_row {
    margin-top: -21%;
    padding: 0 20px;
}
    }
    @media (min-width: 416px) and (max-width:425px){
        .achivements_row{
            margin-top: -23%;
    padding: 0 30px;

        }
        .cloud{
            height: 20vh;
        }
        
    }
    @media (max-width: 392px){
        .achivements_row{
            margin-top: -29%;
    padding: 0 8px;

        }
        .cloud{
            height: 20vh;
        }
        
    }
    @media (max-width: 330px){
        .achivements_row{
            margin-top: -30%;
    padding: 0 10px;

        }
        .cloud{
            height: 20vh;
        }
        
    }
    @media (min-width:910px) and (max-width: 913px){
        margin: 0;
        .cloud{
            margin-top: -30px;    }
    }
    @media (max-width: 290px){
        .achivements_row{
            margin-top: -38%;
        padding: 0 40px;

        }
        .cloud{
            height: 18vh;
        }
        
    }
`