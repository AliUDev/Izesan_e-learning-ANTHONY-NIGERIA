import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import NextIcon from '../../../assets/images/arrow.png';
import TeacherCard from './TeacherCard';

// import { useNavigate } from 'react-router-dom';

function TeachersSlider(props) {
  const scrollViewRef = useRef(null);
  // const navigate = useNavigate();
  console.log(props.allData);
  const [showingRight, setShowingRight] = useState(true);

  // const [items, setItems] = useState([]);
  // const [activeTeacher, setActiveTeacher] = useState({
  //   id: 1,
  //   name: 'Dakosta Wereko',
  //   rate: 5,
  //   rating_count: 1,
  //   lessons: 44,
  //   teaches: 'Twi'
  // });

  const [activeTeacher, setActiveTeacher] = useState(props.allData[0]);

  const handleActiveTeacher = (teacher, index) => {
    setActiveTeacher(teacher);
    props.loadNew(index);
    //navigate('/live-classes/detail/' + index);
  };
  useEffect(() => {
    // setItems([
    //   {
    //     id: 1,
    //     name: 'Dakosta Wereko',
    //     rate: 5,
    //     rating_count: 1,
    //     lessons: 44,
    //     teaches: 'Twi'
    //   },
    //   {
    //     id: 2,
    //     name: 'Dakosta Wereko',
    //     rate: 5,
    //     rating_count: 1,
    //     lessons: 44,
    //     teaches: 'Twi'
    //   },
    //   {
    //     id: 3,
    //     name: 'Dakosta Wereko',
    //     rate: 5,
    //     rating_count: 1,
    //     lessons: 44,
    //     teaches: 'Twi'
    //   },
    //   {
    //     id: 4,
    //     name: 'Dakosta Wereko',
    //     rate: 5,
    //     rating_count: 1,
    //     lessons: 44,
    //     teaches: 'Twi'
    //   },
    //   {
    //     id: 5,
    //     name: 'Dakosta Wereko',
    //     rate: 5,
    //     rating_count: 1,
    //     lessons: 44,
    //     teaches: 'Twi'
    //   },
    //   {
    //     id: 6,
    //     name: 'Dakosta Wereko',
    //     rate: 5,
    //     rating_count: 1,
    //     lessons: 44,
    //     teaches: 'Twi'
    //   }
    // ]);
  }, []);

  const handleScrollToRight = () => {
    const offset = 200;
    const container = scrollViewRef.current;
    const containerWidth = container.offsetWidth;
    const scrollWidth = container.scrollWidth;
    const currentScroll = container.scrollLeft;
    const newScroll = currentScroll + containerWidth;
    container.scrollTo({
      top: 0,
      left: newScroll,
      behavior: 'smooth'
    });

    if (newScroll > scrollWidth - offset) {
      setShowingRight(false);
    }
  };
  const handleScrollToLeft = () => {
    const container = scrollViewRef.current;
    const containerWidth = container.offsetWidth;
    const currentScroll = container.scrollLeft;
    const newScroll = currentScroll - containerWidth;
    container.scrollTo({
      top: 0,
      left: newScroll,
      behavior: 'smooth'
    });
    if (currentScroll < containerWidth) {
      setShowingRight(true);
    }
  };

  return (
    <StyledTeacherSlider className=" row text-center">
    <div className="next-image d-flex align-items-center justify-content-center h-auto col-lg-2 left col-md-2 col-sm-2" onClick={handleScrollToLeft}>
          <img className='Ipic' src={NextIcon} />
        </div>
      {/* {!showingRight && (
        <div className="next-image left" onClick={handleScrollToLeft}>
          <img src={NextIcon} />
        </div>
      )} */}
      {/* {showingRight && (
        <div className="next-image bg-dark" onClick={handleScrollToRight}>
          <img src={NextIcon} />
        </div>
      )} */}
      <div className=" overFlowSlider d-flex flex-row secDiv col-lg-8 col-md-8 col-sm-8" ref={scrollViewRef}>
        {/*{items?.map((item, index) => {*/}
        {/*  const isActive = activeTeacher.id === item.id;*/}
        {/*  return (*/}
        {/*    <TeacherCard*/}
        {/*      key={index}*/}
        {/*      teacherDetails={item}*/}
        {/*      isActive={isActive}*/}
        {/*      handleActiveTeacher={handleActiveTeacher}*/}
        {/*    />*/}
        {/*  );*/}
        {/*})}*/}

        {props.allData &&
          props.allData?.map((item, index) => {
            const isActive = index == props.activeId;
            return (
              <TeacherCard
                key={index}
                teacherDetails={item}
                isActive={isActive}
                currentIndex={index}
                handleActiveTeacher={handleActiveTeacher}
              />
            );
          })}
          
      </div>
        {/* sadia */}
      <div className="next-image m-0 d-flex align-items-center thirdDiv justify-content-center h-auto col-lg-2 col-md-2 col-sm-2" onClick={handleScrollToRight}>
          <img className='Ipic' src={NextIcon} />
        </div> 
        {/* sadia */}
      
    </StyledTeacherSlider>
  );
}

export default TeachersSlider;

const StyledTeacherSlider = styled.div`
.overFlowSlider{
    overflow-x: auto;
    width: 56vw;
    padding: 0.5rem 0;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; 
  }
  @media (width:1024px) {
    .overFlowSlider{
    overflow-x: auto;
    width: 30vw;
    padding: 0.5rem 0;
    ::-webkit-scrollbar {
      display: none;
    }
  }}
  @media (min-width:750px) and (max-width:930px) {
    .overFlowSlider{
    overflow-x: auto;
    width: 75vw;
    padding: 0.5rem 0;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; 
  }}
  @media (min-width: 1600px) {
    .overFlowSlider{
    overflow-x: auto;
    width: 70vw;
    padding: 0.5rem 0;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; 
    scrollbar-width: none; 
  }
  }
  @media (min-width:990px) and (max-width:1250px) {
    .overFlowSlider{
    overflow-x: auto;
    width: 45vw;
    padding: 0.5rem 0;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; 
  }}
  @media (min-width:1280px) and (max-width:1350px) {
    .overFlowSlider{
    overflow-x: auto;
    width: 55vw;
    padding: 0.5rem 0;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; 
  }
  @media (min-width:1020px) and (max-width:1290px) {
    .overFlowSlider{
    overflow-x: auto;
    width: 50vw;
    padding: 0.5rem 0;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; 
  }}
  /* @media (min-width:760px) and (max-width:990px) {
    .overFlowSlider{
    overflow-x: auto;
    width: 90vw;
    padding: 0.5rem 0;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; 
    scrollbar-width: none; 
  }} */
  @media (max-width:955px) {
    .overFlowSlider{
    overflow-x: auto;
    width: 50vw;
    padding: 0.5rem 0;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; 
  }}
  @media (min-width:650px) and (max-width:760px) {
    .overFlowSlider{
    overflow-x: auto;
    width: 80vw;
    padding: 0.5rem 0;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; 
  }}
  }
  @media (min-width:300px) and (max-width:550px) {
    .overFlowSlider{
    overflow-x: auto;
    width: 75vw;
    padding: 0.5rem 0;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; 
  }}
  .next-image {
    display: flex;
    align-items: center;
    width: 35px;
    height: 100%;
    cursor: pointer;
    &.left {
      transform: rotate(180deg);
    }
    /* img {
      width: 100%;
    } */
  }
  .Ipic{
    object-fit:cover;
    width: 100%;
    height: auto;
  }

  @media (min-width: 992px) {
    .scroll-view {
      width: calc(100vw - 575px);
    }
  }

  @media (min-width: 1200px) {
    .scroll-view {
      width: calc(100vw - 590px);
    }
  }


`;
