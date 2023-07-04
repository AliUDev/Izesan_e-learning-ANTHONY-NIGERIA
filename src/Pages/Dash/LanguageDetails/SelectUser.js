import { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../../../url';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';

const SelectUser = ({ memberPopup, setMemberPopup, setuserIds }) => {
  const [data, setData] = useState(false);
  const [err, setErr] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [check, setCheck] = useState({
    recipes: []
  });
  useEffect(() => {
    getData1(1);
  }, []);

  function handlePageChange(event) {
    console.log(`active page is ${event.selected}`);
    getData1(event.selected + 1);
  }

  function getData1(offset, searchVal = '') {
    console.log(offset + '---' + searchVal);
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
  function kHandler(e) {
    if (e.target.checked == true) {
      setCheck({
        recipes: [...check.recipes, e.target.id]
      });
    } else if (e.target.checked == false) {
      check.recipes.map((d, i) => {
        if (d == e.target.id) {
          check.recipes.splice(i, 1);
        }
      });
    }
  }
  function submitHandler(e) {
    e.preventDefault();
    // console.log(check.recipes.toString());
    if (check.recipes != [] && check.recipes.length <= 4 && check.recipes.length != 0) {
      setMemberPopup(false);
      setuserIds(check.recipes.toString());
      localStorage.setItem('userIds', check.recipes.toString());
      setErr(false);
    } else {
      if (check.recipes != []) {
        setErr('select user in given list!');
      }
      if (check.recipes.length > 4) {
        setErr('select only 4 users!!');
      }
    }
  }
  function showSearchHandler(e) {
    e.preventDefault();
    var searchVal = e.target.value;
    getData1(0, searchVal);
  }
  // function showSearchHandler(e) {
  //   e.preventDefault();
  //   if (e.target.value != '') {
  //     let value = e.target.value.replace(/ /g, '').toLowerCase();
  //     let result = [];
  //     result = getAllData.filter((dt) => {
  //       // console.log(dt.name?.replace(/[_]/g, '').replace(/ /g, '').toLowerCase());
  //       if (dt.name && dt.name != null && dt.name != '') {
  //         return dt.name?.replace(/[_]/g, '').replace(/ /g, '').toLowerCase().includes(value);
  //       }
  //     });
  //     if (result != '') {
  //       setData(result);
  //       setErr(false);
  //     } else {
  //       setErr('no data Found!!');
  //       setData('');
  //     }
  //   } else {
  //     getData();
  //   }
  // }
  return (
    <div className="position-relative">
      <div
      // className={
      //   memberPopup ? 'form-group custom_submit_handler show' : 'form-group custom_submit_handler'
      // }
      >
        {/*<button className="btn btn-danger" onClick={(e) => submitHandler(e)}>*/}
        {/*  Submit*/}
        {/*</button>*/}
        {err ? <div className="text-danger">{err}</div> : null}
      </div>
      <div
      // className={memberPopup ? 'popup center select_user active' : 'popup center'}
      >
        <div className="title mt-5">Add Group Member</div>
        <div>
          <div className="search-bar mb-3">
            <input
              type="search"
              placeholder="Search Member"
              onChange={(e) => showSearchHandler(e)}
              className="form-control"
            />
          </div>
          <div className="text-secondary font-weight-bold">Only Select 4 users!</div>
        </div>
        <div className="row gx-5">
          <ul className="list-group" style={{ padding: '25px' }}>
            {data && data.length > 0 ? (
              data.map((item, index) => {
                return (
                  <>
                    {/*<>*/}
                    {/*  <div*/}
                    {/*    className="col-md-6 col-lg-6 col-xl-6 col-sm-6 col-6 margin-auto"*/}
                    {/*    key={index}>*/}
                    {/*    <label htmlFor={item.email_id}>*/}
                    {/*      <div className="card card1">*/}
                    {/*        /!* onClick={(e) => checkHandler(e, item.email_id)} *!/*/}
                    {/*        <input*/}
                    {/*          type="checkbox"*/}
                    {/*          id={item.email_id}*/}
                    {/*          name={index}*/}
                    {/*          onChange={(e) => kHandler(e)}*/}
                    {/*        />*/}
                    {/*        <div className="profile-pic">*/}
                    {/*          {item.dp ? (*/}
                    {/*            <img src={`${img}/${item.dp}`} alt="" />*/}
                    {/*          ) : (*/}
                    {/*            <img src="assets/img/no-profile.png" alt="" />*/}
                    {/*          )}*/}
                    {/*        </div>*/}
                    {/*        <div className="chat-info">*/}
                    {/*          <p className="user-name">*/}
                    {/*            {item.email_id ? item.email_id : 'not specified'}*/}
                    {/*          </p>*/}
                    {/*        </div>*/}
                    {/*      </div>*/}
                    {/*    </label>*/}
                    {/*  </div>*/}
                    {/*</>*/}

                    <li className="list-group-item">
                      <input
                        type="checkbox"
                        id={item.email_id}
                        name={index}
                        onChange={(e) => kHandler(e)}
                      />
                      <label style={{ paddingLeft: '20px' }} labelFor={item.email_id}>
                        {item.email_id ? item.email_id : 'not specified'}
                      </label>
                    </li>
                  </>
                );
              })
            ) : (
              <div>
                <div className="col-md-3 col-sm-3 col-lg-3 col-xl-3 col-3 m-auto">
                  <img src="assets/loader/loader.gif" alt="" className="loader" />
                </div>
              </div>
            )}
          </ul>
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
              // forcePage="14"
            />
          </div>
        </div>
      </div>
      <Modal.Footer>
        <Button variant="success" onClick={(e) => submitHandler(e)}>
          Submit
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default SelectUser;
