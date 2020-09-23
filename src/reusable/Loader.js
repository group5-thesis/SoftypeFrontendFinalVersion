import React from 'react'
import {
    CSpinner,
    CCol,
    CContainer,
    CRow,
} from "@coreui/react"
const CenteredLayout = ({ md = 5, bg = true, children }) => {
    return (
        <div className={`c-app c-default-layout flex-row align-items-center`} style={
            { backgroundColor: "rgba(0,0,0,0.8)" }
        }>
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={md} className="justify-content-center">
                        <center>
                            <CSpinner
                                style={{ width: '5rem', height: '5rem' }}
                                color="primary"
                                variant="grow"
                            />
                        </center>
                    </CCol>
                </CRow>
            </CContainer>
        </div >)
}
export default CenteredLayout