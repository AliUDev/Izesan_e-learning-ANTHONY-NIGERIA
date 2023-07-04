import React, { useState } from 'react';
import styled from 'styled-components';
// import profilePicture from '../../../assets/images/pic_2.png';
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { img } from '../../../url';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 330,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 1,
};
function UserCard({ item, active = true, editingProfile, uploadImages01, deleteImages }) {
  function change() {
    uploadImages01();
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [imageState, setimageState] = useState('');

  const OpenImage = (param) => {
    setimageState(param);
    handleOpen();
  }

  return (
    <StyledUserCard className="userProfile">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CancelIcon className='cursor-pointer' onClick={handleClose} />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <img src={`${img}${imageState}`} width="100%" alt="user" />
          </Typography>
        </Box>
      </Modal>
      <div className="imgContainer">
        {editingProfile && item.pc_id && (
          <div
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              if (window.confirm('Are you sure you wish to delete this Picture?'))
                deleteImages(e, item.pc_id);
            }}
            className="cross-indicator text-danger">
            <i className="bi bi-x-circle-fill"></i>
          </div>
        )
        }
        {item.image ? (
          <img src={item.image} onClick={change} alt="user" />
        ) : (
          <img className='cursor-pointer' onClick={() => OpenImage(item.picture)} src={`${img}${item.picture}`} alt="user" />
          // <img src={`${profilePicture}`} alt="user" />
        )}
      </div>
      {active && <span className="online-indicator"></span>}






      <div className="pcontent">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '192px',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0px 10px'
            }}>
            <p
              style={{
                fontWeight: '700',
                fontSize: '15px'
              }}>
              {item?.name}
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '192px',
              justifyContent: 'space-between',
              padding: '0px 10px'
            }}>
            <p
              style={{
                fontWeight: 'Bold',
                fontSize: '14px'
              }}>
              {item?.teaches}
            </p>
            <p
              style={{
                fontWeight: 'Bold',
                fontSize: '14px'
              }}>
              {item?.badge}
            </p>
          </div>
        </div>
      </div>
    </StyledUserCard >
  );
}

export default UserCard;

const StyledUserCard = styled.div`

  .imgContainer {
    width: 100%;
    height: 100%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .online-indicator {
    width: 17px;
    height: 17px;
    background-color: #18e614;
    border-radius: 50px;
    position: absolute;
    right: -5px;
  }
  .cross-indicator {
     margin: 0 0 -25px 4px;
     position: relative;
     
    /*z-index: 100000; */
   /* text-align: center;
    right: 5px;
    top: 3px;
    font-size: 17px; */
  }
`;

