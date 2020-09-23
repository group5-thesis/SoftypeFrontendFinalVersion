import React, { useState, useEffect } from "react"
import {
  CButton,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CSpinner,
  CInvalidFeedback,
} from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { useDispatch } from "react-redux"
import { shallowCopy, toggleDialog, checkCamera } from "utils/helpers"
import { APP_MESSAGES } from "utils/constants/constant"
import { actionCreator, ActionTypes } from "utils/actions"
import { ConfirmDialog, Modal } from "reusable"
import api from "utils/api"
import { CenteredLayout } from "containers"
import QrCodeScanner from './QrCodeScanner'

const Login = (props) => {
  // stateless variables
  let { history } = props
  const [credentials, setCredentials] = useState({
    username_email: "ytorres",
    password: "Softype@100",
  })
  const [camera, setCamera] = useState(false)
  const [changed, setChanged] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  // methods
  const handleChange = (e) => {
    setChanged(true)
    let copy = shallowCopy(credentials)
    copy[e.target.name] = e.target.value
    setCredentials(copy)
  }

  const loginAttempt = async () => {
    if (credentials.password === "" || credentials.username_email === "") {
      setError(APP_MESSAGES.INPUT_REQUIRED)
      toggleDialog(dispatch)
      return
    }
    setIsLoading(true)
    dispatch(actionCreator(ActionTypes.FETCH_PROFILE_PENDING))
    let res = await api.post("/login", credentials)
    if (!res.error) {
      setError(res.message)
      let { access_token, account_information } = res.data
      localStorage.setItem("token", access_token)
      localStorage.setItem("uId" ,  account_information.employee_id)
      dispatch(actionCreator(ActionTypes.FETCH_PROFILE_SUCCESS, account_information))
      dispatch(actionCreator(ActionTypes.LOGIN))
    } else {
      setError(res.message)
      toggleDialog(dispatch)
    }
    setIsLoading(false)
  }

  // const loginWithQrCode = () => {
  //   checkCamera().then(() => {
  //     setCamera(true)
  //   }).catch(err => {
  //     setCamera(false)
  //     setError(err.cameraError)
  //     toggleDialog(dispatch)
  //   })
  // }
  useEffect( () => {

    checkCamera().then(() => {
      setCamera(true)
    }).catch(err => {
      setCamera(false)
      setError(err.cameraError)
    })
  }, [])
  return (
    <CenteredLayout>
      <ConfirmDialog
        id="cutom_dialog"
        {...{
          title: error,
          cancelButtonText: "Ok",
          confirmButton: false
        }}
      ></ConfirmDialog>
      <CForm>
        <h1>Login</h1>
        <p className="text-muted">Sign In to your account</p>
        <CInputGroup className="mb-3">
          <CInputGroupPrepend>
            <CInputGroupText>
              <CIcon name="cil-user" />
            </CInputGroupText>
          </CInputGroupPrepend>
          <CInput
            type="text"
            value={credentials.username_email || ""}
            placeholder="email/username"
            name="username_email"
            autoComplete="email"
            invalid={credentials.username_email === "" && changed}
            onChange={handleChange}
          />
          <CInvalidFeedback className="help-block">
            {APP_MESSAGES.INPUT_REQUIRED}
          </CInvalidFeedback>
        </CInputGroup>
        <CInputGroup className="mb-4">
          <CInputGroupPrepend>
            <CInputGroupText>
              <CIcon name="cil-lock-locked" />
            </CInputGroupText>
          </CInputGroupPrepend>
          <CInput
            type="password"
            value={credentials.password || ""}
            placeholder="Password"
            name="password"
            autoComplete="current-password"
            onChange={handleChange}
            invalid={credentials.password === "" && changed}
          />
          <CInvalidFeedback className="help-block">
            {APP_MESSAGES.INPUT_REQUIRED}
          </CInvalidFeedback>
        </CInputGroup>
        <CButton
          block
          onClick={loginAttempt}
          disabled={
            isLoading ||
            credentials.password === "" ||
            credentials.email === ""
          }
          color="primary"
          className="px-4"
        >
          {isLoading ? (
            <CSpinner color="secondary" size="sm" />
          ) : (
              "Login"
            )}
        </CButton>
        <hr className="hr-text" data-content="OR" />
        {
          !camera ? <CButton block onClick={() => {
            toggleDialog(dispatch)
          }} color="primary" className="px-4" > Login with QRCode  </CButton> : <QrCodeScanner />
        }

        <CButton block className="float-center" color="link" onClick={() => {
          history.push("/account-recovery")
        }}>Forgot password</CButton>
      </CForm>
    </CenteredLayout>
  )
}

export default Login
