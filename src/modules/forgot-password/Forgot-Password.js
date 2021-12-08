import React, { useEffect, useState, useRef } from 'react'
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
import validator from 'utils/helpers/validator'
import { LoadingButton } from 'reusable';
const requiredMessage = "Email is required.";
const ForgotPassword = (props) => {
  let saved = sessionStorage.getItem("email")
  let { history } = props;
  let isLoggedIn = useSelector(state => {
    return state.appState.auth.already_logged
  })
  const [show, toggleShow] = useState(false)
  const [email, setEmail] = useState(saved ? saved : '')
  const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(false)
  sessionStorage.clear()
  const validate = async () => {
    return
    if (!email) {
      setError(requiredMessage)
      return toggleShow(true)
    }

    if (!validator.isEmail(email)) {
      setError("Invalid email")
      return toggleShow(true)
    }

    setLoading(true)
    let res = await api.post("/forgotPassword", { email })
    setLoading(false)
    if (res.error) {
      setError(res.message);
      return toggleShow(true)
    } else {
      sessionStorage.setItem("onOTP", true);
      sessionStorage.setItem("email", email);
      history.push("/account-recovery/otp")
    }
  }

  if (isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <CenteredLayout>
      <CForm onSubmit={(e) => {
        e.preventDefault()
      }}>
        <h1>Forgot Password</h1>
        {show &&
          <CAlert onShowChange={(e) => {
            toggleShow(e)
          }} fade color="danger" closeButton>
            {error}
          </CAlert>}
        <CInputGroup className="mb-3 mt-3">
          <CInputGroupPrepend>
            <CInputGroupText>@</CInputGroupText>
          </CInputGroupPrepend>
          <CInput type="email"
            disabled={isLoading}
            onChange={(e) => {
              setEmail(e.target.value);
              toggleShow(false)
            }} placeholder="Input registered email" value={email || ""} autoComplete="email" />
        </CInputGroup>
        <LoadingButton   {...{ block: true, isLoading, submit: validate, btnText: 'Submit' }} />
        <CRow>
          <CCol xs="6">
          </CCol>
          <CCol xs="6" className="text-right px-0">
            <CButton disabled={isLoading} className="float-right" color="link" onClick={() => {
              history.push("/login")
            }}>Back to Login</CButton>
          </CCol>
        </CRow>
      </CForm>
    </CenteredLayout>
  )
}

export default ForgotPassword
