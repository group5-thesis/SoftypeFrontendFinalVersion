import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { CButton, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';

const Modal = forwardRef((props, ref) => {
    const [modal, setModal] = useState(false);
    let { title, footer, size, centered, modalOnClose, children } = props;
    const toggle = () => {
        setModal(!modal);
    }
    useImperativeHandle(
        ref,
        () => ({
            toggle() {
                toggle()
            }
        }),
    )
    return (
        <>
            <CButton onClick={toggle} color="primary" >
                {title}
            </CButton>
            <CModal show={modal} centered={centered ? true : false} size={size} closeOnBackdrop={false} onClose={() => {
                if (modalOnClose) {
                    modalOnClose()
                }
            }} className="fade" >
                <CModalHeader closeButton><strong>{title}</strong></CModalHeader>
                <CModalBody>
                    {children}
                </CModalBody>
                <CModalFooter>
                    {footer}
                    <CButton onClick={() => {
                        toggle()
                    }} className="mr-1" color="danger">
                        Cancel
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    )
})

export default Modal;
