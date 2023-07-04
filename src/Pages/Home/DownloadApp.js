import { Col, Container, Row } from 'react-bootstrap';
import appleLogo from '../../assets/images/apple_store_logo.png';
import googleLogo from '../../assets/images/google_play_store_logo.png';
import screensImage from '../../assets/images/screens.png';
import './downloadApp.css';

export default function DownloadApp() {
  return (
    <>
      <Container fluid className="dmain">
        <Row className="dlayout h-lg-100 h-xl-75 downloadrow">
          <Col>
            <img className="screens" src={screensImage} />
          </Col>
          <Col>
            <div>
              <div className="details">
                <div className="downloadapp">Download the app</div>
                <p className="content">
                  “Izesan! Speak Esan!”. <br />
                  <br /> In the first couple kingdoms of “Izesan! Speak Esan!” the prompts are all
                  in English, so all you need to do is select the correct Esan translation.
                  <br />
                  <br /> As you progress through each Esan kingdom, you will receive an achievement
                  badge to celebrate your progress! At the same time, the English translations will
                  start to disappear and you will have to rely solely on the images/illustrations
                  and your knowledge from the previous lessons.
                  <br />
                  <br />
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  gap: '35px'
                }}>
                <div>
                  <img className="appleLogo" src={appleLogo} />
                </div>

                <div>
                  <img className="googleLogo" src={googleLogo} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
