import React, { useState, useEffect, useRef } from 'react'
import QrReader from 'react-qr-reader'
import { useDispatch } from 'react-redux'
import { CButton, CSpinner } from "@coreui/react"
import { CenteredLayout } from 'containers'
import { ConfirmDialog, Modal } from 'reusable';
import { checkCamera, toggleDialog } from 'utils/helpers'
import { actionCreator, ActionTypes } from 'utils/actions'
import api from 'utils/api'

const QrCodeScanner = (props) => {
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    let { history } = props
    const [result, setResult] = useState(null)
    const modalRef = useRef()
    const scannerStyle = {
        width: '100%'
    }

    const handleError = (err) => {
        setError(err ? err : 'Something went wrong')
        toggleDialog(dispatch)
    }
    const handleScan = data => {
        if (data) {
            setResult(data)
            // loginWithQr()
        }
    }

    const loginWithQr = async () => {
        setLoading(true)
        let res = await api.post("/loginQr", JSON.parse(result))
        setLoading(false)
        if (!res.error) {
            setError(res.message)
            let { access_token, account_information } = res.data
            localStorage.setItem("token", access_token)
            dispatch(actionCreator(ActionTypes.FETCH_PROFILE_SUCCESS, account_information))
            dispatch(actionCreator(ActionTypes.LOGIN))
        } else {
            setError(res.message)
            toggleDialog(dispatch)
        }
    }
    // useEffect(() => {
    //     checkCamera().then(res => {
    //         console.log("ready")
    //     }).catch(err => {
    //         history.push("/login")
    //     })
    // }, [])
    return (
        <Modal ref={modalRef} {...{
            title: "Scan your QR Code to Login",
            btnTitle: "Login with QR Code",
            block: true
        }}>
            {/* <CenteredLayout bg={false}> */}
            <ConfirmDialog
                id="cutom_dialog"
                {...{
                    title: error,
                    cancelButtonText:"Ok",
                    confirmButton:false
                }}
            ></ConfirmDialog>
            < QrReader
                style={scannerStyle}
                delay={300}
                // showViewFinder={false}
                onError={handleError}
                onScan={handleScan}
            />
            {/* <CButton block
                disabled={loading}
                onClick={() => {
                    history.push("/login")
                }} color="primary" className="px-4 mt-2" >
                {loading ? (<CSpinner color="secondary" size="sm" />) : ("Back")}
            </CButton> */}
            {/* </CenteredLayout> */}
        </Modal>
    )
}

export default QrCodeScanner