import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import React from 'react';
import styled from 'styled-components';
const NoInternet = () => {
    return (
        <StyledNoInterntParent style={{ zIndex: '999' }} className="position-fixed top-0 start-50 translate-middle-x">
            <FiberManualRecordIcon className='text-danger' /><p className='p-0 m-0'>You lost your internet connection!</p>
        </StyledNoInterntParent>
    )
}

export default NoInternet

const StyledNoInterntParent = styled.div`
display: flex;
   width: 50%;
   justify-content: center;
   background-color: #202020;
   padding: 3px 0;
   color: white;
   text-align: center;
   border-radius: 0 0 10px 10px;

`
