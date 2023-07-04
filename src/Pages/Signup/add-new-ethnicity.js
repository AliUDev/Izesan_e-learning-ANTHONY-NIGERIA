import { useState } from 'react';
import './alert.css';
import { api } from '../../url';
import axios from 'axios';
const AddNew = ({
  addNewEthPopup,
  setAddNewEthPopup,
  setdropdownItem,
  setCommunity,
  type,
  getEthnicgroups,
  allLang,
  setAllLang
}) => {
  const [newEth, setNewEth] = useState('');
  function submitHandler(e) {
    e.preventDefault();

    axios
      .post(`${api}AddEthnicGroup`, { ethnic_name: newEth })
      .then((res) => {
        if (res.data.status == 'success') {
          if (type == 'tutor') {
            setdropdownItem(newEth);
            setAddNewEthPopup(false);
            setAllLang([...allLang, newEth]);
            if (getEthnicgroups) {
              getEthnicgroups();
            }
          } else {
            setdropdownItem(newEth);
            setCommunity(newEth);
            setAddNewEthPopup(false);
            if (getEthnicgroups) {
              getEthnicgroups();
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <div className={addNewEthPopup ? 'diabled_popup_click show' : 'diabled_popup_click'}></div>
      <div
        className={
          addNewEthPopup ? 'popup center active ethnicity_popup' : 'popup center ethnicity_popup'
        }>
        <div
          className="cros askSession_cros"
          style={{ textAlign: 'right', cursor: 'pointer' }}
          onClick={() => setAddNewEthPopup(false)}>
          X
        </div>
        <div className="title">Add New Ethnicity</div>
        <div className="ask-session-body">
          <form>
            <div className="form-group">
              <input
                onChange={(e) => setNewEth(e.target.value)}
                className="form-control font-weight-bold mt-4"
                placeholder="Add new ethnicity here..."
              />
            </div>
            <div className="form-group mt-3">
              {/*<button onClick={(e) => submitHandler(e)} className="btn btn-danger">*/}
              {/*  Submit*/}
              {/*</button>*/}

              <button
                onClick={() => setAddNewEthPopup(false)}
                className="btn btn-warning"
                style={{ marginRight: '15px' }}>
                Cancel
              </button>
              <button onClick={(e) => submitHandler(e)} className="btn btn-success">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNew;
