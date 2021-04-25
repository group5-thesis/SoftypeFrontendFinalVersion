import React from 'react'
import {
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CRow,
} from "@coreui/react"
const CenteredLayout = ({ md = 5, bg = true, children, cardClass }) => {
    return (
        <div className={`c-app c-default-layout flex-row align-items-center ${bg && 'login-page'}`}>
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={md}>
                        <CCard className={`mx-4 ${cardClass}`}>
                            <CCardBody className={`p-4`}>
                                {children}
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>)
}
export default CenteredLayout