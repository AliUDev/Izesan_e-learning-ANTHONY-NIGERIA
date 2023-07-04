import React from 'react';
import styled from 'styled-components';
import bg from '../../../assets/splashassets/bkg.png';
import bg2 from '../../../assets/splashassets/bkg_2.png';
import booking_tutor from '../../../assets/splashassets/booking_tutor.png';
import cloud from '../../../assets/splashassets/cloud.png';
const BookTutor = () => {
    return (
        <BookTutorParent>
            <img className='background_img' src={bg} width="100%" height="400vh" />
            <img className='background_img2' src={bg2} width="100%" />
            <img className='cloud_img' src={cloud} width="100%" />
            <div className='row bookTutor_body'>
                <div className='col-xl-5 col-lg-6 col-md-5 col-sm-4 col-0'>
                    <img className='w-50 bookingTutor_imgg' src={booking_tutor} />
                </div>
                <div className='col-xl-7 col-lg-6 col-md-7 col-sm-8 col-12 p-5  '>
                    <h1 className='text-success heading_book_tutor' style={{ fontFamily: "HeadingFont " }} >Booking a Tutor</h1>
                    <p className='bookTutorPara'>We understand that learning a language can be quite tasking, and to this effect, we have provided our users access to online tutors who would assist in their learning journey.</p>
                </div>
            </div>
        </BookTutorParent>
    )
}

export default BookTutor

const BookTutorParent = styled.div`

@media (max-width: 321px) {
    .heading_book_tutor{
    font-size: 20px;
}
}

.bookingTutor_imgg{
  animation: shake 1.5s ;
  animation-iteration-count: infinite;
}
@keyframes shake {
  0% { transform: translate(0px, 0px) rotate(0deg); }
  50% { transform: translate(-3px, 6px) rotate(0deg); }
  100% { transform: translate(0px, 0px) rotate(0deg); }
}
margin-top: 72%;
    .background_img ,  .background_img2{
        position: absolute;
        z-index: -1;
        margin-top: -2%;
    }
    .bookTutorPara{
    font-size: 1.5rem;
    /* margin: 8px 0; */
}
@media (max-width:1005px) {
    .bookTutorPara{
    font-size: 1rem;
    /* margin: 8px 0; */
}
/* .bookTutor_body{
        margin: -14% 0 0 0;
        position: absolute;
    } */
}
@media (min-width:916px)and(max-width:1005px) {
.bookTutor_body{
        margin: -18% 0 0 0;
        position: absolute;
    }
}
      .background_img2{
        position: absolute;
        z-index: -1;
        margin-top: -82%;
    }
    .cloud_img{
        position: absolute;
        margin-top: -30%;
    }
    .bookTutor_body{
        margin: -14% 0 0 0;
        position: absolute;
    }

    @media (max-width: 575px) {
    .bookingTutor_imgg {
        display:none
    }
} 

@media (min-width: 768px) {
    .background_img2 {
        display:none
    }
}
@media (max-width: 767px) {
    .bookTutor_body{
        margin: -20% 0 0 0;
        position: absolute;
    }
    .background_img {
        display:none
    }
} 
`