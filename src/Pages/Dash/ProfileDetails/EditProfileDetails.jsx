import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import styled from 'styled-components';
import RadioInput from '../../../Components/Common/RadioInput';
import { api } from '../../../url';
function EditProfileDetails({ data, dp }) {
  console.log(data.age);
  var newDate = '';
  if (data.age) {
    var agea = data.age;
    agea = new Date(agea);
    let year = agea.getFullYear();
    let month = (1 + agea.getMonth()).toString().padStart(2, '0');
    let day = agea.getDate().toString().padStart(2, '0');
    // newDate = year + '-' + month + '-' + day - 1;
    newDate = data.age;
  }

  console.log(newDate);
  var dtToday = new Date();
  var c_month = dtToday.getMonth() + 1;
  var c_day = dtToday.getDate() - 1;

  var c_year = dtToday.getFullYear();
  if (c_month < 10) c_month = '0' + c_month.toString();
  if (dtToday.getDate() == 1) {
    c_day = 30;
    c_month = c_month - 1;
  }
  if (c_day < 10) c_day = '0' + c_day.toString();

  var maxDate = c_year + '-' + c_month + '-' + c_day;

  const [selectVal, setSelectVal] = useState(data.gender);
  const [name, setName] = useState(data.name);
  // const [dp, setDp] = useState(data.dp);
  const [age, setAge] = useState(newDate);
  const [community, setCommunity] = useState(data.community);
  const [relationshipstats, setRelationshipstats] = useState(data.relationshipstats);
  const [country, setCountry] = useState(data.country);
  const [description, setDescription] = useState(data.description);
  const [teachCity, setTeachCity] = useState(data.teach_city);

  const UpdateProfilePercent = (res) => {
    let data = res.data.data[0];
    if (data.description === 'null' || data.description === null || data.description < 1) {
      return 0;
    } else if (data.dp === null) {
      return 0;
    } else if (data.profile_complete === 100) {
      return 0;
    } else {
      console.log('Bio updated');
      axios
        .post(`${api}UpdateProfilePercent`, {
          email_id: data.email_id,
          percent: '100'
        })
        .then((res) => {
          NotificationManager.success(
            'Congratulations! You have earned 1 koobo on completing your profile.',
            'Success',
            3000
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const changeHandler = (e) => {
    if (e.target.name == 'name') {
      setName(e.target.value);
    }
    if (e.target.name == 'nationality') {
      setCommunity(e.target.value);
    }
    if (e.target.name == 'teach_city') {
      setCommunity(e.target.value);
      setTeachCity(e.target.value);
    }
    if (e.target.name == 'age') {
      setAge(e.target.value);
    }
    if (e.target.name == 'country') {
      setCountry(e.target.value);
    }
    if (e.target.name == 'relationshipstats') {
      setRelationshipstats(e.target.value);
    }
    if (e.target.name == 'description') {
      setDescription(e.target.value);
    }
  };

  function submitHandler() {
    let formData = new FormData();
    if (name && name.length > 30) {
      alert('Name not accepting more than 30 character length');
      return false;
    } else if (community && community.length > 30) {
      alert('Field not accepting more than 30 character length');
      return false;
    } else if (teachCity && teachCity.length > 30) {
      alert('City not accepting more than 30 character length');
      return false;
    } else if (country && country.length > 30) {
      alert('Location not accepting more than 30 character length');
      return false;
    } else if (relationshipstats && relationshipstats.length > 30) {
      alert('Relationship not accepting more than 30 character length');
      return false;
    } else if (description && description.length > 30) {
      alert('Bio not accepting more than 30 character length');
      return false;
    }
    formData.append('email_id', data.email_id);
    formData.append('gender', selectVal);
    formData.append('name', name);
    if (dp != '') {
      formData.append('dp', dp);
    }
    formData.append('age', age);
    formData.append('community', community);
    formData.append('nationality', community);
    formData.append('relationshipstats', relationshipstats);
    formData.append('country', country);
    formData.append('teach_city', teachCity);
    formData.append('description', description);
    axios
      .post(`${api}UpdateProfileUser`, formData)
      .then((res) => {
        if (res.data.status == 'success') {
          NotificationManager.success('Profile has been updated!', 'Success', 3000);
          console.log(res);
          const data = res.data;
          localStorage.setItem('all_data', JSON.stringify(res.data.data));
          UpdateProfilePercent(res);
          window.location.reload();
        }
        if (res.data.status == 'failed') {
          NotificationManager.info('Nothing To Updated!', 'Oops!', 3000);
        }
        // getUser();
      })
      .catch((err) => console.log(err));
  }

  return (
    <StyledEditProfileDetails className="userDetailPanel-body-item">
      <EditProfileFormInput
        label="Name"
        setName={setName}
        type="text"
        name="name"
        changeHandler={changeHandler}
        defaultValue={data.name ? data.name : 'N/A'}
      />
      <EditProfileFormInput
        label="Email"
        type="email"
        name="email"
        disabled="disabled"
        changeHandler={changeHandler}
        defaultValue={data.email_id ? data.email_id : 'N/A'}
      />
      <EditProfileFormInput
        label="Gender"
        type="radio"
        setSelectVal={setSelectVal}
        changeHandler={changeHandler}
        defaultValue={data.gender ? data.gender : ''}
      />
      <EditProfileFormInput
        label="Nationality"
        setCommunity={setCommunity}
        name="nationality"
        changeHandler={changeHandler}
        defaultValue={data.nationality ? data.nationality : 'N/A'}
      />
      <EditProfileFormInput
        label="Ethnicity"
        name="teach_city"
        changeHandler={changeHandler}
        defaultValue={data.community ? data.community : 'N/A'}
      />
      <p className="fw-bold p-0 m-0">DOB</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          inputFormat="MM/DD/YYYY"
          maxDate={new Date()}
          name="age"
          className="mb-4 w-100"
          value={age}
          onChange={(e) => setAge(e)}
          renderInput={(params) => <TextField variant="standard" {...params} />}
        />
      </LocalizationProvider>
      {/* <EditProfileFormInput
        label="Date of Birth"
        type="date"
        name="age"
        changeHandler={changeHandler}
        defaultValue={data.age ? data.age : 'N/A'}
        max={maxDate}
      /> */}
      <EditProfileFormInput
        label="Location"
        name="country"
        changeHandler={changeHandler}
        defaultValue={data.country ? data.country : 'N/A'}
      />
      <EditProfileFormInput
        label="Relationship"
        name="relationshipstats"
        changeHandler={changeHandler}
        defaultValue={data.relationshipstats ? data.relationshipstats : 'N/A'}
      />
      <EditProfileFormInput
        label="Bio"
        name="description"
        changeHandler={changeHandler}
        defaultValue={data.description ? data.description : 'N/A'}
      />

      <Button
        className="btn savebtn"
        style={{ borderRadius: '20px', width: '83%', height: '50px' }}
        onClick={() => submitHandler()}>
        Save
      </Button>
    </StyledEditProfileDetails>
  );
}

export default EditProfileDetails;

const StyledEditProfileDetails = styled.div`
  padding: 0 2rem;
  .savebtn {
    color: #ffffff;
    border-radius: '20px';
    width: '50%';
    height: '60px';
    background-color: #f19c00;
    border-color: #f19c00;
    /* margin-left: 2rem; */
    margin-top: 4rem;
  }
`;
const EditProfileFormInput = ({
  label,
  type,
  defaultValue,
  setSelectVal,
  name,
  changeHandler,
  max
}) => {
  let inputComponent = null;
  switch (type) {
    case 'email':
      inputComponent = (
        <StyledEditProfileInput
          name={name}
          onChange={(e) => changeHandler(e)}
          type="text"
          value={defaultValue}
        />
      );
      break;
    case 'radio':
      return (
        <StyledEditProfileFormInput className="userDetailPanel-body-item d-flex">
          <StyledEditProfileLabel className="font-roboto">{label}</StyledEditProfileLabel>
          <div className="d-flex ms-5">
            <RadioInput
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' }
              ]}
              selectedVal={defaultValue == 'Female' ? 'female' : 'male'}
              setSelectVal={setSelectVal}
            />
          </div>
        </StyledEditProfileFormInput>
      );
    case 'date':
      return (
        <StyledEditProfileFormInput
          className="userDetailPanel-body-item d-flex justify-content-between"
          style={{
            padding: '0 0 1.5rem 0',
            borderBottom: '1px solid #ddd'
          }}>
          <StyledEditProfileLabel className="font-roboto">{label}</StyledEditProfileLabel>
          <div className="d-flex me-4">
            {/*<StyledDate className="text">DD/MM/YYYY</StyledDate>*/}
            <StyledDate className="text">
              <input
                type="date"
                max={max}
                className="form-control"
                onChange={(e) => changeHandler(e)}
                name={name}
                defaultValue={defaultValue}
                // onChange={(e) => setAge(e.target.value)}
              />
            </StyledDate>
          </div>
        </StyledEditProfileFormInput>
      );
    default:
      inputComponent = (
        <StyledEditProfileInput
          type="text"
          name={name}
          onChange={(e) => changeHandler(e)}
          defaultValue={defaultValue}
        />
      );
  }

  return (
    <StyledEditProfileFormInput className="userDetailPanel-body-item">
      <StyledEditProfileLabel className="font-roboto">{label}</StyledEditProfileLabel>
      {inputComponent}
    </StyledEditProfileFormInput>
  );
};

const StyledEditProfileFormInput = styled.div`
  margin-bottom: 2rem;
`;

const StyledEditProfileLabel = styled.label`
  font-weight: bold;
`;
const StyledEditProfileInput = styled.input`
  border: 0;
  border-bottom: 1px solid #00000029;
  outline: none;
  display: block;
  width: 100%;
`;

const StyledDate = styled.div`
  color: #8f8f8f;
`;
