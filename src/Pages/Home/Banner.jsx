import AppStoreBtn from '../../assets/images/apple_store_logo.png';
import BannerImage from '../../assets/images/banner@2x.png';
import GoogleBtn from '../../assets/images/google_play_store_logo.png';

import styled from 'styled-components';
export default function Banner() {
  return (
    <StyledBanner>
      <p className="btitle d-none d-md-block">Izesan! Speak Esan!</p>
      <div className="banner">
        <img src={BannerImage} className="banner-bg" />
        <div className="banner-apps-btn">
          <div className="d-flex app-div">
            <img src={AppStoreBtn} className="ms-2 ms-sm-3 ms-lg-4 appstore-btn storebtn" />
            <img src={GoogleBtn} className="storebtn" />
          </div>
        </div>
        <h1 className="banner-learn font-poppins">Learn Something New </h1>
        <h2 className="banner-everyday font-poppins">Everyday Anywhere Anytime</h2>
        <p className="banner-paragraph font-rubik">
          It is a long established fact that a reader will be distracted by the there are many cats
          and dog tuitorial series.
        </p>
        <button className="banner-trial_btn font-rubik">Start 7 Days Trail</button>
      </div>
    </StyledBanner>
  );
}

const StyledBanner = styled.div`
  .btitle {
    text-align: left;
    font-size: 26px;
    font-weight: 400;
    color: #2e4765;
  }
  .banner {
    position: relative;
    .banner-bg {
      width: 100%;
      border-radius: '16px';
    }
    .banner-apps-btn {
      position: absolute;
      top: 83%;
      .appstore-btn {
        margin-right: 0%;
      }
      .storebtn {
        width: 10%;
      }
    }
    .banner-text {
      position: absolute;
      top: 2%;
    }
    .banner-learn {
      color: #ffffff;
      position: absolute;
      top: 12%;
      font-size: 15px;
      left: 26%;
      font-weight: 600;
    }
    .banner-everyday {
      position: absolute;
      top: 28%;
      left: 26%;
      font-size: 10px;
      letter-spacing: 0.72px;
      color: #ffbe58;
    }
    .banner-paragraph {
      color: #e4e9ff;
      font-size: 7px;
      position: absolute;
      top: 41%;
      width: 40%;
      left: 26%;
    }
    .banner-trial_btn {
      position: absolute;
      border: 1px solid #ffffff;
      border-radius: 25px;
      opacity: 1;
      background: transparent;
      color: white;
      padding: 2px 12px;
      top: 70%;
      left: 26%;
      font-size: 25%;
    }
  }
  @media (min-width: 520px) {
    .banner {
      .banner-apps-btn {
        .appstore-btn {
          margin-right: 0%;
        }
        .storebtn {
          width: 10%;
        }
      }
      .banner-trial_btn {
        padding: 6px 16px;
      }
      .banner-learn {
        top: 18%;
      }
      .banner-everyday {
        top: 33%;
      }
      .banner-paragraph {
        font-size: 8px;
        top: 45%;
      }
    }
  }
  @media (min-width: 576px) {
    .banner {
      .banner-apps-btn {
        top: 84%;
        .storebtn {
          width: 10%;
        }
      }
      .banner-learn {
        font-size: 22px;
        top: 20%;
      }
      .banner-everyday {
        font-size: 15px;
        top: 35%;
      }
      .banner-paragraph {
        font-size: 8px;
        top: 49%;
      }
      .banner-trial_btn {
        font-size: 8px;
      }
    }
  }
  @media (min-width: 630px) {
    .banner {
      .banner-apps-btn {
        .storebtn {
          width: 10%;
        }
      }
    }
  }
  @media (min-width: 700px) {
    .banner {
      .banner-paragraph {
        width: 31%;
      }
    }
  }
  @media (min-width: 768px) {
    .banner {
      .banner-apps-btn {
        top: 86%;
        .storebtn {
          width: 10%;
        }
      }
      .banner-learn {
        font-size: 27px;
        top: 26%;
      }
      .banner-everyday {
        font-size: 21px;
        top: 39%;
      }
      .banner-paragraph {
        font-size: 10px;
        top: 57%;
        width: 40%;
      }
      .banner-trial_btn {
        top: 75%;
        font-size: 9px;
      }
    }
  }
  @media (min-width: 992px) {
    .banner {
      .banner-apps-btn {
        top: 86%;
        .appstore-btn {
          margin-right: 0%;
        }
        .storebtn {
          width: 10%;
        }
      }
      .banner-learn {
        font-size: 36px;
        top: 26%;
      }
      .banner-everyday {
        font-size: 28px;
        top: 39%;
      }
      .banner-paragraph {
        font-size: 12px;
        top: 57%;
        width: 40%;
      }
      .banner-trial_btn {
        top: 75%;
        font-size: 12px;
      }
    }
  }
  @media (min-width: 1200px) {
    .banner {
      .banner-apps-btn {
        .storebtn {
          width: 10%;
        }
      }
      .banner-learn {
        font-size: 45px;
        top: 24%;
      }
      .banner-everyday {
        font-size: 35px;
        top: 39%;
      }
      .banner-paragraph {
        font-size: 14px;
        top: 57%;
        width: 41%;
      }
      .banner-trial_btn {
        top: 75%;
        font-size: 15px;
      }
    }
  }
  @media (min-width: 1400px) {
    .banner {
      .banner-apps-btn {
        .appstore-btn {
          margin-right: 0%;
        }
        .storebtn {
          width: 10%;
        }
      }
      .banner-learn {
        font-size: 52px;
        top: 24%;
      }
      .banner-everyday {
        font-size: 40px;
        top: 39%;
      }
      .banner-paragraph {
        font-size: 16px;
        top: 57%;
        width: 41%;
      }
      .banner-trial_btn {
        top: 75%;
        font-size: 18px;
      }
    }
  }
`;
