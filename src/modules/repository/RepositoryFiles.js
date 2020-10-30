import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toCapitalize, getFileExtension, downloadFile, copyArray, getBaseUrl } from 'utils/helpers';
import { NoData } from 'reusable';
import api from "utils/api";
import { actionCreator, ActionTypes } from 'utils/actions';
import { CContainer, CRow, CCol, CCard, CLink, CCardHeader, CCardBody, CCardFooter } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { mdiDownload, mdiProgressDownload, mdiTrashCan, mdiFilePdf, mdiInformationOutline, mdiEye } from '@mdi/js'
import Icon from '@mdi/react'
import colors from 'assets/theme/colors'
import RepositoryModal from './RepositoryModal';

import {
    fetchCompanyFiles,
    fetchCompanyVideos,
    fetchCompanyImages,
    fetchCompanyDocuments
} from 'utils/helpers/fetch'

const RepositoryFiles = (props) => {
    const dispatch = useDispatch()
    const { match } = props
    const fileType = match.params.type
    const files = useSelector(state => state.appState.files[fileType])
    const { $blue, $orange, $green, $red } = colors;
    const [loading, setLoading] = useState(true)
    const [onQueue, setOnQueue] = useState([])
    const $theme = [
        ['info', 'primary', 'danger', 'success'],
        [$blue, $orange, $red, $green]
    ]
    const [theme, setTheme] = useState(0)
    const deleteFile = async (id) => {
        let res = await api.post(`/delete_file/${id}`)
        if (!res.error) {
            retrieveFiles()
        } else { alert(res.message) }
    }

    const removeFromQueue = (path) => {
        let queuedItems = copyArray(onQueue);
        queuedItems = queuedItems.filter(item => item !== path)
        setOnQueue(queuedItems)
    }
    const addToQueue = (path) => {
        let queuedItems = copyArray(onQueue);
        queuedItems.push(path)
        setOnQueue(queuedItems)
    }
    const redirect = (route) => {
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = route;
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
    }
    const download = (path, filename) => {
        addToQueue(path)
        let route = `${fileType}/${path}`;
        downloadFile(route, filename, (success, err) => {
            if (!success) {
                console.log(err)
            }
            setTimeout(() => {
                return removeFromQueue(path)
            }, 500);
        })
    }

    const retrieveFiles = async () => {
        switch (fileType.toLowerCase()) {
            case 'videos':
                setTheme(2);
                await fetchCompanyVideos(dispatch)
                break;
            case 'images':
                setTheme(1);
                await fetchCompanyImages(dispatch)
                break;
            case 'documents':
                setTheme(0);
                await fetchCompanyDocuments(dispatch)
                break;
            case 'others':
                setTheme(3);
                await fetchCompanyFiles(dispatch)
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        retrieveFiles()
        setLoading(false)
    }, [])
    return (
        <CContainer fluid>
            <RepositoryModal {...{ type: fileType, isHidden: true }} />
            {
                (files && !files.length) ? <NoData  {...{ title: loading ? 'loading data' : (!files.length && 'No Files') }} />
                    : files.map(file => {
                        let filename = `${file.filename}.${getFileExtension(file.path)}`
                        let queued = onQueue.includes(file.path)
                        return (
                            <CRow key={file.path}>
                                <CCol sm="4" md="3" lg="3" >
                                    <CCard accentColor={$theme[0][theme]}>
                                        <CCardHeader className="font-weight-bold">
                                            <small> <strong>{filename}</strong></small>
                                        </CCardHeader>

                                        <CCardBody style={{ textAlign: "center" }}>
                                            <Icon path={mdiFilePdf} size={5} color={$theme[1][theme]} />
                                        </CCardBody>
                                        <CCardFooter>
                                            <div className="card-header-actions">
                                                <CLink className="card-header-action" onClick={() => {
                                                    redirect(`${getBaseUrl()}/file/${fileType}/${file.path}`)
                                                }}>
                                                    <Icon path={mdiEye} size={0.9} color="black" />
                                                </CLink>
                                                <CLink className="card-header-action" onClick={() => {
                                                    if (!queued) {
                                                        return download(file.path, filename)
                                                    }
                                                    alert("Dowload on progress")
                                                }}>
                                                    <Icon path={queued ? mdiProgressDownload : mdiDownload} size={0.9} color="black" />
                                                </CLink>

                                                <CLink className="card-header-action" onClick={() => {
                                                    deleteFile(file['file id']);
                                                    removeFromQueue(filename)
                                                }}>
                                                    <Icon path={mdiTrashCan} size={0.8} color="black" />
                                                </CLink>
                                                <CLink className="card-header-action" onClick={() => { }}>
                                                    <Icon path={mdiInformationOutline} size={0.8} color="black" />
                                                </CLink>
                                            </div>
                                        </CCardFooter>
                                    </CCard>
                                </CCol>
                            </CRow>
                        )
                    })}

            {/* {(files.length) && files.map(file => {
                    let filename = `${file.filename}.${getFileExtension(file.path)}`
                    return (
                        <CCol sm="4" md="3" lg="3" key={file.path} >
                            <CCard accentColor={$theme[0][theme]}>
                                <CCardHeader className="font-weight-bold">
                                    <small> <strong>{filename}</strong></small>
                                </CCardHeader>

                                <CCardBody style={{ textAlign: "center" }}>
                                    <Icon path={mdiFilePdf} size={5} color={$theme[1][theme]} />
                                </CCardBody>
                                <CCardFooter>
                                    <div className="card-header-actions">
                                        <CLink className="card-header-action">
                                            <Icon path={mdiDownload} size={0.9} color="black" />
                                        </CLink>
                                        <CLink className="card-header-action" onClick={() => { }}>
                                            <Icon path={mdiTrashCan} size={0.8} color="black" />
                                        </CLink>
                                        <CLink className="card-header-action" onClick={() => { }}>
                                            <Icon path={mdiInformationOutline} size={0.8} color="black" />
                                        </CLink>
                                    </div>
                                </CCardFooter>
                            </CCard>
                        </CCol>
                    )
                })} */}


        </CContainer>
    )
}

export default RepositoryFiles; 