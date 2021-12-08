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
import { useSelector, useDispatch } from 'react-redux'
import { CenteredLayout } from 'containers';
import { Redirect } from 'react-router-dom'
import api from 'utils/api'
import { LoadingButton } from 'reusable';
import { ActionTypes, actionCreator } from 'utils/actions';
import validator from 'utils/helpers/validator'
const requiredMessage = "Verification Code is Required.";
const defaultMessage = 'A Verfication Code has been sent to your email.';
const waitMessage = "Please wait...";
const ForgotPassword = (props) => {
    let { history } = props;
    let isLoggedIn = useSelector(state => {
        return state.appState.auth.already_logged
    })
    const email = sessionStorage.getItem('email')
    const onOTP = sessionStorage.getItem('onOTP')
    const [error, setError] = useState()
    const [message, setMessage] = useState(defaultMessage)
    const [show, toggleShow] = useState(false)
    const [sending, toggleSending] = useState(false)
    const [OTP, setOTP] = useState('')
    const [isLoading, setLoading] = useState(false)
    const resendOTP = async () => {
        return
        toggleSending(true)
        setMessage(waitMessage);
        let res = await api.post("/forgotPassword", { email })
        toggleSending(false)
        if (res.error) {
            setMessage(defaultMessage);
            setError(res.message)
            return toggleShow(true)
        } else {
            setMessage(defaultMessage);
        }
        return toggleShow(false)
    }
    const validate = async () => {
        return
        if (message === waitMessage) {
            return
        }
        if (!OTP) {
            setError(requiredMessage);
            return toggleShow(true);
        } else if (!validator.isNumbersOnly(OTP) || OTP.length !== 6) {
            setError("Invalid Verification Code!");
            return toggleShow(true);
        }
        else {
            toggleShow(false)
        }
        setLoading(true)
        setMessage(waitMessage);
        let res = await api.post("/verifyOTP", { email, OTP })

        setLoading(false)
        if (res.error) {
            setMessage(defaultMessage);
            setError(res.message);
            return toggleShow(true);
            // dispatch(actionCreator(ActionTypes.TOGGLE_NOTIFICATION, { type: 'error', message: res.message }));
        } else {
            setMessage(defaultMessage);
            sessionStorage.setItem("_isOTP", true)
            history.push("/change-password")
        }
    }

    if (!email && !onOTP) {
        return <Redirect to="/account-recovery" />
    }

    if (isLoggedIn) {
        return <Redirect to="/" />
    }

    return (
        <CenteredLayout>
            <CForm onSubmit={(e) => {
                e.preventDefault()
            }}>
                <h1>Enter Verification Code</h1>
                <CAlert color={show ? "danger" : "info"}>{show ? error : message}</CAlert>
                <CInputGroup className="mb-3 mt-3">
                    <CInputGroupPrepend>
                        <CInputGroupText><strong>{'<>'}</strong></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" disabled={isLoading} onChange={(e) => {
                        toggleShow(false)
                        setOTP(e.target.value)
                    }} placeholder="6-digit Verfication Code" value={OTP || ""} autoComplete="OTP" />
                </CInputGroup>
                <LoadingButton   {...{ block: true, isLoading, submit: validate, btnText: 'Submit' }} />
                <CRow>
                    <CCol xs="4">
                    </CCol>
                    <CCol xs="8" className="text-right px-0">
                        <CButton disabled={isLoading || sending} className="float-right" color="link" onClick={() => {
                            history.push("/login")
                        }}>Back to Login</CButton>
                        <CButton disabled={isLoading || sending} className="float-right" color="link" onClick={resendOTP}>Resend Code</CButton>
                    </CCol>
                </CRow>
            </CForm>
        </CenteredLayout>
    )
}

export default ForgotPassword
