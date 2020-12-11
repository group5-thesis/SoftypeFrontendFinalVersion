import React, { useState, useRef, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CRow,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CForm,
  CButton,
  CSpinner,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import { config } from "utils/config";
import { useDispatch } from "react-redux";
import { actionCreator, ActionTypes } from "utils/actions";
import { checkNull, toCapitalize, dispatchNotification } from "utils/helpers";
import api from "utils/api";
import EmployeeModal from "modules/employee/EmployeeModal";
import { setWidth } from "utils/helpers";
import res from "assets/img";
import Icon from "@mdi/react";
import { mdiAccountCogOutline, mdiAccountStar } from '@mdi/js';
import PerfomanceReview from "./PerformanceReview";

const MyAccount = (props) => {
  let _process = {
    loading: false,
    pending: false,
    uploading: false,
  };
  const user = props.appState.auth.user;
  const tab = user.roleId !== 3 ? 0 : sessionStorage.getItem("_tab") ? +sessionStorage.getItem("_tab") : 0
  const dispatch = useDispatch();
  const history = useHistory();
  const fileInput = useRef();
  const [process, setProcess] = useState(_process);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  let baseUrl = `${!config.IS_DEV ? config.API_URL_BASE_LIVE : config.API_URL_BASE_DEV}/file/images`
  let fullname = `${toCapitalize(user.firstname)} ${
    user.middlename && toCapitalize(user.middlename) + " "
    }${toCapitalize(user.lastname)}`
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
    let val = user[key];
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
      case "SSS":
        val = user['sss'] || ''
      case "PHIL HEALTH":
        val = user['phil_health_no'] || ''
      case "PAG-IBIG":
        val = user['pag_ibig_no'] || ''
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
    payload.append("userId", +user.userId);
    _initProcess("uploading", true);
    dispatchNotification(dispatch, { type: 'info', message: 'Please wait' })
    let res = await api.post("/update_profile/img", payload, true);
    _initProcess("uploading", false);
    if (!res.error) {
      _initProcess("pending", false);
      let updated = res.data[0];
      // debugger
      dispatchNotification(dispatch, { type: 'success', message: 'Success' })
      dispatch(actionCreator(ActionTypes.FETCH_PROFILE_SUCCESS,updated));
    } else {
      dispatchNotification(dispatch, { type: 'error', message: res.message })
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
    return () => {
      sessionStorage.removeItem('_tab')
      URL.revokeObjectURL(objectUrl)
    };
  }, [selectedFile]);

  return (
    <>
      <CCard>
        <CCardBody>
          <CTabs activeTab={tab} onActiveTabChange={(e) => {
            sessionStorage.setItem("_tab", e)
          }}>
            <CNav variant="tabs" className="my-tabs">
              <CNavItem  >
                <CNavLink>
                  <Icon path={mdiAccountCogOutline} size={1} />My Profile
                </CNavLink>
              </CNavItem>
              {
                user.roleId === 3 &&
                <CNavItem >
                  <CNavLink>
                    <Icon path={mdiAccountStar} size={1} />My Ratings
                </CNavLink>
                </CNavItem>
              }
            </CNav>
            <CTabContent>
              <CTabPane>
                <CRow className="justify-content-center">
                  <CCol {...setWidth("12")}>
                    <CCard>
                      <CCardBody>
                        <CRow gutters={false} className="">
                          <CCol {...setWidth("3")} className="px-1 py-1 mr-3">
                            <img
                              alt={fullname}
                              src={preview ? preview : user.profile_img ? `${baseUrl}/${user.profile_img}` : res.logoSm}
                              style={{ width: "100%" ,maxHeight:'200px' }}
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
                            <CButton
                              block
                              className="mr-1 mt-3"
                              disabled={process.uploading}
                              color="primary"
                              onClick={() => {
                                history.push("/change-password")
                              }}
                            >
                              Change Password
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
                                              readOnly
                                              value={val || ''}
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
              </CTabPane>
              <CTabPane>
                <PerfomanceReview />
              </CTabPane>
            </CTabContent>
          </CTabs>
        </CCardBody>
      </CCard>
    </>
  );
};
// }

export default MyAccount;
