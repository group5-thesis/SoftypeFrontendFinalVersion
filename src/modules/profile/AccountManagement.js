import React, { useState, useRef, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CForm,
  CButton,
  CSpinner,
} from "@coreui/react";
import { config as cnf } from "utils/config";
import { useDispatch } from "react-redux";
import { actionCreator, ActionTypes } from "utils/actions";
import { checkNull, toCapitalize } from "utils/helpers";
import api from "utils/api";
import EmployeeModal from "modules/employee/EmployeeModal";
import { setWidth } from "utils/helpers";
import res from "assets/img";
const MyAccount = (props) => {
  console.log(props);
  let _process = {
    loading: false,
    pending: false,
    uploading: false,
  };
  const user = props.appState.auth.user;
  const dispatch = useDispatch();
  const fileInput = useRef();
  const [process, setProcess] = useState(_process);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const _initProcess = (key, val) => {
    _process[key] = val;
    setProcess(_process);
    console.log(_process);
  };

  const fields = [
    ["firstname", "middlename", "lastname"],
    ["gender", "birthdate", "mobileno", "email"],
    ["street", "city", "coutry"],
    ["department", "role", "status"],
    ["SSS", "PHIL HEALTH", "PAG-IBIG"],
  ];

  const renderContent = (key) => {
    let val = checkNull(user[key]);
    switch (key) {
      case "address":
        return {
          key,
          value: `${checkNull(user.street)} ,${checkNull(
            user.city
          )} ,${checkNull(user.country)} `,
        };
      case "mobileno":
        return { key: "Mobile No.", value: val };
      case "mobileno":
        return { key: "Mobile No.", value: val };
      case "status":
        return { key: toCapitalize(key), value: "Active" };
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
    payload.append("employee_id", +user.employeeId);
    _initProcess("uploading", true);
    let res = await api.post("/update_profile/img", payload, true);
    _initProcess("uploading", false);
    if (!res.error) {
      _initProcess("pending", false);
      let updated = res.data.employee_information;
      dispatch(actionCreator(ActionTypes.FETCH_PROFILE_SUCCESS), updated);
    } else {
      alert(res.message);
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

  useEffect(() => {
    if (!selectedFile) {
      _initProcess("pending", false);
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <CRow className="justify-content-center">
      <CCol {...setWidth("12")}>
        <CCard>
          <CCardHeader>
            <CRow className="mb-2">
              <CCol sm="5">
                <h3>My Profile</h3>
              </CCol>
              <CCol sm="7" className="d-none d-md-block">
                <div className="float-right px-2">
                  <EmployeeModal
                    isUpdate
                    data={user}
                    retrieveEmployees={props.retrieveEmployees}
                  />
                </div>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CRow gutters={false} className="">
              <CCol {...setWidth("3")} className="px-1 py-1 mr-3">
                {(function () {
                  let pic = false;
                  let url = `${cnf.API_URL_DEV}/image/images/${user.profile_img}`;
                  fetch(url, { method: "HEAD" }).then((res) => {
                    if (res.ok) {
                      pic = true;
                    }
                  });
                  return (
                    <div
                      style={{
                        //
                        backgroundImage: `url(${
                          preview
                            ? preview
                            : user.profile_img
                            ? pic
                              ? url
                              : res.logoSm
                            : res.logoSm
                        })`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        maxHeight: "200px",
                        height: "200px",
                        width: "100%",
                        border: "1px solid dark",
                      }}
                    ></div>
                  );
                })()}
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
                  disabled={process.uploading}
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
    </CRow>
  );
};
// }

export default MyAccount;
