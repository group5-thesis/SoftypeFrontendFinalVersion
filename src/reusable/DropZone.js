import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import {
    CButton,
    CCol,
    CJumbotron,
    CRow,
    CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import XLSX from 'xlsx';
import { SheetJSFT } from 'utils/constants/constant';
import { getFileExtension } from 'utils/helpers'
const acceptedFiles = SheetJSFT.split(',')
console.log(acceptedFiles);

const DropZone = forwardRef((props, ref) => {
    const [uploadFile, setUploadFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cols, setCols] = useState([]);
    const fileInputRef = useRef();

    const validateFile = (file) => {
        let ext = getFileExtension(file.name);
        if (acceptedFiles.indexOf(`.${ext}`) === -1) {
            return false;
        }
        return true;
    }
    const handleFiles = (files) => {
        if (files.length > 1) {
            return alert('Cannot upload multiple files')
        }

        if (!validateFile(files[0])) {
            return alert('Only Excel and CSV files are allowed')
        }

        setUploadFile(files[0])

    }

    const dragOver = (e) => {
        e.preventDefault();
    }

    const dragEnter = (e) => {
        e.preventDefault();
    }

    const dragLeave = (e) => {
        e.preventDefault();
    }

    const fileDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        handleFiles(files)

    }

    const filesSelected = (e) => {
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
        e.target.value = ''
    }

    const fileInputClicked = () => {
        fileInputRef.current.click();
    }

    const convertDataToJSON = () => {
        setLoading(true)
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = e => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, {
                type: rABS ? "binary" : "array",
                bookVBA: true
            });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws);
            /* Update state */
            setCols(make_cols(ws["!ref"]))
            setUploadFile(null);
            props.setUsers(val => [...val, ...data]);
            props.setModal(false);
        };
        if (rABS) {
            reader.readAsBinaryString(uploadFile);
        } else {
            reader.readAsArrayBuffer(uploadFile);
        }
        setLoading(false)
    }
    /* generate an array of column objects */
    const make_cols = refstr => {
        let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
        for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i }
        return o;
    };

    useImperativeHandle(ref, () => ({
        reset() {
            setUploadFile(null);
        },
    }));

    useEffect(() => {
        return () => {
            setUploadFile(null)
        }
    }, [])


    return (
        <CJumbotron className="text-center" >
            <div
                className="dzoneDropArea"
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onClick={fileInputClicked}
                onDrop={fileDrop}>
                <input
                    ref={fileInputRef}
                    className="file-input"
                    type="file"
                    hidden
                    accept={SheetJSFT}
                    onChange={filesSelected}
                />
                <CIcon name={!uploadFile ? "cil-cloud-upload" : "cil-file"} size="8xl" />
                <strong><p className="text-bold">{uploadFile ? uploadFile.name : 'No file selected.'}</p></strong>
                <p> Drag {'&'} Drop files here or click to upload</p>

            </div>
            <CRow className="justify-content-center">
                <CCol col="6" sm="4" md="2" xl={4} className="mb-3 mb-xl-0">
                    <CButton block disabled={!uploadFile} color="primary" onClick={convertDataToJSON}> {loading ? (
                        <CSpinner color="secondary" size="sm" />
                    ) : (
                        "Upload"
                    )}</CButton>
                </CCol>
            </CRow>
        </CJumbotron>
    )
})

export default DropZone
