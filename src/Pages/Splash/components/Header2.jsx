import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import banner2 from '../../../assets/splashassets/bkg_2.png';
import cloud from '../../../assets/splashassets/cloud_2.png';
import banner from '../../../assets/splashassets/gif/bkg.png';
import gif1 from '../../../assets/splashassets/gif/gif.gif';
import gif2 from '../../../assets/splashassets/gif/gif2.gif';
import Logo2 from '../../../assets/splashassets/izesanSchoolLogo.png';
import Logo from '../../../assets/splashassets/logo.png';
import Menu from '../../../assets/splashassets/menu@2x.png';

const Header2 = () => {
    const navigate = useNavigate();
    return (
        <HeaderParent>
            <img className='bg_img2' src={banner2} width="100%" />
            <img className='bg_img' src={banner} width="100%" style={{ opacity: "0.4" }} />
            <div className='row m-0 text-light header_body_contentParent'>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 headerTextContainer1' style={{ position: "relative" }}>
                    <img onClick={() => navigate('/login')} className="logo_styling" src={Logo} alt="..." width="25%" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "2" }} />
                    <img className='bg__1' src={gif1} alt="..." width="80%" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 headerTextContainer2' style={{ position: "relative" }}>
                    <img onClick={() => navigate('/')} className="logo_styling" src={Logo2} alt="..." width="25%" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "2" }} />
                    <img className='bg__2' src={gif2} alt="..." width="80%" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
                </div>
                {/* <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 fadeElment d-flex align-items-center justify-content-center'>
                    <div data-aos="fade-left">
                        <img className='w-100' src={pic1} />
                    </div>
                </div> */}
            </div>
            <div className='m-auto'>
                <img className='cloud_img' src={cloud} />
                <div className='w-100 m-auto' >
                    <img className='menu_img' src={Menu} />
                    <div className='row menu_items text-center px-2 text-light'>
                        <div className='col-lg-3 col-md-3 col-sm-6 col-6 menu_item '>Find a Teacher</div>
                        <div className='col-lg-3 col-md-3 col-sm-6 col-6 menu_item '>Community</div>
                        <div className='col-lg-3 col-md-3 col-sm-6 col-6 menu_item '>Become Teacher</div>
                        <div className='col-lg-3 col-md-3 col-sm-6 col-6 menu_item '>Contact us</div>
                    </div>
                </div>
            </div>

        </HeaderParent >
    )
}

export default Header2

const HeaderParent = styled.div`

.logo_styling:hover{
    /* transform: scale(1.04);  */
    width: 21.5%;
    transition-duration: 100ms;
    cursor: pointer;
}
.menu_item {
    font-weight: bolder;
    text-shadow: #fff 5px;
    font-size: 1.2rem;
}
.fadeElment{
    overflow-x: hidden;
}
.bg_img,  .bg_img2{
    z-index: -1;
    position: absolute;
    opacity: 5;
}
.aboutBtn{
    width: 60%;
}
.header_body_contentParent{
    padding: 10px;
    height: 590px;

}
.cloud_img{
    width: 100%;
    margin-top: -50px;
}

.iconWrapper{
    margin: 6px 0;
}
.icon{
    cursor: pointer;
    margin: 0 1px;
    width: 30%;
}
.menu_img{
    margin-top: -40%;
    width: 100%;
}
.menu_items{
    margin: -22.4% 0 0 0;
    width: 100%;
}
.menu_items div:hover{
    transform: scale(1.1);
    cursor: pointer;
    transition-duration: 200ms;
}
@media(max-width:991px){
    .header_body_contentParent{
    height: 400px;
}
}
@media(max-width:760px){
    .bg_img2{
        height: 300%;
    }
}
@media(max-width:767px){
    .headerTextContainer1{
        position: absolute;
        top: 10%;

        /* margin-top: 300px;  */
    }
    .headerTextContainer2{
        position: absolute;
        top: 5%;

    }
    .header_body_contentParent{
    padding: 30px;
    height: 1200px;
}
.bg__1{
    background-color: #33ff0022;
    border-radius: 10px;
}
.bg__2{
    background-color: #ffa60055;
    border-radius: 10px;

}
}
@media (min-width: 768px) {
    .bg_img1 {
        display:none;
  }
 
}
@media( min-width: 769px) and (max-width: 1050px) {
    .menu_items {
        margin: -23% 0 0 0;

  }
}
@media (max-width: 768px) {
    .cloud_img{
    width: 100%;
    margin-top: -45px;
}

    .menu_item{
        padding: 8px 0;
    }
    .bg_img {
        display:none
    }
    .menu_img{
      height: 150px;
    margin-top: -15% !important;
     margin-bottom: 20px;
    }
    .menu_items {
        margin: -17% 0 0 0;
  }
    /* .menu_items {
        margin: -40% 0 0 0;
  } */
    
}
@media (max-width: 700px) {
    .menu_items {
        margin: -22% 0 0 0;
  }
  .headerTextContainer1{
        position: absolute;
        top: 2%;
         /* margin-top: 300px;  */
    }
    .headerTextContainer2{
        position: absolute;
        top: -7%;
    }
    .header_body_contentParent{
    padding: 30px;
    height: 1100px;
}
    
}
@media (max-width: 612px) {
    .menu_items {
        margin: -25% 0 0 0;
  }
  .menu_items {
        margin: -22% 0 0 0;
  }
  .headerTextContainer1{
        position: absolute;
        top: 9%;
        /* margin-top: 300px;  */
    }
    .headerTextContainer2{
        position: absolute;
        top: 0%;
    }
    .header_body_contentParent{
    padding: 0px;
    height: 1150px;
}
    
}
@media (max-width: 500px) {
    .menu_items {
        margin: -30% 0 0 0;
  }
    
}
/* @media (min-width: 430px) and(max-width: 770px) {
    .menu_items {
        margin: -10.5% 0 0 0;
  }
} */
@media (max-width: 460px) {
    .menu_items {
        margin: -23% 0 0 0;
  }
  .headerTextContainer1{
        position: absolute;
        top: 9%;
         /* margin-top: 300px;  */
    }
    .headerTextContainer2{
        position: absolute;
        top: -5%;
    }
    .header_body_contentParent{
    padding: 0px;
    height: 900px;
}
    
}
@media (max-width: 460px) {
    .menu_items {
        margin: -36% 0 0 0;
  }
    
}
@media (max-width: 390px) {
    .menu_items {
        margin: -40% 0 0 0;
  }
  .headerTextContainer1{
        position: absolute;
        top: 6%;
        /* margin-top: 300px;  */
    }
    .headerTextContainer2{
        position: absolute;
        top: -10%;
    }
    .header_body_contentParent{
    padding: 0px;
    height: 800px;
}
    
}

@media (max-width: 360px) {
    .menu_items {
        margin: -45% 0 0 0;
  }
}
@media (max-width: 330px) {
    .menu_items {
        margin: -50% 0 0 0;
  }
}
@media (max-width: 321px) {
    .menu_items {
        margin: -47% 0 0 0;
  }
    
}
@media (max-width: 290px) {
    .menu_items {
        margin: -58% 0 0 0;
  }
  .menu_item{
        padding: 4px 0;
    }  
}
@media (max-width: 881px) {
    .menu_item {
    font-weight: bolder;
    text-shadow: #fff 5px;
    font-size: 1rem;
}
}
`