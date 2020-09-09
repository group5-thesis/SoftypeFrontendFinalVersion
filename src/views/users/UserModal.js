import React, { useState } from 'react'
import { CButton, CModal, CRow, CCol, CModalBody, CModalHeader, CModalFooter, CContainer, CForm, CFormGroup, CLabel, CInput, CFormText, } from '@coreui/react'
import {Modal} from 'reusable'
const Usermodal = () => {
  
    return (
        <Modal {...{
            title: "Add Employee",
            color: "warning"
        }}>

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
        </Modal>
    )
}

export default Usermodal;