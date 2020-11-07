import React, { useEffect, useState } from 'react'
import {
  CButton,
  CAlert,
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
import { useSelector } from 'react-redux'
import { CenteredLayout } from 'containers';
import { Redirect } from 'react-router-dom'
import api from 'utils/api'
import { LoadingButton } from 'reusable';
const ForgotPassword = (props) => {
  let { history } = props;
  let isLoggedIn = useSelector(state => {
    return state.appState.auth.already_logged
  })
  const [show, toggleShow] = useState(false)
  const [email, setEmail] = useState('')
  const [isLoading, setLoading] = useState(false)
  const validate = async () => {
    if (!email) {
      toggleShow(true)
    }
    setLoading(true)
    let res = await api.post("/forgotPassword", { email })
    setLoading(false)
    console.log(res.message)
  }


  if (isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <CenteredLayout>
      <CForm>
        <h1>Forgot Password</h1>
        {show &&
          <CAlert onShowChange={(e) => {
            toggleShow(e)
          }} fade color="danger" closeButton>
            <ul className="mt-3">
              Email is required.
            </ul>
          </CAlert>}
        <CInputGroup className="mb-3 mt-3">
          <CInputGroupPrepend>
            <CInputGroupText>@</CInputGroupText>
          </CInputGroupPrepend>
          <CInput type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Input registered email" value={email || ""} autoComplete="email" />
        </CInputGroup>
        <LoadingButton {...{ block: true, isLoading, submit: validate, btnText: 'Submit' }} />
        <CRow>
          <CCol xs="6">
          </CCol>
          <CCol xs="6" className="text-right px-0">
            <CButton className="float-right" color="link" onClick={() => {
              history.push("/login")
            }}>Back to Login</CButton>
          </CCol>
        </CRow>
      </CForm>
    </CenteredLayout>
  )
}

export default ForgotPassword
