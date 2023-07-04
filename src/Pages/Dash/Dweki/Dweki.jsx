import React, { useState } from 'react'
import styled from 'styled-components'
import DwekiProducts from './DwekiProducts';
import DwekiTabs from './DwekiTabs'

const Dweki = () => {

    const [filterValue, setfilterValue] = useState('All');
    function handleChildClick(data) {
        setfilterValue(data)
    }
    return (
        <div>
            <DwekiParent>
                <h3 className='text-center'>Dweki</h3>
                <div>
                    <DwekiTabs data={handleChildClick} />
                    <DwekiProducts category={filterValue} />
                </div>
            </DwekiParent>
        </div>
    )
}

export default Dweki

const DwekiParent = styled.div`
`