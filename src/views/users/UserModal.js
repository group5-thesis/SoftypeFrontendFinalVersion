import React, { useState } from 'react'
import { CButton, CModal, CRow, CCol, CModalBody, CModalHeader, CModalFooter, CContainer, CForm, CFormGroup, CLabel, CInput, CFormText, } from '@coreui/react'

const Usermodal = () => {
    const [modal, setModal] = useState(true);

    const toggle = () => {
        setModal(!modal);
    }
    return (
        <CModal
            className="fade"
            show={modal}
            onClose={toggle}
        >
            <CModalHeader closeButton>Modal title</CModalHeader>
            <CContainer fluid>
                <CRow>
                    <CCol sm="12">
                        <CForm action="" method="post">
                            <CFormGroup>
                                <CLabel htmlFor="nf-email">Email</CLabel>
                                <CInput
                                    type="email"
                                    id="nf-email"
                                    name="nf-email"
                                    placeholder="Enter Email.."
                                    autoComplete="email"
                                />
                                <CFormText className="help-block">Please enter your email</CFormText>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="nf-password">Password</CLabel>
                                <CInput
                                    type="password"
                                    id="nf-password"
                                    name="nf-password"
                                    placeholder="Enter Password.."
                                    autoComplete="current-password"
                                />
                                <CFormText className="help-block">Please enter your password</CFormText>
                            </CFormGroup>
                        </CForm>
                    </CCol>
                </CRow>
            </CContainer>

            {/* <CModalBody>
          Lorem ipsum dolor...
        </CModalBody> */}
            <CModalFooter>

                <CButton
                    color="secondary"
                    onClick={toggle}
                >Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default Usermodal;