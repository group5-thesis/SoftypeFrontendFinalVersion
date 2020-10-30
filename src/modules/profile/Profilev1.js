import React, { Component, createRef } from 'react'
import api from 'utils/api'
import { CCol, CRow, CSpinner } from '@coreui/react'
import { toCapitalize, getAge } from 'utils/helpers'
import res from 'assets/img'
import { svg2png } from 'svg-png-converter'

class ProfilePage extends Component {
    state = {
        loading: true,
        src: res.logoSm,
        userDetails: {}
    }
    SvgToPng = async (svgString) => {
        let converted = await svg2png({
            input: svgString.trim(),
            encoding: 'dataURL',
            format: 'png',
            multiplier: 1,
            quality: 1
        })
        this.setState({ src: converted })
    }
    getQrCode = async (user) => {
        try {
            let _res = await api.get(`/image/${user.qr_code}`)
            if (!_res.error) {
                this.SvgToPng(_res.toString())
            }
        } catch (error) {
            return "error"
        }
    }
    componentDidMount() {
        let { user } = this.props.auth
        let qr = this.getQrCode(user)
        this.setState({ loading: false })
        if (qr !== "error") {
            this.setState({
                userDetails: {
                    Address: `${toCapitalize(user.street)} ${toCapitalize(user.city)} ${toCapitalize(user.country)}`,
                    Age: getAge(user.birthdate),
                    Email: user.email,
                    "Mobile Number": user.mobileno,
                    Position: user.position
                }
            })
        }

    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }

    render() {
        let { user } = this.props.auth
        let { loading, src, userDetails } = this.state
        return (
            <>
                <CRow className="justify-content-center">
                    <CCol md={9}>
                        <CRow>
                            <CCol md={8}>
                                <h3>Name: {`${toCapitalize(user.firstname)} ${user.middlename && toCapitalize(user.middlename) + " "}${toCapitalize(user.lastname)}`}</h3>
                                {Object.entries(userDetails).map(([key, value]) => {
                                    return <h6 key={key}>{key} : {value}</h6>
                                })}
                            </CCol>
                            <CCol md={4} className="justify-content-center">
                                <div className="image-container text-center ">
                                    {/*  src={!loading ? src : res.logoSm} */}
                                    <img src={!loading ? src : res.logoSm} style={{ width: "100%" }} />

                                    {loading && <div className="image-overlay">
                                        <CSpinner className="text" color="warning" variant="grow" />
                                    </div>}
                                </div>
                                {(!loading && user.qr_code) && <a download={user.qr_code.split("/")[1].replace("svg", "png")} href={src} className="text-center ml-4 mt-3 h6">Download Qr Code</a>}
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>
            </>
        )
    }
}

export default ProfilePage
