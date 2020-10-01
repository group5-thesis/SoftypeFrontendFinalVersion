import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { CButton, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react'

const Modal = forwardRef(({title, footer, size, centered, modalOnClose, children, btnTitle, cancelBtnTitle = "cancel", block, hidden = false , theme = "primary"} , ref) => {
    const [modal, setModal] = useState(false)
    // let { title, footer, size, centered, modalOnClose, children, btnTitle,  = "cancel", block, hidden = false } = props
    const toggle = () => {
        setModal(!modal)
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
            {!hidden && <CButton block={block ? true : false} onClick={toggle} color={theme} >
                {btnTitle ? btnTitle : title}
            </CButton>}

            <CModal show={modal} centered={centered ? true : false} size={size} closeOnBackdrop={false} onClose={() => {
                if (modalOnClose) {
                    modalOnClose()
                }
            }
            } className="fade" >
                <CModalHeader ><strong>{title}</strong></CModalHeader>
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
                        if (modalOnClose) {
                            modalOnClose();
                        }
                    }} className="mr-1" color="danger">
                        {cancelBtnTitle}
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    )
})

export default Modal
