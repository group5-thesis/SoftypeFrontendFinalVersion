import React, { useState } from 'react'
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
    CRow,
    CAlert
} from '@coreui/react'
import { useSelector } from 'react-redux'
import { CenteredLayout } from 'containers';
import Icon from '@mdi/react'
import { mdiKey, mdiEye } from '@mdi/js'
import Func from 'utils/helpers/validator'
import Consts from 'utils/helpers/Consts'
import { LoadingButton } from 'reusable';
import colors from 'assets/theme/colors';

const ChangePassword = (props) => {
    let { history } = props;
    let user = useSelector(state => {
        return state.appState.auth.user
    })
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [isLoading, toggleLoading] = useState(false)
    const [errors, setErrors] = useState(null)

    const submit = async () => {

    }
    const validate = () => {
        setErrors([])
        let isFilled = newPassword !== '' && currentPassword !== '' && confirmPassword !== '';
        if (!isFilled) {
            return setErrors([{ message: "Inputs are required" }])
        }
        let validation = Func.validate(newPassword, Consts.password_criteria)
        setErrors(validation.errors)
        if (newPassword !== confirmPassword) {
            return setErrors([{ message: "Passwords don't match" }])
        }

        if (validation.ok) {
            // let payload = {
            //     wallet_no: walletno,
            //     current_password: old_password,
            //     new_password
            // }

            // let res = await API.changePassword(payload)

            // if (res.error) {
            //     this.setState({ error_old: true })
            //     Say.attemptLeft(res.message, {
            //         frontMsg: Consts.error.wrongInfo
            //     })

            //     if (res.message == Consts.error.blk1d) this.props.logout()
            // }
            // else {
            //     errors = []
            //     this.setState({
            //         old_password: '',
            //         new_password: '',
            //         confirm_password: ''
            //     })

            //     Say.ok("Your password has been successfully changed")
            //     this.props.navigation.pop()
            // }
        }
    }
    return (
        <CenteredLayout>
            <CForm>
                <h1>Change Password</h1>
                {
                    errors &&
                    <CAlert fade color="danger" closeButton>
                        <ul className="mt-3">
                            {errors.map(({ message }, id) => {
                                return <li key={id}>{message}</li>
                            })}
                        </ul>
                    </CAlert>
                }

                <CInputGroup className="mb-3 mt-3">
                    <CInputGroupPrepend>
                        <CInputGroupText>
                            <Icon path={mdiKey} size={0.9} color={colors.$grey_dark} />
                        </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" value={currentPassword} onChange={(e) => {
                        let { value } = e.target;
                        setCurrentPassword(value)
                    }} placeholder="current password" />
                </CInputGroup>
                <CInputGroup className="mb-3 mt-3">
                    <CInputGroupPrepend>
                        <CInputGroupText>
                            <Icon path={mdiKey} size={0.9} color={colors.$grey_dark} />
                        </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" value={newPassword} onChange={(e) => {
                        let { value } = e.target;
                        setNewPassword(value)
                    }} placeholder="new password" />
                </CInputGroup>
                <CInputGroup className="mb-3 mt-3">
                    <CInputGroupPrepend>
                        <CInputGroupText>   <Icon path={mdiKey} size={0.9} color={colors.$grey_dark} /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" value={confirmPassword} onChange={(e) => {
                        let { value } = e.target;
                        setConfirmPassword(value)
                    }} placeholder="confirm new password" />
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

export default ChangePassword
