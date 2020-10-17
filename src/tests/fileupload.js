import React, { useState, useEffect, useRef } from "react"
import {
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CRow,
    CButton,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CForm,
    CInputFile,
    CFormGroup,
    CLabel
} from "@coreui/react"
import { CenteredLayout } from "containers"
import CIcon from "@coreui/icons-react"
import { Modal } from "reusable"
import api from "utils/api";
import { formatDate } from "utils/helpers"

const FileUpload = () => {
    const [file, setFile] = useState([]);
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [path, setPath] = useState("");

    
    const handleFileChange = (e) => {
        let { files } = e.target;
        // console.log(files)
        setFile(files[0]);

    };

    const handleDescriptionChange = (e) => {
        let { value } = e.target;
        setDescription(value);
    };



    const printValues = e => {
        e.preventDefault();
        console.log(file, description);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(file.name, description)
        let formdata = new FormData();
        formdata.append("file", file ,file.name);
        formdata.append("description",description)
        console.log(formdata);
        let res = await api.post("add_file", formdata, true);
        // console.log(res);
    };

    return (
        <CenteredLayout>
            <Modal  {...{
                title: "File upload",
                btnTitle: "click me",
                className: "mb-6",
                size: "lg",
            }}>
                <CForm >
                    <CFormGroup row>
                        <CInputFile
                            color="primary"
                            id="file-input"
                            onChange={handleFileChange}
                            name="file"
                        />

                        <CInputGroup className="mb-3">
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                    <CIcon name="cil-pencil" />
                                </CInputGroupText>
                            </CInputGroupPrepend>

                            <CInput
                                value={description || ""}
                                id="desc-input"
                                onChange={handleDescriptionChange}
                                name="description"
                            />
                        </CInputGroup>
                        <CButton color="primary" className="px-32" onClick={handleSubmit}>
                            Upload File<CIcon name="cil-paper-plane" />
                        </CButton>
                    </CFormGroup>
                </CForm>

            </Modal>

            <CRow>
                <CCol xs="12" lg="6">
                    <CCard>
                        <CCardHeader> 
                            Images Upload       
                        </CCardHeader>
                        <CCardBody>
                        <CRow>

                        </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

        </CenteredLayout>

    )
}

export default FileUpload
