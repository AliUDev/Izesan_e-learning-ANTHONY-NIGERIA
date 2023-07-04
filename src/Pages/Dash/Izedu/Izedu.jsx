import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { api } from '../../../url';
import Loader from '../../Loader/Loader';
import AgeVerification from './AgeVerification';

const Izedu = () => {
  const [pgData, setpgData] = useState([]);
  const [data, setdata] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, settotalPages] = useState(0);
  const [loading, setloading] = useState('');

  useEffect(() => {
    getData();
  }, []);
  const getData = (key) => {
    setloading(true);
    axios
      .get(key ? key : `${api}lyrics/list`)
      .then((res) => {
        setdata(res?.data.data.data);
        setpgData(res?.data.data);
        settotalPages(res?.data.data.last_page);
        setloading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch((err) => {
        console.log(err);
      });

    key
      ? localStorage.setItem('api_for_current_video', key)
      : localStorage.removeItem('api_for_current_video');
  };

  const navigate = useNavigate();

  return (
    <div>
      {loading && <Loader />}
      <AgeVerification />
      <StyledFavorites>
        {/* <h3 className='text-center fw-bold p-2 m-2'>Izedu</h3> */}
        <div className="row w-100 p-1">
          <div className="col-1">
            <ArrowLeftShort
              className="fs-1 m-1 text-warning"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(-1)}
            />
          </div>
          <div className="col-10">
            <h3 className="text-center fw-bold">Izedu</h3>
          </div>
        </div>
        {data?.map((data, key) => (
          <Link to={`/izedu-vid/${data.id}`} key={key}>
            <div className="izedu_list row mb-3 bg-body">
              <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-12 p-0 m-0">
                <img src={data.type} className="m-0 p-0" width="100%" />
              </div>
              <div className="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-12  ">
                <div className="p-2">
                  <p className="fs-4 fw-light text-capitalize">Song: {data.name}</p>
                  <p className="fs-5 fw-normal text-secondary">Artist Name: {data.artist_name}</p>
                  <p className="fs-6 fw-light text-secondary">#{data.tags}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
        <div className="text-center pt-3">
          <div className="d-flex justify-content-between ">
            <div>
              <button
                className="btn btn-success"
                onClick={() => setPage(page - 1) + getData(pgData?.prev_page_url)}
                disabled={pgData?.prev_page_url === null}>
                Previous
              </button>
            </div>
            <div>
              <p>
                {pgData?.current_page} / {totalPages && totalPages}
              </p>
            </div>
            <div>
              <button
                className="btn btn-success"
                onClick={() => setPage(page + 1) + getData(pgData?.next_page_url)}
                disabled={pgData?.next_page_url === null}>
                Next
              </button>
            </div>
          </div>
        </div>
      </StyledFavorites>
    </div>
  );
};

export default Izedu;

const StyledFavorites = styled.div`
  margin: 0px 30px 0px 60px;
  padding: 20px 0px;
  .izedu_list {
    height: auto;
    width: 100%;
    background-color: rgb(0, 0, 0, 0.02);
    box-shadow: 0px 0px 5px rgb(0, 0, 0, 0.2);
    color: black;
    border-radius: 25px;
    cursor: pointer;
    transition-duration: 100ms;
    /* border: 1px solid orange; */
    overflow: hidden;
  }
  .izedu_list:hover {
    transition-duration: 100ms;
    transform: scale(1.01);
    box-shadow: 0px 0px 5px rgb(0, 0, 0, 0.4);
  }
  img {
    height: 180px;
    border-radius: 25px;
  }
  a {
    text-decoration: none;
  }
  .izedu_list img {
    width: 100%;
    height: 100%;
    margin-left: -10px;
  }
`;
