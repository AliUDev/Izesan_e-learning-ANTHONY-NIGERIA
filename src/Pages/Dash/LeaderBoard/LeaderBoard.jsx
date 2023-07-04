import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Heading from '../../../Components/Common/Heading';
import LeaderCard from './LeaderCard';
// import Jonny from '../../../assets/images/jonny.jpeg';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';
import Select from '../../../Components/Common/Select';
import { api, img } from '../../../url';
import LeaderBar from './LeaderBar';
function LeaderBoard() {
  const [data, setData] = useState(false);
  const [isLoader, setisLoader] = useState(true);
  const [selectedOption, setSelectedOption] = useState('highest_kobo_earned');
  function getData() {
    axios
      .post(`${api}leaderboard/get`, {})
      .then((res) => {
        if (res.data.status == 'Success') {
          setisLoader(false);
          console.log(res.data.data[selectedOption]);
          setData(res.data.data[selectedOption]);

          setTimeout(() => {
            setcongrats(true)
          }, 3000)
          setTimeout(() => {
            setcongrats(false)
          }, 8000)

        } else {
          setisLoader(false);
        }
      })
      .catch((err) => {
        setisLoader(false);
        getData();
        console.log(err);
      });
  }
  function hanleDropdownChange(value) {
    setSelectedOption(value);
  }
  function getValue(itemVal) {
    if (itemVal) {
      if (selectedOption == 'longest_days_streak_maintained') {
        if (itemVal.longest_streak) {
          return 'Streak' + itemVal.longest_streak + 'days';
        } else {
          return '';
        }
      } else if (selectedOption == 'longest_time_spending_day') {
        if (itemVal.usage_time) {
          if (itemVal.usage_time >= 1000000000) {
            return 'Time Spent:' + (itemVal.usage_time / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B mins';
          } else if (itemVal.usage_time >= 1000000) {
            return 'Time Spent:' + (itemVal.longest_streak / 1000000).toFixed(1).replace(/\.0$/, '') + 'M mins';
          } else if (itemVal.usage_time >= 1000) {
            return 'Time Spent:' + (itemVal.usage_time / 1000).toFixed(1).replace(/\.0$/, '') + 'K mins';
          } else {
            return 'Time Spent:' + itemVal.usage_time + 'mins';
          }
        } else {
          return '';
        }
      } else if (selectedOption == 'highest_kobo_earned') {
        if (itemVal.total_koobo) {
          return 'kọbọ:' + itemVal.total_koobo;
        } else {
          return '';
        }
      } else if (selectedOption == 'highest_streaks') {
        if (itemVal.total_streaks) {
          return itemVal.total_streaks + ' streaks';
        } else {
          return '';
        }
      }
    }
  }
  const [congrats, setcongrats] = useState(false);
  const navigateBack = useNavigate();

  useEffect(() => {
    getData();
  }, [selectedOption]);

  return (
    <StyledLeaderBoard className='m-2'>
      <div className='row w-100'>
        <div className='col-1'>
          <ArrowLeftShort className="fs-1 m-1 text-warning" style={{ cursor: "pointer" }} onClick={() => navigateBack(-1)} />
        </div>
        <div className='col-10'>
          <Heading title="Streakboard" className='text-center m-1 text-decoration-underline fw-bold' />
        </div>
      </div>
      {
        congrats ? (
          <Alert className='position-fixed top-0 end-0 m-3' style={{ zIndex: 4 }} severity="success">
            <AlertTitle>Achivements</AlertTitle>
            We encourage <b>{data[0]?.name}!</b> for his/her Great Achivement!
          </Alert>
        ) : (
          <></>
        )
      }

      <StyledLeaderBoardCardSection>

        {data && data.length > 0 ? (
          <>
            {data[0] && (
              // <div className='col-lg-4 col-md-4 col-sm-12'>
              <div className="container__column second text-capitalize">
                <LeaderCard
                  imgSrc={`${img}${data[1].dp}`}
                  name={data[1].name}
                  position="second"
                  value={getValue(data[1])}
                />
              </div>
            )}
            {data[1] && (
              // <div className='col-lg-4 col-md-4 col-sm-12'>
              <div className=" container__column first">
                <LeaderCard
                  imgSrc={`${img}${data[0].dp}`}
                  name={data[0].name}
                  position="first"
                  value={getValue(data[0])}
                />
              </div>
            )}
            {data[2] && (
              // <div className='col-lg-4 col-md-4 col-sm-12'>
              <div className="  container__column third">
                <LeaderCard
                  imgSrc={`${img}${data[2].dp}`}
                  name={data[2].name}
                  position="third"
                  value={getValue(data[2])}
                />
              </div>
              // </div>
            )}
          </>
        ) : (
          <div>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )
        }

      </StyledLeaderBoardCardSection>
      <div className="d-flex align-items-center justify-content-center">
        <Select hanleDropdownChange={hanleDropdownChange} />
      </div>

      <div className="mt-4">
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            if (index > 2) {
              return (
                <LeaderBar
                  key={index}
                  name={item.name}
                  imgSrc={`${img}${item.dp}`}
                  position="third"
                  number={index + 1}
                  value={getValue(item)}
                />
              );
            }
          })}
        {/*<LeaderBar name="Paul Smith" imgSrc={Jonny} position="second" number="3" />*/}
        {/*<LeaderBar name="Paul Smith" imgSrc={Jonny} position="third" number="5" />*/}
      </div>
    </StyledLeaderBoard >
  );
}

export default LeaderBoard;

const StyledLeaderBoard = styled.div`
  padding: 2rem 1rem;
  .section1 {
    display: flex;
    align-items: center;
    .user-image {
      height: 14vh;
      width: 7vw;
      min-width: 7rem;
      min-height: 7rem;
      padding: 1rem;
      border-radius: 50%;
    }
    .user-texts {
      padding: 1rem 0;
      height: 100%;
      .username {
        color: #4d4f51;
        font-size: 1.0rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
      .user-subtext {
        color: #8f8f8f;
        font-size: 13px;
        font-weight: 500;
      }
    }
  }
  .section2 {
    display: flex;
    align-items: center;
    padding-right: 2%;
  }
  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 0 1.5rem;
  }
  @media (min-width: 992px) {
    padding: 3rem 3rem 0 3rem;
  }
`;

const StyledLeaderBoardCardSection = styled.div`
  align-items: center;
  display: flex;
  /* flex-direction: row; */
  justify-content: center;
  margin: 3.2rem 0;
  .container__column {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border: 2px solid #75b28f;
    border-top: 0;

    &.first {
      z-index: 2;
      background-color: #fff;
      box-shadow: 0 2px 6px 0px #75b28f;
    }
    &.second {
      transform: translateX(10px);
    }
    &.third {
      transform: translateX(-10px);
    }
    @media (max-width: 768px) {
      &.second {
        transform: translateX(0);
      }
      &.third {
        transform: translateX(0);
      }
    }
  }
  @media (max-width: 380px) {
    flex-direction: column;
  }
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
