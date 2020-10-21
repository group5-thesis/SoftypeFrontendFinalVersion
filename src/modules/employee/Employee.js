import React, { useState, useRef, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CCardFooter,
  CFormGroup,
  CInput,
  CLabel,
  CForm,
  CImg,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch } from 'react-redux'
import { actionCreator, ActionTypes } from 'utils/actions';
import { shallowCopy, checkNull, toCapitalize } from 'utils/helpers';
import NoData from 'reusable/NoData';
import api from "utils/api";
import EmployeeModal from './EmployeeModal';
import PerformanceReviewModal from 'modules/performance-review/PerformanceReviewModal';
import { setWidth } from 'utils/helpers';
import res from 'assets/img'
const User = (props) => {
  const { match } = props
  const employees = props.appState.employee.employees
  const { id } = match.params
  const fileInput = useRef()
  const [process, setProcess] = useState({
    loading: false,
    pending: false,
    message: "Loading Data..."
  })
  const [user, setUser] = useState(null)
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  const _initProcess = (key, val) => {
    let _temp_process = shallowCopy(process);
    _temp_process[key] = val;
    setProcess(_temp_process);
  }

  const fields = [
    ["firstname", "middlename", "lastname"],
    ["gender", "birthdate", "mobileno", "email",],
    ["street", "city", "coutry"],
    ["department", "role", "status"],
    ["SSS" ,"PHIL HEALTH" ,"PAG-IBIG"]
  ];

  const renderContent = (key) => {
    let val = checkNull(user[key])
    switch (key) {
      case "address":
        return { key, value: `${checkNull(user.street)} ,${checkNull(user.city)} ,${checkNull(user.country)} ` }
      case "mobileno":
        return { key: "Mobile No.", value: val }
      default:
        if (key.includes("name")) {
          val = toCapitalize(val)
        }
        return { key: toCapitalize(key), value: val }
    }
  }

  const UploadButtonHandler = () => {
    //  call api upload
  }
  const FileInputChangeHandler = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    _initProcess("pending", true);
    setSelectedFile(e.target.files[0])
  }


  useEffect(() => {
    for (let idx = 0; idx < employees.length; idx++) {
      let el = employees[idx]
      if (el.employeeId.toString() === id.toString()) {
        setUser(el);
        break
      }
    }
    if (!selectedFile) {
      setPreview(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile, employees])


  // if (!user) {
  //   return <NoData {...{ title: process.message }} />
  // } else {
  return (
    user ?
      <CRow className="justify-content-center">
        <CCol {...setWidth("12")}>
          <CCard>
            <CCardHeader>
              <CRow className="mb-2">
                <CCol sm="5">
                  <h3>Employee Information</h3>
                </CCol>
                <CCol sm="7" className="d-none d-md-block">
                  <div className="float-right px-2" >
                    <EmployeeModal isUpdate data={user} />
                  </div>
                  <div className="float-right" >
                    <PerformanceReviewModal {...{ user }} />
                  </div>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CRow gutters={false} className="">
                <CCol {...setWidth("3")} className="px-1 py-1 mr-3">
                  {/* image */}

                  <div style={
                    {
                      backgroundImage: `url(${preview || (user.profile_pic || res.logoSm)})`,
                      backgroundSize: "contain",
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      maxHeight: "200px",
                      height: "200px",
                      width: "100%",
                      border:"1px solid dark"
                    }
                  }></div>
                  <input type="file" accept="image/*" value={process.file} ref={fileInput} hidden onChange={FileInputChangeHandler} />
                  <CButton
                    onClick={() => {
                      fileInput.current.click();
                    }}
                    className="mr-1 mt-3"
                    block
                    color="primary">
                    {/* {
                        disabled ? <CSpinner color="secondary" size="sm" /> : !isUpdate ? "Submit" : "Update"
                    } */}
                    Change Profile Image
                </CButton>

                  <CButton
                    onClick={UploadButtonHandler}
                    className="mr-1 mt-3"
                    block
                    disabled={!process.pending}
                    color="primary">
                    Upload
                </CButton>
                </CCol>
                <CCol>
                  <CForm>
                    {fields.map((_field, idx) => {
                      return <CRow key={idx} gutters={false} >
                        {
                          _field.map((field) => {
                            let val = renderContent(field).value
                            return <CCol className="px-1" {...setWidth((12 / _field.length).toString())} key={field}>
                              <CFormGroup>
                                <CLabel htmlFor="name"> <strong>{renderContent(field).key} </strong></CLabel>
                                <CInput id="text-input" name="text-input" readOnly value={val && val} placeholder={!val ? "UNSET" : ""} />
                              </CFormGroup>
                            </CCol>
                          }
                          )
                        }
                      </CRow>
                    })}
                  </CForm>

                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> :
      <NoData {...{ title: process.message }} />
  )
}
// }

export default User
