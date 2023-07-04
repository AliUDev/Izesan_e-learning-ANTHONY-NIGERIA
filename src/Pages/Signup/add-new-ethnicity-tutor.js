import axios from 'axios';
import { useState } from 'react';
import { api } from '../../url';
import './alert.css';
const AddNewEthnicityTutor = ({
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

    if (newEth.length > 30) {
      alert('Language not accepting more than 30 character length');
      return false;
    }

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
        setNewEth('');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="p-5">
      <div
        className={addNewEthPopup ? 'diabled_popup_click show p-4' : 'diabled_popup_click'}></div>
      <div
        className={
          addNewEthPopup
            ? 'popup center active ethnicity_popup p-4'
            : 'popup center ethnicity_popup'
        }>
        {/*<div*/}
        {/*  className="cros askSession_cros"*/}
        {/*  style={{ textAlign: 'right', cursor: 'pointer' }}*/}
        {/*  onClick={() => setAddNewEthPopup(false)}>*/}
        {/*  X*/}
        {/*</div>*/}
        <div className="title">Add New Laguage</div>
        <div className="ask-session-body">
          <form>
            <div className="form-group">
              <input
                onChange={(e) => setNewEth(e.target.value)}
                className="form-control font-weight-bold mt-4"
                placeholder="Add Language"
                value={newEth}
              />
            </div>
            <div className="form-group mt-3">
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

export default AddNewEthnicityTutor;
