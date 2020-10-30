import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toCapitalize } from 'utils/helpers';
import { NoData } from 'reusable';
import api from "utils/api";
import { actionCreator, ActionTypes } from 'utils/actions';
import { CContainer, CRow, CCol, CCard, CCardHeader, CCardBody, CCardFooter } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { mdiDownload, mdiEye, mdiFilePdf } from '@mdi/js'
import Icon from '@mdi/react'
import colors from 'assets/theme/colors'
import RepositoryModal from './RepositoryModal';

const RepositoryFiles = (props) => {
    const dispatch = useDispatch();
    const { match } = props
    const fileType = match.params.type
    const { $blue, $orange, $green, $red } = colors;
    const $theme = [
        ['info', 'primary', 'danger', 'success'],
        [$blue, $orange, $red, $green]
    ]
    const retrieveFiles = async () => {
        let res = await api.get(`/retrieve_files_by_type/${fileType}`);
        if (!res.error) {
            dispatch(actionCreator(ActionTypes[`FILE_${fileType.toUpperCase()}`]), res.data.files)
        } else {
            alert(res.message)
        }
    }
    useEffect(() => {
        retrieveFiles()
        return () => { };
    }, [])
    return (
        <CContainer fluid>
            <RepositoryModal {...{ type: fileType, isHidden: true }} />
            <CRow>
                <CCol sm="4" md="3" lg="3" >
                    <CCard accentColor={$theme[0][0]}>
                        <CCardBody style={{ textAlign: "center" }}>
                            <Icon path={mdiFilePdf} size={5} color={$theme[1][0]} />
                        </CCardBody>
                        <CCardFooter>
                            Footer.
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    )
}

export default RepositoryFiles; 