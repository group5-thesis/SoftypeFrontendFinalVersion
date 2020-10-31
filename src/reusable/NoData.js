import React from 'react'
import { CWidgetSimple } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const NoData = ({title}) => {
    return (
        <>
            <CWidgetSimple header="" text="" >
                <CIcon size={'9xl'} name={'cilFile'} />
                <p> {title ? title : "No Data"}</p>
            </CWidgetSimple>
        </>
    )
}   

export default NoData