import React, { useState, useRef, useEffect } from "react";
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
  CSpinner,
} from "@coreui/react";
import { config } from "utils/config";
import { useDispatch, useSelector } from "react-redux";
import { actionCreator, ActionTypes } from "utils/actions";
import {

  checkNull,
  toCapitalize,
  getBaseUrl,
} from "utils/helpers";
import NoData from "reusable/NoData";
import api from "utils/api";
import EmployeeModal from "./EmployeeModal";

import { setWidth } from "utils/helpers";
import { Redirect } from 'react-router-dom'
import Icon from '@mdi/react'
import { mdiCircleMedium } from '@mdi/js';
import res from "assets/img";
import colors from "assets/theme/colors";
const EmployeeDetails = (props) => {
  let _process = {
    loading: false,
    pending: false,
    uploading: false,
  };
  const { match } = props;
  const employees = props.appState.employee.employees;
  const user = props.appState.auth.user;
  const dispatch = useDispatch();
  const { id } = match.params;
  const fileInput = useRef();
  const [process, setProcess] = useState(_process);
  const [employee, setEmployee] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [tab, setTab] = useState(0)
  const [reviews, setReviews] = useState([])
  const [fullname, setFullname] = useState("F")
  const stateReviews = useSelector(state => {
    return state.appState.performance_review.performance_reviews;
  })
  let baseUrl = `${!config.IS_DEV ? config.API_URL_BASE_LIVE : config.API_URL_BASE_DEV}/file/images`
  const dept_head_employee = useSelector(state => {
    return state.appState.employee.employees.filter(emp => {
      return emp.employeeId === user.employeeId
    })
  })

  const _initProcess = (key, val) => {
    _process[key] = val;
    setProcess(_process);
  };


  const fields = [
    ["firstname", "middlename", "lastname"],
    ["gender", "birthdate", "mobileno", "email"],
    ["street", "city", "coutry"],
    ["department", "role", "status"],
    // ["SSS", "PHIL HEALTH", "PAG-IBIG"],
  ];

  const renderContent = (key) => {
    let val = checkNull(employee[key]);
    switch (key) {
      case "address":
        return {
          key,
          value: `${checkNull(employee.street)} ,${checkNull(
            employee.city
          )} ,${checkNull(employee.country)} `,
        };
      case "mobileno":
        return { key: "Mobile No.", value: val };
      case "status":
        return { key: toCapitalize(key), value: employee['isActive'] === 1 ? "Active" : "Inactive" };
      default:
        if (key.includes("name")) {
          val = toCapitalize(val);
        }
        return { key: toCapitalize(key), value: val };
    }
  };

  const UploadButtonHandler = async () => {
    //  call api upload
    let payload = new FormData();
    payload.append("file", selectedFile);
    payload.append("employee_id", +employee.employeeId);
    payload.append("userId", +employee.userId);
    _initProcess("uploading", true);
    let res = await api.post("/update_profile/img", payload, true);
    _initProcess("uploading", false);
    if (!res.error) {
      _initProcess("pending", false);
      let updated = res.data.employee_information;
      setEmployee(updated);
      dispatch(actionCreator(ActionTypes.UPDATE_EMPLOYEE, updated));
    } else {
      dispatch(actionCreator(ActionTypes.TOGGLE_NOTIFICATION, { type: 'error', message: res.message }));
    }
    return;
  };
  const FileInputChangeHandler = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      _initProcess("pending", false);
      return;
    }
    _initProcess("pending", true);
    setSelectedFile(e.target.files[0]);
  };

  const getReviews = empId => {
    let myReviews = stateReviews.filter(review => review.employee_reviewedId.toString() === empId.toString());
    setReviews(myReviews)
  }

  useEffect(() => {

    for (let idx = 0; idx < employees.length; idx++) {
      let el = employees[idx];
      if (el.employeeId.toString() === id.toString()) {
        setEmployee(el);
        getReviews(el.employeeId)
        setFullname(`${toCapitalize(el.firstname)} ${el.middlename && toCapitalize(el.middlename) + " "
          }${toCapitalize(el.lastname)}`);
        break;
      }
    }
    if (!selectedFile) {
      _initProcess("pending", false);
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, employees, employee]);


  if (user.employeeId.toString() === id) {
    return <Redirect to="/myAccount" />
  }

  // let url = `${getBaseUrl()}/file/images/${employee.profile_img}`

  return employee ? (
    <CRow className="justify-content-center">
      <CCol {...setWidth("12")}>
        <CCard>
          <CCardHeader>
            <CRow className="mb-2">
              <CCol sm="5">
                <h3>Employee {tab == 0 ? 'Information' : 'Reviews'}
                  <sup>
                    <Icon path={mdiCircleMedium} color={employee.isActive === 1 ? colors.$green : colors.$red} size={1} />
                  </sup>
                </h3>
              </CCol>
              <CCol sm="7" className="d-none d-md-block">
                <div className="float-right">
                  {
                    <CButton
                      block
                      onClick={() => {
                        setTab(tab === 0 ? 1 : 0)
                      }}
                      color='primary'
                    >
                      View {tab == 1 ? 'Information' : 'Reviews'}
                    </CButton>
                  }
                </div>
                <div className="float-right px-2">
                  {
                    // (user.accountType === 1 || employee.department_managerId === user.employeeId || employee.department_headId === user.employeeId) &&
                    user.accountType === 1 &&
                    <EmployeeModal
                      isUpdate
                      data={employee}
                      retrieveEmployees={props.retrieveEmployees}
                    />
                  }
                </div>

              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CRow gutters={false} className="">
              <CCol {...setWidth("3")} className="px-1 py-1 mr-3">

                <img
                  alt={fullname}
                  src={preview ? preview : employee.profile_img ? `${baseUrl}/${employee.profile_img}` : res.logoSm}
                  style={{ width: "100%", maxHeight: '200px' }}
                />
                <input
                  type="file"
                  accept="image/*"
                  value={process.file}
                  ref={fileInput}
                  hidden
                  onChange={FileInputChangeHandler}
                />
                <CButton
                  onClick={() => {
                    fileInput.current.click();
                  }}
                  className="mr-1 mt-3"
                  block
                  disabled={employee.isActive !== 1 || process.uploading}
                  color="primary"
                >
                  Change Profile Image
                </CButton>

                <CButton
                  onClick={UploadButtonHandler}
                  className="mr-1 mt-3"
                  block
                  disabled={
                    (process.uploading && true) || (!process.pending && true)
                  }
                  color="primary"
                >
                  {process.uploading ? (
                    <CSpinner color="secondary" size="sm" />
                  ) : (
                    "Upload"
                  )}
                </CButton>
              </CCol>
              <CCol>
                <CForm>
                  {fields.map((_field, idx) => {
                    return (
                      <CRow key={idx} gutters={false}>
                        {_field.map((field) => {
                          let val = renderContent(field).value;
                          return (
                            <CCol
                              className="px-1"
                              {...setWidth((12 / _field.length).toString())}
                              key={field}
                            >
                              <CFormGroup>
                                <CLabel htmlFor="name">
                                  {" "}
                                  <strong>{renderContent(field).key} </strong>
                                </CLabel>
                                <CInput
                                  id="text-input"
                                  invalid={field === 'status' && employee.isActive !== 1}
                                  name="text-input"
                                  readOnly
                                  value={val && val}
                                  placeholder={!val ? "UNSET" : ""}
                                />
                              </CFormGroup>
                            </CCol>
                          );
                        })}
                      </CRow>
                    );
                  })}
                </CForm>
              </CCol>
            </CRow>

          </CCardBody>
        </CCard>
      </CCol>
    </CRow >
  ) : (
    <NoData />
  );
};
export default EmployeeDetails;

