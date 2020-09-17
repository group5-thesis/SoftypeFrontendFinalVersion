import React from 'react'
import { CWidgetSimple } from '@coreui/react';
import CIcon from '@coreui/icons-react';

const NoData = () => {
    return (
        <>
            <CWidgetSimple header="" text="" >
                <CIcon size={'9xl'} name={'cilFile'} />
                <p> No Data</p>
            </CWidgetSimple>
        </>
    )
}

export default NoData;