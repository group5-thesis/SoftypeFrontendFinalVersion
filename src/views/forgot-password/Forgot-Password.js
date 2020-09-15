import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'

const Register = (props) => {
  let { history } = props;
  return (
    <div className="c-app c-default-layout flex-row align-items-center login-page">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Forgot Password</h1>
                  <CInputGroup className="mb-3 mt-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="email" placeholder="Input registered email" autoComplete="email" />
                  </CInputGroup>
                  <CButton color="primary" block>Submit</CButton>
                  <CRow>
                    <CCol xs="6">
                    </CCol>
                    <CCol xs="6" className="text-right">
                      <CButton className="float-right" color="link" onClick={() => {
                        history.push("/login")
                      }} className="px-0">Back to Login</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
