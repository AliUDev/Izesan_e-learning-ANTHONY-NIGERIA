import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Heading from '../../../Components/Common/Heading';
import { api } from '../../../url';
import UserCard from './UserCard1';

function Users() {
  const [items, setItems] = useState();
  const [data, setData] = useState(false);
  const [err, setErr] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    getData1(1);

  }, []);

  function handlePageChange(event) {
    console.log(`active page is ${event.selected}`);
    getData1(event.selected + 1);
  }

  function showSearchHandler(e) {
    e.preventDefault();
    var searchVal = e.target.value;
    getData1(0, searchVal);
  }

  function getData1(offset, searchVal = '') {
    var URL = `${api}ViewUsers?email_id=${localStorage.getItem('email_id')}&page=` + offset;
    // if (searchVal != '') {
    URL =
      `${api}ViewUsers?email_id=${localStorage.getItem('email_id')}&page=` +
      offset +
      '&name=' +
      searchVal;
    // }
    axios
      .get(URL)
      .then((res) => {
        setData(res.data.data.data);
        setTotalPages(res.data.data.last_page);
        //setgetAllData(res.data.data);
      })
      .catch((err) => console.log(err));
  }

  const navigate = useNavigate()

  return (
    <StyledLayout>
      <div className='row w-100'>
        <div className='col-1'>
          <ArrowLeftShort className="fs-1 text-warning" style={{ cursor: "pointer" }} onClick={() => navigate(-1)} />
        </div>
        <div className='col-10'>
          <Heading title="Users" className='text-center fs-3 text-decoration-underline fw-bold mb-4' />
        </div>
      </div>
      <div className="search-bar w-100 mb-3">
        <input
          type="search"
          placeholder="Search Member"
          onChange={(e) => showSearchHandler(e)}
          className="form-control m-2"
        />
      </div>
      <Container fluid="sm">
        <Row className=" userrow w-100 pt-5  ">
          {data &&
            data.length > 0 &&
            data.map((item) => {
              return <UserCard key={item.id} item={item} />;
            })}

          <div className='d-flex align-items-center justify-content-center'>
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
            // forcePage="14"
            />
          </div>
        </Row>
      </Container>
    </StyledLayout>
  );
}

export default Users;

const StyledLayout = styled.div`
  padding: 2rem 1rem;

  margin-left: 4%;

  .userrow {
    flex: 1;
    padding-right: 0;
    justify-content: center;
  }

  @media (min-width: 455px) {
    .userrow {
      justify-content: space-between;
    }
  }
  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 0 1.5rem;
  }
  @media (min-width: 992px) {
    padding: 3rem 3rem 0 3rem;
  }
`;
