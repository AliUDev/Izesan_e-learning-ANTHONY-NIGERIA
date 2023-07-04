import React from 'react';
import styled from 'styled-components';
import '../../assets/Styles/Styles.css';
import Achivements from './components/Achivements';
import BookingTutor from './components/BookTutor';
import Footer from './components/Footer';
import Header from './components/HeaderAbout';
import HeaderNav from './components/HeaderNav';
import LeaderBoard from './components/LeaderBoard';
import OurPrograms from './components/OurPrograms';
import Section2 from './components/Section2';
function SplashAbout() {
  return (
    <StyleSplashParent>
      <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 'bolder' }}>
        <HeaderNav />
        <Header />
        <Section2 />
        <OurPrograms />
        <Achivements />
        <LeaderBoard />
        <BookingTutor />
        <Footer />
      </div>
    </StyleSplashParent>
  );
}

export default SplashAbout;
const StyleSplashParent = styled.div`
  @font-face {
    font-family: 'HeadingFont';
    src: url('/assets/fonts/Octarine-Bold.otf') format('opentype');
  }
`;
