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
                                <CLabel htmlFor="nf-email">Name</CLabel>
                                <CInput
                                    type="name"
                                    id="nf-name"
                                    name="nf-name"
                                    placeholder="Enter Name"
                                    autoComplete="name"
                                />
                                <CFormText className="help-block">Please enter your name</CFormText>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="nf-email">Role</CLabel>
                                <CInput
                                    type="role"
                                    id="nf-role"
                                    name="nf-role"
                                    placeholder="Enter Role.."
                                    autoComplete="role"
                                />
                                <CFormText className="help-block">Please enter role</CFormText>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="nf-password">Status</CLabel>
                                <CInput
                                    type="status"
                                    id="nf-status"
                                    name="nf-status"
                                    placeholder="Enter Status.."
                                    autoComplete="status"
                                />
                                <CFormText className="help-block">Please enter status</CFormText>
                            </CFormGroup>
                        </CForm>
                    </CCol>
                </CRow>
            </CContainer>
        </Modal>
    )
}

export default Usermodal;