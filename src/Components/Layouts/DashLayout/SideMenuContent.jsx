import axios from 'axios';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import schoolImg from '../../../assets/images/school.png';
import { api, img, tutors } from '../../../url';
import ChatPopUp from './ChatPopUp';
import SideMenuLessonBar from './SideMenuLessonBar';
import SideMenuSection from './SideMenuSection';
import SideMenuUserBar from './SideMenuUserBar';
function SideMenuContent() {
  const { pathname } = useLocation();
  const [data, setData] = useState(false);
  const [userData, setUserData] = useState('');
  const [currentChp, setCurrentChp] = useState('');
  const [inbox, setInbox] = useState([]);
  // const [disabled, setDisabled]= useState("false")
  // const navigate = useNavigate();
  //  const guestUser = localStorage.getItem("email_id");
  useEffect(() => {
    let lang = localStorage.getItem('lang');
    ViewCuerrentUser(lang);
    getData();
    getInboxList(1);
  }, []);

  function getInboxList(offset) {
    var url = `${api}ChatInbox?email_id=${localStorage.getItem('email_id')}&page=` + offset;
    axios
      .get(url)
      .then((res) => {
        setInbox(res.data.data.data);
      })
      .catch((err) => console.log(err));
  }

  function getCardsName() {
    let cards_name = [];
    if (
      localStorage.getItem('lang') == 'Fulfulde' ||
      localStorage.getItem('lang') == 'English-Fulfulde'
    ) {
      cards_name = ['Daura', 'Funtua', 'Jibia', 'Bakori'];
    } else if (
      localStorage.getItem('lang') == 'Yoruba' ||
      localStorage.getItem('lang') == 'English-Yoruba'
    ) {
      cards_name = ['Abeokuta', 'Lagos', 'Oshogbo', 'Ibadan'];
    } else if (
      localStorage.getItem('lang') == 'Igbo' ||
      localStorage.getItem('lang') == 'English-Igbo'
    ) {
      cards_name = ['Aba', 'Abba', 'Abor', 'Awo-Omamma'];
    } else if (
      localStorage.getItem('lang') == 'Esan' ||
      localStorage.getItem('lang') == 'English-Esan'
    ) {
      cards_name = ['Amahor', 'Ebelle', 'Egoro', 'Ewohimi'];
    } else if (
      localStorage.getItem('lang') == 'Hausa' ||
      localStorage.getItem('lang') == 'English-Hausa'
    ) {
      cards_name = ['Daura', 'Funtua', 'Jibia', 'Bakori'];
    } else if (
      localStorage.getItem('lang') == 'Zulu' ||
      localStorage.getItem('lang') == 'English-Zulu'
    ) {
      cards_name = ['Mthatha', 'Zwelitsha', 'Phuthaditjhaba', 'Osizweni'];
    } else if (
      localStorage.getItem('lang') == 'SeTswana' ||
      localStorage.getItem('lang') == 'English-SeTswana'
    ) {
      cards_name = ['Gaborone', 'Francistown', 'Molepolole', 'Serowe'];
    } else if (
      localStorage.getItem('lang') == 'Twi' ||
      localStorage.getItem('lang') == 'English-Twi'
    ) {
      cards_name = ['Accra', 'Kumasi', 'Tamale', 'Sekondi-Takoradi'];
    } else if (
      localStorage.getItem('lang') == 'Swahili' ||
      localStorage.getItem('lang') == 'English-Swahili'
    ) {
      cards_name = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru'];
    } else if (
      localStorage.getItem('lang') == 'Jamaican' ||
      localStorage.getItem('lang') == 'English-Jamaican'
    ) {
      cards_name = ['Kingston', 'Montego Bay', 'Port Antonio', 'Portmore'];
    }
    return cards_name;
  }

  function getData(page = 1) {
    axios
      .get(`${tutors}ViewTutors?email_id=${localStorage.getItem('email_id')}&page=${page}`)
      .then((res) => {
        if (res.data.status == 'success') {
          setData(res.data.data.data);
        }
      })
      .catch((err) => console.log(err));
  }

  function ViewCuerrentUser(lang) {
    axios
      .get(`${api}GetLanguageDetails?language=${lang}&email_id=${localStorage.getItem('email_id')}`)
      .then((res) => {
        if (res.data.status == 'failed') {
          setUserData('');
        } else {
          setUserData(res.data.data);
          setCurrentChp(res.data.data[0].cur_chapter_no);
        }
      })
      .catch((err) => console.log(err));
  }


  const [disabledNav, setdisabledNav] = useState(false);

  useLayoutEffect(() => {
    const lcLag = localStorage.getItem('lang');
    const email_id = localStorage.getItem('email_id');
    if (window.location.hash == '#/languages' && !lcLag || email_id == "guestUser") {
      setdisabledNav(true)
    } else {
      setdisabledNav(false)
    }
  }, [window.location.href])

  return (
    // { guestUser === "guestUser" && }
    <StyledSideMenuContent style={{ pointerEvents: `${disabledNav ? 'none' : ''}`, opacity: `${disabledNav ? '0.3' : ''}` }}>
      {/*<div className="mb-3">*/}
      {/*  <SearchBar placeholder="Search" />*/}
      {/*</div>*/}
      <SideMenuSection title="Instructors">
        {data &&
          data.length > 0 &&
          data?.map((item, index) => (
            <SideMenuUserBar
              key={index}
              name={item.name}
              id={index}
              isOnline={true}
              action={true}
              url={'/live-classes/detail/' + index}
              imgSrc={`${img}${item.dp}`}
              module="classes"
            />
          ))}
      </SideMenuSection>
      {inbox && inbox.length > 0 && (
        <SideMenuSection title="Inbox">
          {inbox &&
            inbox?.map((item) => (
              <SideMenuUserBar
                key={item.chat_id}
                name={item.message}
                id={item.chat_id}
                action={true}
                url={'/inbox/' + item.chat_id + '/' + item.c_m_id}
                imgSrc={`${img}${item.dp}`}
                module="inbox"
                dp={item.dp}
              />
            ))}
        </SideMenuSection>
      )}

      <SideMenuSection title="Lessons">
        {getCardsName().map((item, index) => {
          return (
            <div key={index}>
              {index < (userData ? currentChp : 1) ? (
                <SideMenuLessonBar
                  name={'Lesson ' + parseInt(index + 1) + ' ' + item}
                  imgSrc={schoolImg}
                  id={parseInt(index + 1)}
                />
              ) : (
                ''
              )}
            </div>
          );
        })}
      </SideMenuSection>
      {pathname === '/lessons' && <ChatPopUp />}
    </StyledSideMenuContent>
  );
}
export default SideMenuContent;

var a = window.outerHeight;

const StyledSideMenuContent = styled.div`
  height: ${a}px;
  overflow-y: scroll;
  padding: 1rem 1rem;
  ::-webkit-scrollbar {
    width: 9px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 9px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.secondary};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.primary};
  }
`;
