import React from 'react'

const ChatLoader = () => {
    return (
        <div>
            <div className="position-absolute top-50 start-50 translate-middle">
                <div className="d-flex justify-content-center" >
                    <div className="spinner-border" style={{ width: "4rem", height: "4rem", zIndex: "100" }} role="status" >
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatLoader