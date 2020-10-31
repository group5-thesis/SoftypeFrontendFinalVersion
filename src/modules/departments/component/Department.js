import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CRow,
  CCol,
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CSpinner,
  CImg
} from '@coreui/react'
import { copyArray, setWidth } from 'utils/helpers';
import { NoData, Card, Modal } from 'reusable';
import { mdiPlus } from '@mdi/js';
import colors from "assets/theme/colors"
import AddDepartmentManager from './AddDepartmentManager'
import DepartmentManager from "models/DepartmentManagerModel"
import Icon from '@mdi/react';
import { mdiAccountRemoveOutline, mdiAccountPlusOutline, mdiMinus } from '@mdi/js';
import api from 'utils/api';

const Department = ({ match }) => {

  const [hasErrors, setHasErrors] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const modal = useRef();

  const _request = useSelector(state => {
    return state.appState.department.departments.filter(el => {
      return el.department_id.toString() === match.params.id.toString()
    })
  })

  const employees = useSelector((state) => {
    return state.appState.employee.employees
  });


  let request = copyArray(_request);
  if (!request.length) {
    return <NoData />
  }

  const departmentDetails = request[0]

  const toggleModal = () => {
    // setData(DepartmentModel)
    modal.current.toggle();
  };

  const validate = () => {
    console.log("submit")
    // let _errors = shallowCopy(errors)
    // Object.entries(data).map(([key, value]) => {
    //   let valid = validateInfo(key, value);
    //   _errors[key] = valid === true ? false : valid
    // })
    // setError(_errors)
    // let isValid = true;
    // _.values(_errors).map(err => {
    //   if (err !== false) {
    //     isValid = false
    //   }
    // })
    // if (isValid) {
    //   handleSubmit()
    // }
  }

  // useEffect(() => {
  //   retrieve_managers()
  // }, []);

  return (
    <CRow className="justify-content-center">
      <CCol {...setWidth("12")}>
        <Modal
          ref={modal}
          centered
          title="Add Department Manager"
          hidden
          modalOnClose={() => {
            modal.current.toggle()
          }}
          closeButton
          footer={
            <>
              <CButton color="primary" onClick={() => {
                toggleModal()
              }}>Submit</CButton>
              <CButton color="danger" onClick={() => {
                modal.current.toggle()
              }}>Cancel</CButton>
            </>
          }
          hideCancelButton
        >
          <AddDepartmentManager {...{ employees, validate }} />
        </Modal>
        <CCard>
          <CCardHeader>
            <CRow className="mb-2">
              <CCol sm="6">
                <h4>{`Department: ${departmentDetails.department_name}`}</h4>
              </CCol>
              <CCol sm="6" className="d-none d-md-block">
                <div className="float-right" >
                  <CButton color="primary" onClick={() => {
                    modal.current.toggle()
                  }}>Add Department Employees</CButton>
                </div>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CRow gutters={false} className="">
              <CCol {...setWidth("3")} sm="6" lg="4" className="px-1 py-1 mr-3">
                <h5>Department Head: {departmentDetails.department_head}</h5>
                {/* image */}
                <CImg
                  // src={process.perview ? process.perview : res.logoSm}
                  thumbnail
                  shape="rounded"
                  width="100%"
                />
                {/* <input type="file" accept="image/*" value={process.file} ref={fileInput} hidden onChange={FileInputChangeHandler} /> */}
                <input type="file" accept="image/*" hidden />
                <CButton
                  // onClick={() => {
                  //   fileInput.current.click();
                  // }}
                  className="mr-1 mt-3"
                  block
                  color="primary">
                  {/* {
                      disabled ? <CSpinner color="secondary" size="sm" /> : !isUpdate ? "Submit" : "Update"
                  } */}
                  Update details
              </CButton>
              </CCol>
              <CCol sm="6" lg="4" className="px-1 py-1 mr-3">
                <table className="table table-hover " style={{ borderBottom: "1px solid grey" }}>
                  <tbody>

                    <tr>
                      <td className="text-capitalize"><b>M: {"Rangie Laurente"}</b></td>
                      <td>
                        <CButton size="sm" color="primary">
                          <Icon
                            path={mdiAccountPlusOutline}
                            size={1}
                            horizontal
                            vertical
                            rotate={180}
                          />
                        </CButton>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Department
