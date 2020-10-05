import React, { useState } from "react";
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputFile,
  CLabel,
} from "@coreui/react";
import api from "utils/api";

const BasicForms = () => {
  const [file, setFile] = useState([]);
  const [description, setDescription] = useState("");
  const handleFileChange = (e) => {
    let { value } = e.target;
    console.log(value);
    setFile(value);
  };
  const handleDescriptionChange = (e) => {
    let { value } = e.target;
    setDescription(value);
  };

  const handleSubmit = async () => {
    let formdata = new FormData();
    formdata.append("file", file);
    formdata.append("description", description);
    console.log(formdata);
    let res = await api.post("/upload", {});
    console.log(res);
  };
  return (
    <>
      <CForm>
        <CFormGroup row>
          <CLabel col md="3" htmlFor="file-input">
            File input
          </CLabel>

          <CCol xs="12" md="9">
            <CInputFile
              value={file}
              id="file-input"
              onChange={handleFileChange}
              name="file"
            />
            <CInput
              value={description || ""}
              id="desc-input"
              onChange={handleDescriptionChange}
              name="description"
            />
            <CButton onClick={handleSubmit} color="primary">
              upload
            </CButton>
          </CCol>
        </CFormGroup>
      </CForm>
    </>
  );
};

export default BasicForms;
