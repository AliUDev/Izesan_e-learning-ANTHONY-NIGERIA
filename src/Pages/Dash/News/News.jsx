import axios from 'axios';
import { useEffect, useState } from 'react';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import { NotificationManager } from 'react-notifications';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GreyPic from '../../../assets/images/gray_pic.png';
import Heading from '../../../Components/Common/Heading';
import { newsSubscribe } from '../../../redux';
import { api, img } from '../../../url';
import Loader from '../../Loader/Loader';

function News(props) {
  const [isLoader, setisLoader] = useState(false);
  const [data, setData] = useState(false);
  const [isSubscribe, setIsSubscribe] = useState(props.is_news_subscribe);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getNews();
  }, []);

  function timeAgo(createAt) {
    const time = new Date(createAt);
    const now = new Date();
    const diff = (now.getTime() - time.getTime()) / 1000;
    if (diff < 60) {
      return 'just now';
    }
    if (diff < 3600) {
      return Math.round(diff / 60) + ' minutes ago';
    }
    if (diff < 86400) {
      return Math.round(diff / 3600) + ' hours ago';
    }
    if (diff < 604800) {
      return Math.round(diff / 86400) + ' days ago';
    }
    if (diff < 2592000) {
      return Math.round(diff / 604800) + ' weeks ago';
    }
    if (diff < 31536000) {
      return Math.round(diff / 2592000) + ' months ago';
    }
    if (diff < 315360000) {
      return Math.round(diff / 31536000) + ' years ago';
    }
    return time.toDateString();
  }

  function getNews(offset = 1) {
    setisLoader(true);
    axios
      .post(`${api}get/notifications`, { page: offset })
      .then((res) => {
        if (res.data.status == 'success') {
          setisLoader(false);
          setData(res.data.data.data);
          setTotalPages(res.data.data.last_page);
        } else {
          setisLoader(false);
          NotificationManager.error('No data available!', 'Error', 3000);
        }
      })
      .catch((err) => {
        console.log(err);
        window.setTimeout(() => {
          //when cors error call again API
          getNews();
        }, 2000);
      });
  }

  function handlePageChange(event) {
    console.log(`active page is ${event.selected}`);
    getNews(event.selected + 1);
  }

  function getDetail(item) {
    var title = '';
    var description = '';
    var receiverName = item.receiver_name;
    if (item.type == 'badge_earned') {
      title = item.title;
      if (item.position_win == 'farmer') {
        description = 'has earned Farmer badge in ';
      } else if (item.position_win == 'fisherman') {
        description = 'has earned Fisherman badge in ';
      } else if (item.position_win == 'doctor') {
        description = 'has earned Native doctor badge in ';
      } else if (item.position_win == 'hunter') {
        description = 'has earned Hunter badge in ';
      } else if (item.position_win == 'ehunter') {
        description = ' has earned Elephent hunter badge in ';
      } else if (item.position_win == 'chief') {
        description = 'has earned Chief badge in ';
      } else if (item.position_win == 'king') {
        description = ' has earned King badge in ';
      } else {
        description = 'has earned Omugbo badge in ';
      }
    } else {
      if (item.title == 'Longest Time Spending') {
        title = <b>Binge Barbarians</b>;
        description = 'got ' + item.position_win + ' position in ';
      } else if (item.title == 'Streak Earned') {
        title = 'Streak Slayers';
        description = 'got ' + item.position_win + ' position in ';
      } else if (item.title == 'Kobo Earned') {
        title = 'Ɗangote’s Daddies';
        description = 'got ' + item.position_win + ' position in ';
      } else if (item.title == 'Longest Day Streak Maintained') {
        title = 'No Days Off';
        description = 'got ' + item.position_win + ' position in ';
      }
    }
    // console.log(title);
    // console.log(description);
    return { title, description, receiverName };
  }

  function subscribe() {
    var email = localStorage.getItem('email_id');
    axios
      .post(`${api}news/subscribe`, { email: email })
      .then((res) => {
        if (res.data.status == 'success') {
          setisLoader(false);
          setIsSubscribe(1);
          NotificationManager.success(res.data.message, 'Success', 3000);
          props.newsSubscribe(1);
        } else {
          setisLoader(false);
          NotificationManager.success(res.data.error, 'Error', 3000);
        }
      })
      .catch((err) => console.log(err));
  }

  function unsubscribe() {
    var email = localStorage.getItem('email_id');
    axios
      .post(`${api}news/unsubscribe`, { email: email })
      .then((res) => {
        if (res.data.status == 'success') {
          setisLoader(false);
          setIsSubscribe(0);
          NotificationManager.success(res.data.message, 'Success', 3000);
          props.newsSubscribe(0);
        } else {
          setisLoader(false);
          //alert(res.data.error);
          NotificationManager.success(res.data.error, 'Error', 3000);
        }
      })
      .catch((err) => console.log(err));
  }
  const navigate = useNavigate()

  return (
    <StyledAza>
      {isLoader && <Loader />}
      <div className='row m-3'>
        <div className='col-1 p-1'>
          <ArrowLeftShort className="fs-1 text-warning" style={{ cursor: "pointer" }} onClick={() => navigate(-1)} />
        </div>
        <div className='col-10'>
          <Heading title="News Updates" className='text-center m-2 text-decoration-underline fw-bold' />
        </div>
      </div>
      <div className="d-flex w-100 flex-row flex-wrap justify-content-between">
        <div className="d-flex flex-row left-content">
          {/*<img className="kobo-user" src={`${img}${dp}`} />*/}
          <div className="d-flex flex-column left-text-content mx-3">
            {isSubscribe == null && (
              <button className="btn btn-warning" onClick={() => subscribe()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-bell"
                  viewBox="0 0 16 16">
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                </svg>
                <span style={{ paddingLeft: '10px' }}>Subscribe</span>
              </button>
            )}
            {isSubscribe == 0 && (
              <button className="btn btn-warning" onClick={() => subscribe()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-bell"
                  viewBox="0 0 16 16">
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                </svg>
                <span style={{ paddingLeft: '10px' }}>Subscribe</span>
              </button>
            )}

            {isSubscribe == 1 && (
              <button className="btn btn-danger" onClick={() => unsubscribe()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-bell"
                  viewBox="0 0 16 16">
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                </svg>
                <span style={{ paddingLeft: '10px' }}>UnSubscribe</span>
              </button>
            )}
          </div>
        </div>
      </div>
      <div>
        {data &&
          data.length > 0 &&
          data.map((item) => {
            let { title, description, receiverName } = getDetail(item);
            return (
              <div
                key={item.id}
                className="transactionbar d-flex justify-content-between align-items-center bg-white my-2 p-2 pe-md-5">
                <div className="transaction-image">
                  <img
                    style={{ marginRight: '20px', objectFit: 'cover' }}
                    className="transaction-user"
                    src={`${img}${item.receiver_dp}`}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = GreyPic;
                    }}
                  />
                </div>

                <span
                  className="transaction-date transaction-title text-center"
                  style={{ wordBreak: 'break-all' }}>
                  <b style={{ color: 'goldenrod' }}>{title}</b>
                </span>
                <span className="transaction-date transaction-description px-1">
                  <b>{receiverName}</b> {description} <b>{title}</b>
                  <br />
                  <span className="transaction-date transaction-time fw-light">
                    <b style={{ color: 'mediumpurple' }}>{timeAgo(item.created_at)}</b>
                  </span>
                </span>

              </div>
            );
          })}
      </div>

      <div>
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
    </StyledAza>
  );
}

const StyledAza = styled.div`
  padding: 2rem 1rem;
  .left-content {
    justify-content: flex-start;
  }

  .kobo-user {
    width: 65px;
    height: 65px;
  }
  .left-text-content {
    justify-content: flex-end;
  }
  .cardkobo {
    width: 100%;
  }
  .my-filter {
    background-color: #efefef;
    border-radius: 10px;
    &.active {
      border: 3px solid ${(props) => props.theme.secondary};
    }
  }
  .filter-name {
    text-align: center;
    color: #000000;
    opacity: 1;
    margin-top: 0.2rem;
  }
  .last-transaction-title {
    font-weight: 800;
    font-size: 22px;
  }
  .see-all {
    font-weight: 500;
    font-size: 20px;
    color: ${(props) => props.theme.secondary};
  }

  .transactionbar {
    border-radius: 10px;
  }
  .transaction-date {
    color: #4d4f51;
    font-size: 18px;
    font-weight: 500;
  }
  .transaction-image {
    width: 15%;
  }
  .transaction-title {
    width: 50%;
  }
  .transaction-description {
    width: 60%;
  }
  .transaction-time {
    width: 14%;
  }
  .transaction-user {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  @media (max-width: 767px ){
    .transaction-user{
      width: 50px;
    height: 50px;
    }
    .transaction-title {
    width: 43%;
    padding: 10px;
    font-size: 15px;
  }
  }
  .transaction-amount {
    font-size: 18px;
  }
  .up-icon {
    width: 42px;
    object-fit: contain;
  }
  .up-red {
    color: #db2822;
  }
  .down-green {
    color: #489a6b;
  }
  .neutral {
    color: #000000;
  }
  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 0 1.5rem;
  }
  @media (min-width: 992px) {
    padding: 3rem 3rem 0 3rem;
  }

  .hideItem {
    display: none !important;
  }
  .showItem {
    display: block;
  }
`;

const mapStatetoProps = (state) => {
  console.log(state);
  return {
    is_news_subscribe: state.user.newsSubscribe
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    newsSubscribe: function (isSubscribe) {
      dispatch(newsSubscribe(isSubscribe));
    }
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(News);
// export default News;
