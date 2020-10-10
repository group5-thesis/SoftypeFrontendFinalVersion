import React, { useState, useEffect } from "react"
import {
  CButton,
  CModal,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CSpinner,
  CInvalidFeedback,} from "@coreui/react"
  import { CenteredLayout } from "containers"
  import CIcon from "@coreui/icons-react"

const FileUpload = () => {
    const [credentials, setCredentials] = useState({
        file: "",
        description:""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setCredentials({ [name]: value })
    }

    return (
       
        <CenteredLayout>
        <CButton  color="primary" className="px-32" >
            Attach File     <CIcon name="cil-paperclip" />
        </CButton>
        <CInputGroup className="mb-3">
                <CInputGroupPrepend>
                    <CInputGroupText>
                          <CIcon name="cil-pencil" />
                    </CInputGroupText>
                </CInputGroupPrepend>
                
                <CInput
                    type="text"
                    value={credentials.description || ""}
                    placeholder="Description"
                    name="description"
                    autoComplete="text"
                    onChange={handleChange}
                />
            </CInputGroup>
            <CButton  color="primary" className="px-32" >
            Upload File<CIcon name="cil-paper-plane" />
        </CButton>
    </CenteredLayout>
    )
}

export default FileUpload