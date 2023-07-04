import React from 'react'
import { Link } from 'react-router-dom'

const CartIcon = () => {
    return (
        <div>
            <Link to="/dweki"><i className="bi bi-arrow-left fs-5 px-3 btn btn-outline-warning  rounded"></i></Link>
        </div>
    )
}

export default CartIcon