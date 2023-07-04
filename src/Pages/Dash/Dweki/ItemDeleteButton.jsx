import axios from 'axios'
import React from 'react'
import styled from 'styled-components'
import { api } from '../../../url'

const ItemDeleteButton = (props) => {
    const deleteItem = (key) => {
        axios.post(`${api}remove-cart/${key}`)
            .then((res) => {
                console.log(res)
                props.handleReload()
            }).catch((err) => {
                console.log(err)
            })
    }
    return (
        <div>
            <ItemDeleteButtonParent>
                <div
                    onClick={() => deleteItem(props.itemKey)}
                    className='remove_from_cart'
                >
                    <i className="bi bi-trash"></i>
                </div>
            </ItemDeleteButtonParent>
        </div>
    )
}

export default ItemDeleteButton

const ItemDeleteButtonParent = styled.div`
.remove_from_cart{
    transition-duration: 240ms;
    width: 38px;
    height: 38px;
    text-align: center;
    padding-top: 7px;
}
.remove_from_cart:hover{
    transform: scale(1.1);
    transition-duration: 300ms;
    border-radius: 50px;
}
`