import { ArrowLeftShort } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Background from '../../../assets/images/bkg.png';
import Heading from '../../../Components/Common/Heading';

function Info() {
  const infoArr = [
    { 'info': '“Izesan! Speak Esan!”.' },
    { 'info': ' In the first couple kingdoms of “Izesan! Speak Esan!” the prompts are all in English, so all you need to do is select the correct Esan translation.' },
    { 'info': 'As you progress through each Esan kingdom, you will receive an achievement badge to celebrate your progress! At the same time, the English translations will start to disappear and you will have to rely solely on the images/illustrations and your knowledge from the previous lessons.' },
    { 'info': 'Still, if you’ve hit a roadblock, you can always “favorite” whichever question/prompt you’re stuck on and the English translation will appear in the “favorites” section.' },
    { 'info': '-Zoom in to the illustrations by pressing your thumb and index finger on the image and then drag them apart.' },
    { 'info': '-“Favorite” any prompts that are giving you a hard time and view the English translation in the “Favorites” section' },
    { 'info': '-Test your knowledge by visiting “💡 check”' },
  ]
  const navigate = useNavigate()
  return (
    <StyledLayout>
      <div className='row w-100 m-3'>
        <div className='col-1'>
          <ArrowLeftShort className="fs-1 text-warning" style={{ cursor: "pointer" }} onClick={() => navigate(-1)} />
        </div>
        <div className='col-10'>
          <Heading title="Information" className='text-center m-1 text-decoration-underline fw-bold' />
        </div>
      </div>
      <div className="infomain">
        {
          infoArr.map((data, key) => (
            <div key={key}>
              <p>{data.info}</p>
            </div>
          ))
        }
      </div>
    </StyledLayout>
  );
}

export default Info;

const StyledLayout = styled.div`
  padding: 2rem 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 0 1.5rem;
  }
  @media (min-width: 992px) {
    padding: 3rem 3rem 0 3rem;
  }
  background: url(${Background});
  /* height: 100vh; */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center 100%;
  /* height: 100%; */
  .lessontitle {
  }

  .lessoncards {
    max-width: 16rem !important;
    min-width: 14rem !important;
  }

  .livecards {
    max-width: 13rem !important;
    min-width: 13rem !important;
  }

  .infomain {
    color:  ${(props) => props.theme.secondary};
    font-size: 20px !important;
    padding: 0px 5vw;
    font-weight: bold;
  }

  @media screen and (min-width: 320px) and (max-width: 425px) {
    .infomain {
      font-size: 0.9rem;
    }
  }

  @media screen and (min-width: 425px) and (max-width: 768px) {
    .lessoncards {
      max-width: 16rem !important;
      min-width: 16rem !important;
    }
    .infomain {
      font-size: 1.2rem;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    .infomain {
      font-size: 1.3rem;
    }
  }

  @media screen and (min-width: 1024px) and (max-width: 1248px) {
    .infomain {
      font-size: 1.35rem;
    }
  }

  @media screen and (min-width: 1248px) and (max-width: 1440px) {
    .infomain {
      font-size: 1.6rem;
    }
  }
`;
