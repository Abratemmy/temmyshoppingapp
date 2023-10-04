import React, { useState } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap';
import './ToastMessage.css'

function ToastMessage({ bg, title, body }) {
    const [show, setShow] = useState(true)
    return (
        <div>
            <ToastContainer position='top-right' className='toast-container'>
                <Toast bg={bg} onClose={() => setShow(false)} show={show} delay={3000} autohide>
                    <Toast.Header>
                        <strong className='me-auto'>{title}</strong>
                        <small>now</small>
                    </Toast.Header>
                    <Toast.Body>
                        {body}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}

export default ToastMessage