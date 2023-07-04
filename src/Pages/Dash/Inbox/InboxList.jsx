import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserImage from '../../../Components/Common/UserImage';
import { api, img } from '../../../url';

function InboxList({ searchUser }) {
  // const socket = io("http://18.218.131.26/");

  // useEffect(() => {
  //   socket.on("connect", (data) => {
  //     console.log("Message from the server", data)
  //   })
  //   socket.emit("Thanks for connecting");
  //   return () => {
  //     socket.off("connect")
  //   }
  // })

  const [err, setErr] = useState(false);
  const [isLoader, setisLoader] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getInboxList(1);
  }, [searchUser]);

  function handlePageChange(event) {
    console.log(`active page is ${event.selected}`);
    getInboxList(event.selected + 1);
  }

  function getInboxList(offset) {
    console.log(offset, 'offset');
    var url = `${api}ChatInbox?email_id=${localStorage.getItem('email_id')}&page=` + offset;
    if (searchUser != '') {
      url = url + '&name=' + searchUser;
    }
    axios
      .get(url)
      .then((res) => {
        setData(res.data.data.data);
        setTotalPages(res.data.data.last_page);
        console.log(res.data.data.data);
      })
      .catch((err) => console.log(err));
  }

  function readMessages(chat_id) {
    console.log(chat_id);
    axios
      .post(`${api}ReadMessage`, { c_m_id: chat_id })
      .then((res) => {
        console.log(res);
        // getInboxList(1);
        // setData([]);
        // setTotalPages(1);
        // location.reload();
        // openChat()
        // if (res.data.status == 'success') {
        //   getInboxList(1);
        // } else {
        //   //still do nothing here
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const item = localStorage.getItem('active_inbox_person');
    console.log(item);
    openChat(item, item, img);
    setindexOfChat(item);
  }, []);
  const [indexOfChat, setindexOfChat] = useState(0);

  const indexing = (key) => {
    console.log('Got that key', key, 'From Parameter');
    localStorage.setItem('active_inbox_person', key);
    const item = localStorage.getItem('active_inbox_person');
    console.log('active_inbox_person_id...', item);
    setindexOfChat(item);
  };

  function openChat(chat_id, c_m_id, dp) {
    console.log(chat_id, c_m_id, dp);
    localStorage.setItem('current_img', dp);
    if (chat_id && c_m_id) {
      navigate('/inbox/' + chat_id + '/' + c_m_id);
    }
  }
  return (
    <StyledInboxList>
      <div className="inboxListItemContainer">
        {data &&
          data.length > 0 &&
          data?.map((item, index) => {
            return (
              <div
                key={index}
                style={{ cursor: 'pointer', width: '100%' }}
                onClick={() => openChat(item?.chat_id, item.c_m_id, item.dp)}>
                <StyledInboxListItem
                  index={index}
                  unread={item.unread_count}
                  style={{
                    backgroundColor: `${item?.chat_id == localStorage.getItem('active_inbox_person')
                      ? 'rgb(255, 193, 7, 0.8)'
                      : 'white'
                      }`
                  }}
                  onClick={() => indexing(item?.chat_id)}>
                  <div className="d-flex align-items-center p-1">
                    <UserImage
                      imgSrc={img + '' + item.dp}
                      name={item.name}
                      id={item.chat_id}
                      size="50"
                    // isOnline={true}
                    />
                    {/* name and msg */}
                    <div className="nameandmessage align-items-start justify-content-start d-flex flex-column">
                      <div className="username">{item.name}</div>
                      <div
                        className="message text-truncate"
                        style={{
                          maxWidth: '100px'
                        }}>
                        {item.message}
                      </div>
                    </div>
                  </div>

                  {/* time and unread */}
                  <div className="d-flex flex-column align-items-end">
                    <div
                      className="messagetime"
                      style={{
                        color: `${item?.chat_id == localStorage.getItem('active_inbox_person')
                          ? 'black'
                          : '#bebdbd'
                          }`
                      }}>
                      {item.timestamp}
                    </div>
                    {item.unread_count > 0 && (
                      <div className="unread_count rounded-circle">{item.unread_count}</div>
                    )}
                  </div>
                </StyledInboxListItem>
              </div>
              // </Link>
            );
          })}
      </div>
      <div style={{ marginTop: '4%' }}>
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </StyledInboxList>
  );
}

export default InboxList;

const StyledInboxList = styled.div`
  border-radius: 20px;

  width: fit-content;

  ${'' /* @media (max-width: 850px) {
    width: 94px;
  } */
  }
  @media (min-width: 320px) {
    width: 100%;
  }
  @media (min-width: 768px) {
    width: fit-content;
  }
  .inboxListItemContainer {
    height: calc(100vh - 19.05rem);
    overflow: auto;
    ::-webkit-scrollbar {
      display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    @media (min-width: 320px) {
      height: calc(100vh - 11.5rem);
    }
    @media (min-width: 720px) {
      height: calc(100vh - 19.05rem);
    }
  }
  .inboxSearchContainer {
    height: 4.2rem;
    display: flex;
    align-items: center;
    .inboxSearch {
      width: 100%;
      margin: 10px;
      border: 1px solid #c5c5c5;
      border-radius: 5px;
      /* height: 2rem; */
      display: flex;
      align-items: center;
      position: relative;
      padding-left: 2rem;
      background: #fff;
      svg {
        position: absolute;
        left: 5px;
        color: #adadad;
      }
      input {
        border: 0;
        box-shadow: none;
        padding-left: 5px;
      }
    }
  }
`;
const StyledInboxListItem = styled.div`
  display: flex;
  width: 100%;
  height: 5rem;
  flex-direction: row;
  background: ${(props) => (props.index === 0 ? '#EEEEEE' : '#F7F7F7')};
  justify-content: space-between;
  padding: 2rem 1rem 2rem 1rem;
  margin: 6px 0;
  box-shadow: #7a7a7a;
  align-items: center;
  border-radius: ${(props) => (props.index === 0 ? '1rem 1rem 1rem 1rem' : '1rem')};
  border-bottom: 1px solid #ddd7d7;

  .username {
    font-size: 1.1rem;
    font-weight: 600;
    margin-top: 0;
    text-align: start;
    margin-bottom: 10px;
    margin-left: 0.6rem;
  }
  .chatListWrapper {
    margin: 50px 0;
  }
  .message {
    font-size: 0.8rem;
    font-weight: 400;
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 0.6rem;
    color: #918d8d;
  }
  .messagetime {
    font-size: 0.7rem;
    font-weight: 500;
    width: 60%;
    line-height: 20px;
    overflow-x: hidden;
    color: #bebdbd;
    margin: 0.5rem 0;
  }
  .unread_count {
    font-size: 0.7rem;
    font-weight: 700;
    border-radius: 1rem;
    color: white;
    background-color: #4ba05e;

    width: 20px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
