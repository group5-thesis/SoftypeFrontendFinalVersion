import React, { useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CContainer
} from '@coreui/react'
import { FILE_TYPES } from 'utils/constants/constant'
import Icon from '@mdi/react'
import colors from 'assets/theme/colors'
import { setWidth } from 'utils/helpers';
import { useHistory } from 'react-router-dom'
const Repository = () => {
    const history = useHistory();
    const { $blue, $orange, $green, $red } = colors;
    const $theme = [
        ['info', 'primary', 'danger', 'success'],
        [$blue, $orange, $red, $green]
    ]
    const goToRoute = (route) => {
        history.push(`/repository/${route}`)
    }
    return (
        <CContainer>
            <CRow span={9} >
                {FILE_TYPES.map((fileType, idx) => {
                    return (
                        <CCol {...setWidth(6)} key={`card_${idx}`}>
                            <CCard id={fileType.name} style={{ cursor: 'pointer' }} onClick={() => {
                                goToRoute(fileType.name.toLowerCase())
                            }} className="mx-4" accentColor={$theme[0][idx]}>
                                <CCardHeader>
                                    <h2 className="text-center">{fileType.name}</h2>
                                </CCardHeader>
                                <CCardBody style={{ textAlign: "center" }}>
                                    <Icon size={5} color={$theme[1][idx]} path={fileType.icon} />
                                </CCardBody>
                            </CCard>
                        </CCol>
                    )
                })}
            </CRow>
        </CContainer>

    )
}

export default Repository
