import React, { useState, useRef, useEffect } from 'react';
import {
    CButton, CCard, CCardBody,
    CInput,
    CInvalidFeedback,
    CRow,
    CCol,
    CTextarea,
    CAlert
} from "@coreui/react";
import { Modal, LoadingButton } from 'reusable'
import Icon from '@mdi/react';
import { mdiFilePlusOutline, mdiPlus } from '@mdi/js'
import colors from 'assets/theme/colors'
import { FILE_TYPES } from 'utils/constants/constant'
import { getFileExtension, dispatchNotification } from 'utils/helpers'
import {
    fetchCompanyFiles,
    fetchCompanyVideos,
    fetchCompanyImages,
    fetchCompanyDocuments,
    fetchDepartments,
} from 'utils/helpers/fetch';
import api from 'utils/api';
import { useSelector, useDispatch } from 'react-redux';

const RepositoryModal = ({ isUpdate = false, isHidden = false }) => {
    const dispatch = useDispatch()
    const employeeId = useSelector(state => state.appState.auth.user.employeeId)
    let modal = useRef();
    let fileInput = useRef();
    const [file, setFile] = useState([]);
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('')
    const [error, setError] = useState([])


    const modalOnCloseCallback = () => {
        if (!isLoading) {
            setFile("");
            setDescription("");
            setError([]);
        }
    }
    const _onError = message => {
        // let currentError = copyArray(error)
        //
        if (!error.includes(message)) {
            return setError([...error, message])
        }
        // currentError.push(message)
        // setError(currentError)
        // currentError = []
    }
    const fileInputChangeHandler = (e) => {
        setError([])
        let { files } = e.target
        if (!files || files.length === 0) {
            _onError("Please attatch some file.")
            return
        }
        let value = files[0]
        setFile(value)
        let extension = getFileExtension(value.name)
        for (let idx = 0; idx < FILE_TYPES.length; idx++) {
            const file_type = FILE_TYPES[idx];
            if (file_type.extensions.includes(extension.toLowerCase())) {
                setType(file_type.name.toLowerCase());
                break;
            } else {
                setType("others")
            }
        }
    }
    const uploadFile = async () => {
        return
        let payload = new FormData()
        payload.append('file', file);
        payload.append("description", description)
        payload.append("type", type)
        payload.append("employeeId", +employeeId)
        dispatchNotification(dispatch, { type: 'info', message: 'Uploading' })
        setIsLoading(true)
        let res = await api.post("/add_file", payload, true);
        if (res.error) {
            setError([res.message])
            dispatchNotification(dispatch, { type: 'error', message: 'Error in uploading file' })
        } else {
            switch (type) {
                case 'videos':
                    await fetchCompanyVideos(dispatch)
                    break;
                case 'images':
                    await fetchCompanyImages(dispatch)
                    break;
                case 'documents':
                    await fetchCompanyDocuments(dispatch)
                    break;
                default:
                    await fetchCompanyFiles(dispatch)
                    break;
            }
        }
        setIsLoading(false)
        toggleModal()
    }

    const renderError = () => {
        return error.length ? (<CAlert color="danger justify-content-center text-align-center">
            {
                <p style={{ whiteSpace: 'pre', margin: '0' }}> {error.join(`\r\n`)}</p>

            }
        </CAlert>) : null
    }

    // 
    const preUpload = () => {
        let _errors = []
        setError([])
        if (!file || file.length === 0) {
            _errors.push("File is required.");
        }
        if (!description) {
            _errors.push("Description is required.");
        }
        if (description.trim().split(" ").length > 50) {
            _errors.push("Descrition must not be greater than 50 characters.");
        }
        setError([...new Set(_errors)])
        if (file !== [] && description) {
            return uploadFile()
        }
    }
    const toggleModal = () => {
        modal.current.toggle()
    }

    useEffect(() => {
        console.log(error);
    }, [error])

    return (
        <>
            <button className="btn  btn-primary fab" onClick={toggleModal}>
                <Icon size={2} path={mdiPlus} />
            </button>
            <Modal
                ref={modal}
                centered
                hidden={isHidden}
                btnTitle={`Upload File`}
                title={isUpdate ? 'Update' : 'New File'}
                modalOnClose={modalOnCloseCallback}
                footer={
                    <>
                        <LoadingButton {...{ isLoading, submit: preUpload, btnText: 'Upload' }} />
                        <CButton color="danger" onClick={() => {
                            modal.current.toggle()
                            modalOnCloseCallback()
                        }} >Cancel</CButton>
                    </>
                }
                hideCancelButton
            >
                {renderError()}
                <CRow className="justify-content-center">
                    <CCol  >
                        <CCard style={{ cursor: 'pointer' }} accentColor={error.some(v => v.includes('file')) || !file.length ? 'danger' : file.length && 'info'} onClick={() => {
                            fileInput.current.click();
                        }}>
                            <CCardBody style={{ textAlign: "center" }}>
                                <CRow>
                                    <CCol>
                                        <Icon path={mdiFilePlusOutline} size={5} color={!file ? colors.$grey_light : colors.$blue} />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol>
                                        <span style={{ color: file ? colors.$blue : colors.$grey_light }}>{file ? file.name : 'click here to add a file'}  </span>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                        <CInput hidden />
                    </CCol>
                </CRow>
                <CRow className="justify-content-center">
                    <input type="file" ref={fileInput} hidden onChange={fileInputChangeHandler} />
                    <CCol >
                        <CTextarea
                            value={description || ""}
                            placeholder="Description (max is 50 words)"
                            name="description"
                            rows="4"
                            invalid={(error.some(v => v.toLowerCase().includes('description')))}
                            onChange={(e) => {
                                setError([])
                                setDescription(e.target.value)
                            }}
                        />
                    </CCol>
                </CRow>
            </Modal>
        </>
    )
}

export default RepositoryModal
