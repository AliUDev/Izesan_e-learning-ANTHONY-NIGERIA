import styled from 'styled-components';
import '../../assets/Styles/Styles.css';
import Achivements from './components/Achivements';
import BookingTutor from './components/BookTutor';
import Footer from './components/Footer';
import Header from './components/Header';
import HeaderNav from './components/HeaderNav';
import LeaderBoard from './components/LeaderBoard';
import OurPrograms from './components/OurPrograms';
import Section from './components/Section';
import SideButton from './SideButton/SideButton';


function Splash() {
  return (
    <StyleSplashParent>
      <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: "bolder" }} >
        <SideButton />
        <HeaderNav />
        <Header />
        <Section />
        <OurPrograms />
        <Achivements />
        <LeaderBoard />
        <BookingTutor />
        <Footer />
      </div>
    </StyleSplashParent>
  );
}

export default Splash;

const StyleSplashParent = styled.div`
  @font-face {
  font-family: "HeadingFont";
  src: url("/assets/fonts/Octarine-Bold.otf") format("opentype");
}
`
