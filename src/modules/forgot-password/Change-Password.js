import React, { useState, useRef } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CLabel,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CFormGroup,
  CInputCheckbox,
  CRow,
  CAlert
} from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { CenteredLayout } from 'containers';
import Icon from '@mdi/react'
import { mdiKey, mdiEye } from '@mdi/js'
import Func from 'utils/helpers/validator'
import Consts from 'utils/helpers/Consts'
import { LoadingButton } from 'reusable';
import colors from 'assets/theme/colors';
import api from 'utils/api'
import { actionCreator, ActionTypes } from "utils/actions";
const ChangePassword = (props) => {
  let { history } = props;
  let user = useSelector(state => {
    return state.appState.auth.user
  })
  const dispatch = useDispatch();
  const email = sessionStorage.getItem('email') !== null ? sessionStorage.getItem('email') : '0';
  const _isOTP = sessionStorage.getItem('_isOTP');
  const [currentPassword, setCurrentPassword] = useState(user && user.is_password_changed == 0 ? 'Softype@100' : '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, toggleLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [show, toggleShow] = useState(false);
  const [showPassword, toggleShowPassword] = useState(false);


  if (!_isOTP && !user) {
    history.push("/login")
  }

  const submit = async () => {
    let payload = {
      current_password: currentPassword,
      new_password: newPassword,
      isOtp: 0,
      userId: null
    }
    //
    if (user) {
      payload["userId"] = user.userId;
    } else {
      payload['isOtp'] = 1;
      payload["email"] = email;
    }

    return
    toggleLoading(true);
    let res = await api.post("/changePassword", payload)
    toggleLoading(false)

    if (res.error) {
      setErrors([{ message: res.message }])
      toggleShow(true)
    } else {
      sessionStorage.clear();
      if (_isOTP && email) {
        localStorage.clear();
        return history.push('/login');
      }
      sessionStorage.clear();
      if (user?.is_password_changed === 0) {
        //
        let res1 = await api.get(`/getProfile?userId=${user.userId}`)
        let newUser = res1.data[0]
        //;
        dispatch(actionCreator(ActionTypes.FETCH_PROFILE_SUCCESS, newUser))
        return history.push('/dashboard');

      }
      history.push('/my-account');
    }
    setErrors([{ message: res.message }])
    return toggleShow(true)
  }
  const validate = () => {
    toggleShow(false)
    setErrors([])
    const messageRequired = "Inputs are required"
    let isFilled = newPassword !== '' && confirmPassword !== '';
    if (!isFilled) {
      setErrors([{ message: messageRequired }])
      return toggleShow(true)
    }
    if (!_isOTP) {
      if (currentPassword === '') {
        setErrors([{ message: messageRequired }])
        return toggleShow(true)
      }
    }
    if (newPassword !== confirmPassword) {
      setErrors([{ message: "Passwords don't match" }])
      return toggleShow(true)
    }
    let validation = Func.validate(newPassword, Consts.password_criteria, errors)
    if (!validation.ok && validation.errors.length) {
      setErrors(validation.errors)
      return toggleShow(true)
    }
    submit();
  }

  return (
    <CenteredLayout md={5}>
      <CForm className="mx-2 my-2" onSubmit={(e) => { e.preventDefault(); }}>
        <h1>Change Password</h1>
        {
          show &&
          <CAlert onShowChange={(e) => {
            toggleShow(e)
            !e && setErrors([])
          }} fade color="danger" closeButton>
            <ul className="mt-3">
              {errors.map(({ message }, id) => {
                return <li key={id}>{message}</li>
              })}
            </ul>
          </CAlert>
        }
        {
          user && user.is_password_changed === 0 && <CAlert color="warning" className="text-center">
            You are required to change your password.
            Please choose a new password.
          </CAlert>
        }
        <input id="userName" name="username" hidden />
        {
          (_isOTP === null || !user?.is_password_changed === 0) && <CInputGroup className="mb-3 mt-3">
            <CInputGroupPrepend>
              <CInputGroupText>
                <Icon path={mdiKey} size={0.9} color={colors.$grey_dark} />
              </CInputGroupText>
            </CInputGroupPrepend>
            <CInput disabled={isLoading} type={showPassword ? "text" : "password"} value={currentPassword} onChange={(e) => {
              let { value } = e.target;
              setCurrentPassword(value)
            }} placeholder="current password" />
          </CInputGroup>
        }

        <CInputGroup className="mb-3 mt-3">
          <CInputGroupPrepend>
            <CInputGroupText>
              <Icon path={mdiKey} size={0.9} color={colors.$grey_dark} />
            </CInputGroupText>
          </CInputGroupPrepend>
          <CInput disabled={isLoading} type={showPassword ? "text" : "password"} value={newPassword} onChange={(e) => {
            let { value } = e.target;
            setNewPassword(value)
          }} placeholder="new password" />
        </CInputGroup>
        <CInputGroup className="mb-3 mt-3">
          <CInputGroupPrepend>
            <CInputGroupText> <Icon path={mdiKey} size={0.9} color={colors.$grey_dark} /></CInputGroupText>
          </CInputGroupPrepend>
          <CInput disabled={isLoading} type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => {
            let { value } = e.target;
            setConfirmPassword(value)
          }} placeholder="confirm new password" />
        </CInputGroup>
        <CFormGroup variant="checkbox" className="checkbox my-2">
          <CInputCheckbox
            onChange={(e) => {
              toggleShowPassword(!showPassword)
            }}
            name="showPassword"
            value={showPassword}
          />
          <CLabel variant="checkbox" className="form-check-label" htmlFor="showPassword">show password</CLabel>
        </CFormGroup>
        <LoadingButton  {...{ block: true, isLoading, submit: validate, btnText: 'Submit' }} />
        <CRow>
          <CCol xs="6">
          </CCol>
          <CCol xs="6" className="text-right px-0">
            <CButton disabled={isLoading} className="float-right" color="link" onClick={() => {
              history.push("/myAccount")
            }}>Back</CButton>
          </CCol>
        </CRow>
      </CForm>
    </CenteredLayout>
  )
}

export default ChangePassword
