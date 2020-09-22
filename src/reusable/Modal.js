import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { CButton, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';

const Modal = forwardRef((props, ref) => {
    const [modal, setModal] = useState(false);
    let { title, footer,color="primary", modalOnClose, children } = props;
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
            <CButton onClick={toggle} className="mr-1" color={color}>
                {title}
            </CButton>
            <CModal show={modal} closeOnBackdrop={false} onClose={() => {
                if(modalOnClose) modalOnClose()
            }} className="fade" >
                <CModalHeader closeButton><strong>{title}</strong></CModalHeader>
                <CModalBody>
                    {children}
                </CModalBody>
                <CModalFooter>
                    {footer}
                    {/* <CButton onClick={() => {
                        toggle();
                        if  (modalOnClose){
                            modalOnClose();
                        }
                    }} className="mr-1" color="warning">
                        Add
                    </CButton> */}
                    <CButton onClick={() => {
                        toggle();
                        if  (modalOnClose){
                            modalOnClose();
                        }
                    }} className="mr-1" color="danger">
                        Cancel
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    )
})

export default Modal;       