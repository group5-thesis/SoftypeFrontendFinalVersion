import React, { useEffect, useState, useRef } from 'react'
import { CenteredLayout } from 'containers'
import { useSelector } from 'react-redux'
import api from 'utils/api'
import { CCol, CRow, CSpinner } from '@coreui/react';
import { toCapitalize, getAge } from 'utils/helpers'
import res from 'assets/img'
const ProfilePage = () => {
    const imgRef = useRef(null)
    const [loading, setLoading] = useState(true)
    const [src, setSrc] = useState('')
    const user = useSelector(state => {
        return state.appState.auth.user
    })
    const userDetails = {
        // Name: `${toCapitalize(user.firstname)} ${user.middlename && toCapitalize(user.middlename) + " "}${toCapitalize(user.lastname)}`,
        Address: `${toCapitalize(user.street)} ${toCapitalize(user.city)} ${toCapitalize(user.country)}`,
        Age: getAge(user.birthdate),
        Email: user.email,
        "Mobile Number": user.mobileno,
        Position: user.position
    }

    const getQrCode = async () => {
        let res = await api.get(`/image/${user.qr_code}`)
        setLoading(false)
        if (!res.error) {
            var svg64 = btoa(res);
            var b64start = 'data:image/svg+xml;base64,';
            var image64 = b64start + svg64;
            setSrc(image64)
        }
    }
    useEffect(() => {
        getQrCode()
    }, [])
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
                                <img src={!loading ? src : res.logoSm} style={{ width: "100%" }} className="image" />
                                {loading && <div className="image-overlay">
                                    <CSpinner className="text" color="warning" variant="grow" />
                                </div>}
                            </div>
                            {!loading && <a download={user.qr_code.split("/")[1]} href={src} className="text-center ml-3 mt-3 h6">Download Qr Code</a>}
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
        </>
    )
}


export default ProfilePage