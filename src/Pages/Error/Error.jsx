import React from 'react'
import { useNavigate } from 'react-router-dom'
import errorpagebg from '../../assets/images/errorpage.gif'
import './Error.css'
const Error = () => {
    const navigate = useNavigate();
    return (
        <div>
            <section className="page_404 w-100">
                <div className="container">
                    <div className="row m-0">
                        <div className="col-sm-12 ">
                            <div className=" text-center">
                                <div className="four_zero_four_bg" style={{ backgroundImage: `url(${errorpagebg})` }}>
                                    <h1 className="text-center ">404</h1>


                                </div>

                                <div className="contant_box_404">
                                    <h3 className="h2">
                                        Look like you're lost
                                    </h3>
                                    <p>the page you are looking for is not avaible!</p>
                                    <a className="link_404" onClick={() => navigate(-1)}>Go to Home</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Error