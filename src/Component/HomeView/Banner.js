import React from "react";

import "./banner.css";
import BannerImage from "../../Assets/Images/Banner2.png";
import Screens from "../../Assets/Images/screens@2x.png";
import GoogleBtn from "../../Assets/Images/google_btn.png";
import AppStoreBtn from "../../Assets/Images/apple_btn.png";
import { Container, Row, Col } from "react-bootstrap";
export default function Banner() {
  return (
    // <>
    //   <div className="container-fluid banner-main">
    //     <p className="btitle">Izesan! Speak Esan!</p>
    //     <div
    //       className="bannerlayout"
    //       style={{ backgroundImage: `url(${BannerImage})` }}
    //     >
    //       {/* <img src={BannerImage} className='img-fluid' height='auto' /> */}
    //       <div className="BannerGroup">
    //         <div className="BannerImages">
    //           <img className="btnAppstore" src={AppStoreBtn} />
    //           <img className="btnGoogle" src={GoogleBtn} />
    //         </div>
    //         <div className="BannerText">
    //           <h1 className="BannerLearn">Learn Something New </h1>
    //           <h2 className="BannerEveryday">Everyday Anywhere Anytime</h2>
    //           <p className="BannerParagraph">
    //             It is a long established fact that a reader will be distracted
    //             by the there{" "}
    //           </p>
    //           <p className="BannerParagraph margin">
    //             are many cats and dog tuitorial series.
    //           </p>
    //           <button className="BannerTrialBtn">Start 7 Days Trail</button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <Container fluid>
      <p className="btitle">Izesan! Speak Esan!</p>
      <div
        style={{
          backgroundImage: `url(${BannerImage})`,
          height: "80%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
          borderRadius: "16px"
        }}>
        <Row>
          <Col className="col-3 mx-5 mt-3 mt-md-5">
            <div className="LeftImg d-flex flex-column mt-0">
              <img src={Screens} className="screen" />
            </div>
            <div className="d-flex flex-row mt-2 mt-md-4 appDiv">
              <img src={AppStoreBtn} height="70%" className="mx-3 appStore" />
              <img src={GoogleBtn} height="70%" className="googleStore" />
            </div>
          </Col>
          <Col className="mt-3 mt-xl-5 ColumnSecond">
            <div className="BannerText mt-0 mt-md-5">
              <h1 className="BannerLearn">Learn Something New </h1>
              <h2 className="BannerEveryday">Everyday Anywhere Anytime</h2>
              <p className="BannerParagraph">
                It is a long established fact that a reader will be distracted
                by the there are many cats and dog tuitorial series.
              </p>
              <button className="BannerTrialBtn">Start 7 Days Trail</button>
            </div>
            {/* <h1>Learn Something New </h1>
              <h2>Everyday Anywhere Anytime</h2>
              <p>
                It is a long established fact that a reader will be distracted
                by the there{" "}<br />
                are many cats and dog tuitorial series.
              </p>
              <button>Start 7 Days Trail</button> */}
          </Col>
        </Row>
        {/* <Row >
            <img src={BannerImage} style={{ maxWidth: "100%", objectFit: "cover " }} />
          </Row>*/}
      </div>
    </Container>
  );
}
