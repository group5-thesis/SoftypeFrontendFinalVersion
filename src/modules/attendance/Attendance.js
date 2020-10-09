import React, { Component } from 'react';
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
} from "@coreui/react";
class Attendance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            delay: 500,
            result: 'No result',
            camera: false,
            cameraError: ""
        }
    }
    componentDidMount() {
        let hasCamera = false;
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                devices.forEach((device) => {
                    if (device.kind === "videoinput") {
                        hasCamera = true;
                    }
                });
                if (hasCamera) {
                    let constraints = { video: true };
                    navigator.mediaDevices.getUserMedia(constraints)
                        .then((stream) => {
                            this.setState({ camera: true })
                        })
                        .catch((err) => {
                            if (err.name == "NotAllowedError") {
                                this.setState({ cameraError: "There was an error with accessing the camera \nstream: Permission not granted" })
                            }
                        });
                }
            })
            .catch(function (err) {
                this.setState({ cameraError: err.name + ": " + err.message })
            });
    }


    render() {
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
                                    <CButton color="seconary" block>Signin with QRCode</CButton>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    }
}
export default Attendance;