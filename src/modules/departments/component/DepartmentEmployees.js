import React, { useState, useRef, useEffect } from 'react';
import { setWidth } from 'utils/helpers';
import {
  CRow,
  CCol,
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CSpinner,
  CImg
} from '@coreui/react';
import { NoData, Card, Modal } from 'reusable';
import colors from "assets/theme/colors"
import AddDepartmentEmployee from './AddDepartmentEmployee'
import {
  mdiPlus
} from '@mdi/js';
import Icon from '@mdi/react';
import api from 'utils/api';

const DepartmentEmployees = ({ match }) => {

  const modal = useRef();

  const [managers, setManagers] = useState([])

  const retrieve_managers = async () => {
    let res = await api.post('/retrieve_managers_by_department', { departmentId: match.params.dept });
    if (!res.error) {
      setManagers(res.data.department_managers)
    } else {
      alert('error');
    }
  }

  const toggleModal = () => {
    // setData(DepartmentManager)
    // setError(defaultErrors)
    modal.current.toggle();
  };

  useEffect(() => {
    retrieve_managers();
  }, [])

  return (
    <>
      <CRow className="justify-content-center">
        <CCol {...setWidth("12")}>
          <Modal
            ref={modal}
            centered
            title="Add Department Employee"
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
            <AddDepartmentEmployee {...{managers}}/>
          </Modal>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol sm="5">
                  <h4 className="card-title mb-0">{`Department Manager: ${"Test"}`}</h4>
                </CCol>
                <CCol sm="7" className="d-none d-md-block">
                  <div className="float-right">
                    <CButton color="primary" onClick={() => {
                      modal.current.toggle()
                    }}>Add Department Employees</CButton>
                  </div>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CRow>
                {/* {
                  managers.map((key, index) => {
                    console.log(key);
                    return ( */}
                <CCol sm="6" lg="3" className="px-1 py-1" >
                  <Card
                    clickable
                    height={200}
                    animation
                    setImg
                    // text={
                    //   `${key.manager_firstname} ${key.manager_lastname}`
                    // }
                    // dept_role={key.role}
                    textClass={"font-weight-bold"}
                    textRoleStyle={{ position: 'absolute', left: '50%', top: '70%', transform: 'translate(-50%, -50%)' }}
                    imgClass={"img_dept"}
                    textStyle={{ position: 'absolute', left: '50%', top: '60%', transform: 'translate(-50%, -50%)' }}
                  // onClickMethod={() => {
                  //   viewEmployees(key.managerId)
                  // }}
                  />
                </CCol>
                {/* )
                  })
                } */}
                <CCol sm="6" lg="3" className="px-1 py-1" >
                  <Card
                    clickable
                    height={200}
                    animation
                    setImg
                    // text={
                    //   `${key.manager_firstname} ${key.manager_lastname}`
                    // }
                    // dept_role={key.role}
                    textClass={"font-weight-bold"}
                    textRoleStyle={{ position: 'absolute', left: '50%', top: '70%', transform: 'translate(-50%, -50%)' }}
                    imgClass={"img_dept"}
                    textStyle={{ position: 'absolute', left: '50%', top: '60%', transform: 'translate(-50%, -50%)' }}
                  // onClickMethod={() => {
                  //   viewEmployees(key.managerId)
                  // }}
                  />
                </CCol>
                <CCol sm="6" lg="3">
                  <Card
                    animation
                    text={
                      <Icon path={mdiPlus}
                        size={4}
                        horizontal
                        vertical
                        rotate={180}
                        color={colors.$grey}
                      />
                    }
                    isIcon
                    clickable
                    centeredText
                    height={200}
                    onClickMethod={() => {
                      console.log("test")
                    }}
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow >
    </>
  )
}

export default DepartmentEmployees;
