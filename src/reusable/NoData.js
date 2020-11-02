import React from 'react'
import { CWidgetSimple } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const NoData = ({title}) => {
    return (
        <>
            <CWidgetSimple header="" text="" >
                <CIcon size={'9xl'} name={'cilFile'} />
                <h1> {title ? title : "No Data"}</h1>
            </CWidgetSimple>
        </>
    )
}

export default NoData
