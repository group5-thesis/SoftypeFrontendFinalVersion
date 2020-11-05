import React from 'react'
import {
    CSpinner,
    CCol,
    CContainer,
    CRow,
    CButton,
} from "@coreui/react"
const LoadingButton = ({ isLoading, submit, btnText, className = "mr-1", color = "primary", block = false }) => {
    return (
        <CButton
            disabled={isLoading}
            onClick={submit}
            className={className}
            block={block}
            color={color}>
            {
                isLoading ? <CSpinner color="secondary" size="sm" /> : btnText
            }
        </CButton>
    )
}
export default LoadingButton