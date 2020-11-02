import React, { useState, useRef } from 'react';
import {
    CButton, CCard, CCardBody,
    CInput,
    CInvalidFeedback,
    CRow,
    CCol,
    CTextarea,
} from "@coreui/react";
import { Modal, LoadingButton } from 'reusable'
import Icon from '@mdi/react';
import { mdiFilePlusOutline, mdiPlus } from '@mdi/js'
import colors from 'assets/theme/colors'
import { FILE_TYPES } from 'utils/constants/constant'
import { getFileExtension } from 'utils/helpers'
import api from 'utils/api';
import { useSelector } from 'react-redux';

const RepositoryModal = ({ isUpdate = false, isHidden = false }) => {
    let errors = {
        description: false,
        file: false
    }
    const employeeId = useSelector(state => state.appState.auth.user.employeeId)
    let modal = useRef();
    let fileInput = useRef();
    const [file, setFile] = useState('');
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('')
    const [error, setError] = useState(errors)

    const modalOnCloseCallback = () => {
        _onError(0);
        if (!isLoading) {
            setFile("");
            setDescription("")
        }
    }
    const fileInputChangeHandler = (e) => {
        _onError(0);
        let { files } = e.target
        if (!files || files.length === 0) {
            if (!file) {
                setFile('')
                _onError(3)
            }
            return
        }
        let value = files[0]
        setFile(value)
        let extension = getFileExtension(value.name)
        for (let idx = 0; idx < FILE_TYPES.length; idx++) {
            const file_type = FILE_TYPES[idx];
            if (file_type.extensions.includes(extension)) {
                setType(file_type.name.toLowerCase());
                break;
            }
        }
    }
    const uploadFile = async () => {
        let payload = new FormData()
        payload.append('file', file);
        payload.append("description", description)
        payload.append("type", type)
        payload.append("employeeId", +employeeId)
        setIsLoading(true)
        let res = await api.post("/add_file", payload, true);
        if (res.error) {
            alert(res.message)
        }
        setIsLoading(false)
        toggleModal()
    }

    const _onError = (err) => {
        switch (err) {
            case 1:
                errors.description = "Description must be up to 50 words."
                break;
            case 2:
                errors.description = "Please add some description"
                break;
            case 3:
                errors.file = "Please add some file.";
                break;
            case 0:
                errors.file = false
                errors.description = false
                break;
        }
        setError(errors)
    }

    const preUpload = () => {
        _onError(0);
        if (!file) {
            _onError(3)
        }
        if (!description) {
            _onError(2)
        }
        if (description.trim().split(" ").length > 50) {
            return _onError(1)
        }

        if (file && description) {
            return uploadFile()
        }
    }
    const toggleModal = () => {
        modal.current.toggle()
    }



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
                <CRow className="justify-content-center">
                    <CCol sm="8" md="8" lg="8" >
                        <CCard style={{ cursor: 'pointer' }} accentColor={error.file.length ? 'danger' : file && 'info'} className={`${error.file && 'mb-0'}`} onClick={() => {
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
                        <CInput hidden invalid={!(!error.file.length)} />
                        {error.file.length &&
                            <CInvalidFeedback className="help-block mb-2">
                                {error.file}
                            </CInvalidFeedback>
                        }
                    </CCol>
                </CRow>
                <CRow className="justify-content-center">
                    <input type="file" ref={fileInput} hidden onChange={fileInputChangeHandler} />
                    <CCol sm="8" md="8" lg="8" >
                        <CTextarea
                            value={description || ""}
                            placeholder="Description (max is 50 words)"
                            name="description"
                            rows="4"
                            invalid={description.split(" ").length > 50 || !(!error.description)}
                            onChange={(e) => {
                                setDescription(e.target.value)
                                _onError(0)
                            }}
                        />

                        {error.description.length &&
                            <CInvalidFeedback className="help-block">
                                {error.description}
                            </CInvalidFeedback>
                        }
                    </CCol>
                </CRow>
            </Modal>
        </>
    )
}

export default RepositoryModal
