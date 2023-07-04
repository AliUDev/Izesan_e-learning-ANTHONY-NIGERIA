import TuneIcon from '@mui/icons-material/Tune';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import greyImg from '../../../assets/images/gray_pic@2x.png';
import Heading from '../../../Components/Common/Heading';
import { api, img, tutors } from '../../../url';
import Loader from '../../Loader/Loader';
function LiveClasses() {

  const style = {
    position: 'absolute',
    top: '50%',
    textAlign: 'center',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  // const [items, setItems] = useState();
  const [isLoader, setisLoader] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isHovering, setIsHovering] = useState(false);

  function getData(page) {
    setisLoader(true);
    axios
      .get(`${tutors}ViewTutors?email_id=${localStorage.getItem('email_id')}&page=${page}`)
      .then((res) => {
        if (res.data.status == 'success') {
          setData(res.data.data.data);
          setTotalPages(res.data.data.last_page);
          setisLoader(false);
        }
      })
      .catch((err) => console.log(err));
  }

  const handleMouseOver = (divId) => {
    document.getElementById(divId).style.display = 'block';
    setIsHovering(true);
  };

  const handleMouseOut = (divId) => {
    setIsHovering(false);
    document.getElementById(divId).style.display = 'none';
  };



  function getData1(offset, searchVal = '') {
    var URL = `${api}ViewUsers?email_id=${localStorage.getItem('email_id')}&page=` + offset;
    if (searchVal != '') {
      URL =
        `${api}ViewUsers?email_id=${localStorage.getItem('email_id')}&page=` +
        offset +
        '&name=' +
        searchVal;
    }
    axios
      .get(URL)
      .then((res) => {
        setData(res.data.data.data);
        setTotalPages(res.data.data.last_page);
        //setgetAllData(res.data.data);
      })
      .catch((err) => console.log(err));
  }

  function handlePageChange(event) {
    console.log(`active page is ${event.selected}`);
    getData(event.selected + 1);
  }

  useEffect(() => {
    getData(1);
  }, []);

  const sortbyRating = () => {
    data.sort((a, b) => b.tutor_rating - a.tutor_rating);
  }



  const [searchState, setsearchState] = useState('');
  console.log(searchState);
  console.log(data);
  const filteredData = data?.filter(item =>
    item.name.toLowerCase().includes(searchState.toLowerCase())
  );
  console.log(filteredData);

  return (

    <StyledLayout>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sort By
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 0 }}>
            <button className='btn btn-success mt-3 w-100' onClick={() => sortbyRating() + handleClose()}>Rating</button>
          </Typography>
        </Box>
      </Modal>
      {isLoader && <Loader />}
      <div className="row m-2">
        <div className='col-1'>
          {/* <Link to='/notification/stats'>
            <ArrowLeftShort className="fs-1 text-warning" style={{ cursor: "pointer" }} />
          </Link> */}
        </div>
        <div className='col-10 '>
          <Heading title="Instructors " className='text-center text-decoration-underline m-1  fw-bold' />
        </div>
      </div>
      <div className='row m-0 w-100 text-center px-5'>
        <div className='col-10'>
          <input className='form-control m-0 ' value={searchState} onChange={(e) => setsearchState(e.target.value)} placeholder='Filter Data' />
        </div>
        <div className='col-2 cursor-pointer'>
          <TuneIcon onClick={handleOpen} />
        </div>
      </div>

      <Container fluid="sm">
        <Row className="w-100 m-0 justify-content-around">
          {data.length > 0 &&
            filteredData.map((item, index) => {
              return (
                <>
                  {item.email_id != localStorage.getItem('email_id') ? (
                    <Col
                      key={index}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        navigate('/live-classes/detail/' + index);
                      }}
                      className="col col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2 livecards">
                      <div
                        onMouseOver={() => handleMouseOver('div_id_' + index)}
                        onMouseOut={() => handleMouseOut('div_id_' + index)}
                        className="profile-classes rounded text-capitalize"
                        style={{
                          backgroundImage: `url(${item.dp ? img + '' + item.dp : greyImg}`,
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: '50% 50%'
                        }}>
                        <div
                          className="position-absolute bottom-0 start-50 translate-middle-x text-light rounded w-100"
                          id={'div_id_' + index}
                          style={{
                            display: `${window.innerWidth < 425 ? '' : 'none'}`,
                            backgroundColor: 'rgb( 0, 0, 0, 0.6)',
                            backdropFilter: 'blur(1px)'
                          }}>
                          <div className="row text-center">
                            <div className="col-12">{item.name}</div>
                            <div className="col-12">Teaches {item.lang_to_teach}</div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ) : (
                    ''
                  )}
                </>
              );
            })}
        </Row>
        <div className='text-center mt-5' style={{ display: "flex", justifyContent: 'center' }}>
          <div >
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
        </div>

      </Container>
    </StyledLayout>
  );
}

export default LiveClasses;

const StyledLayout = styled.div`
  // .profile-classes {
  //   height: 274px;
  //   width: 192px;
  //   margin-top: 10%;
  //   object-fit: cover;
  //   background-size: auto 100%;
  //   background-repeat: no-repeat;
  //   background-position: left top;
  //   position: relative;
  //   border-radius: 16px;
  // }

  .profile-classes {
    height: 200px;
    width: 200px;
    margin-top: 10%;
    object-fit: cover;
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: left top;
    position: relative;
    background-color:grey;
    transition-duration: 130ms;
  box-shadow: 0px 1px 2px black;

}
.profile-classes:hover{
  transition-duration: 130ms;
  transform: scale(1.02);
  box-shadow: 0px 4px 6px grey;
}
  .lessontitle {
    text-align: left;
    font: normal normal normal 27px/40px Roboto;
    letter-spacing: 0px;
    color: #000000;
    /* margin-bottom: 30px; */
  }
  .lessontitlespan {
    text-align: left;
    font: normal normal bold 27px/40px Poppins;
    letter-spacing: 0px;
    color: #000000;
  }

  .livecards {
    max-width: 13rem !important;
    min-width: 13rem !important;
  }
  padding: 2rem 1rem; 

  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 0 1.5rem;
  }
  @media (min-width: 992px) {
    padding: 3rem 3rem 0 3rem;
  }

  .container {
  text-align: center;
} 
`;
