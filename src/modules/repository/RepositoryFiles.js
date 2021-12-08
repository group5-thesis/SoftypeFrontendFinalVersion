import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toCapitalize, getFileExtension, dispatchNotification, downloadFile, copyArray, getBaseUrl, formatDate } from 'utils/helpers';
import { NoData, ConfirmDialog, Loader } from 'reusable';
import api from "utils/api";
import { CContainer, CRow, CCol, CCard, CLink, CCardHeader, CCardBody, CCardFooter, CPopover } from '@coreui/react';
import { mdiDownload, mdiProgressDownload, mdiTrashCan, mdiFilePdf, mdiInformationOutline, mdiEye } from '@mdi/js'
import Icon from '@mdi/react'
import colors from 'assets/theme/colors'
import RepositoryModal from './RepositoryModal';
import { FILE_TYPES } from 'utils/constants/constant'


import {
    fetchCompanyFiles,
    fetchCompanyVideos,
    fetchCompanyImages,
    fetchCompanyDocuments
} from 'utils/helpers/fetch'

const RepositoryFiles = (props) => {
    const dispatch = useDispatch()
    const dialogRef = useRef()
    const { match } = props
    const fileType = match.params.type
    const files = useSelector(state => state.appState.files[fileType])
    const [iconIndex, setIconIndex] = useState(0)
    const { $blue, $orange, $green, $red } = colors;
    const [loading, setLoading] = useState(true)
    const [onQueue, setOnQueue] = useState([])
    const [pendingDeleteItem, setPendingDeleteItem] = useState()
    const $theme = [
        ['info', 'primary', 'danger', 'success'],
        [$blue, $orange, $red, $green]
    ]
    const [theme, setTheme] = useState(0)
    const deleteFile = async () => {
        return
        let id = pendingDeleteItem['file id']
        setLoading(true)
        let res = await api.post(`/delete_file/${id}`)
        removeFromQueue(pendingDeleteItem.path)
        dispatchNotification(dispatch, { type: 'info', message: 'Please wait.' })

        if (!res.error) {
            await retrieveFiles()
            setLoading(false)
            dispatchNotification(dispatch, { type: 'success', message: 'Success' })
        } else {
            dispatchNotification(dispatch, { type: 'error', message: res.message })
        }
        setPendingDeleteItem("")
    }

    const removeFromQueue = (path) => {
        let queuedItems = copyArray(onQueue);
        queuedItems = queuedItems.filter(item => item !== path)
        setOnQueue(queuedItems)
    }
    const beforeDelete = (_file) => {
        dialogRef.current.toggle()
        setPendingDeleteItem(_file)
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
        let uri = `${getBaseUrl()}/file/${fileType}/${path}`
        addToQueue(path)
        downloadFile(uri, filename, (success, err) => {
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
                setIconIndex(2)
                await fetchCompanyVideos(dispatch)
                break;
            case 'images':
                setIconIndex(1)
                setTheme(1);
                await fetchCompanyImages(dispatch)
                break;
            case 'documents':
                setIconIndex(0)
                setTheme(0);
                await fetchCompanyDocuments(dispatch)
                break;
            case 'others':
                setIconIndex(3)
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
            <ConfirmDialog
                ref={dialogRef}
                {...{
                    show: true,
                    onConfirm: () => {
                        deleteFile()
                    },
                    title: `Confirm Delete`,
                }}
            ></ConfirmDialog>
            {loading ? <Loader bg="rgba(255,255,255,0.5)" /> :
                (files && !files.length) ? <NoData  {...{ title: 'No Files' }} />
                    :
                    <CRow>
                        {files.map(file => {

                            const { filename, description, path } = file
                            let queued = onQueue.includes(path)
                            return (
                                <CCol sm="4" md="3" lg="3" key={file.path} >
                                    <CCard accentColor={$theme[0][theme]} style={{ maxHeight: '220px' }}>
                                        <CCardHeader className="font-weight-bold text-truncate">
                                            <small> <strong>{filename}</strong></small>
                                        </CCardHeader>

                                        <CCardBody style={{ textAlign: "center" }}>
                                            <Icon path={FILE_TYPES[iconIndex]['icon']} size={4} color={$theme[1][theme]} />
                                        </CCardBody>
                                        <CCardFooter>
                                            <div className="card-header-actions">
                                                <CLink className="card-header-action" onClick={() => {
                                                    // redirect(`${getBaseUrl()}/file/${fileType}/${path}`)
                                                }}>
                                                    <Icon path={mdiEye} size={0.9} color="black" />
                                                </CLink>
                                                {/* <CLink className="card-header-action" onClick={() => {
                                                    if (!queued) {
                                                        return download(path, filename)
                                                    }
                                                    dispatchNotification(dispatch, { type: 'info', message: 'Dowload on progress' })
                                                }}>
                                                    <Icon path={queued ? mdiProgressDownload : mdiDownload} size={0.9} color="black" />
                                                </CLink> */}

                                                <CLink className="card-header-action" onClick={() => {
                                                    beforeDelete(file)
                                                }}>
                                                    <Icon path={mdiTrashCan} size={0.8} color="black" />
                                                </CLink>
                                                <CPopover header="File Information" content={<>
                                                    <p><strong>Filename :</strong> {filename}</p>
                                                    <p><strong>Description :</strong> {description}</p>
                                                    <p><strong>Uploaded by :</strong> {file['uploaded by']}</p>
                                                    <p><strong>Date Uploaded :</strong> {formatDate(file['uploaded at'])}</p>
                                                </>}>
                                                    <CLink className="card-header-action" onClick={() => { }}>
                                                        <Icon path={mdiInformationOutline} size={0.8} color="black" />
                                                    </CLink>
                                                </CPopover>
                                            </div>
                                        </CCardFooter>
                                    </CCard>
                                </CCol>
                            )
                        })}
                    </CRow>
            }
        </CContainer>
    )
}

export default RepositoryFiles; 