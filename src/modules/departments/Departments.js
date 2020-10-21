import React, { useState, useRef, useEffect } from 'react';
import {
  CRow,
  CCol,
  CButton,
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Card, Modal } from 'reusable'
import AddDepartment from './component/AddDepartment'
import { useSelector } from 'react-redux'
import DepartmentModel from "models/DepartmentHeadModel"
import { shallowCopy } from 'utils/helpers';

const Departments = () => {

  const employees = useSelector(state => {
    let emp = state.appState.employee.employees;
    return emp.map(e => {
      return {
        name: `${e.firstname} ${e.lastname}`,
        employeeId: e.employeeId
      }
    })
  })

  const [data, setData] = useState(DepartmentModel)
  const [isValid, setIsValid] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = () => { // Lacking submit department
    console.log("submit")
    console.log(data)
    toggleModal()
  }

  const modal = useRef();

  const toggleModal = () => {
    setData(DepartmentModel)
    modal.current.toggle();
  };

  const onChange = (e) => { // value is employee ID
    let key = e.target.name
    let value = e.target.value
    let copy = shallowCopy(data)
    copy[key] = value
    setData(copy)
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
      <CRow>
        <CCol sm="6" lg="3">
          <Card
            clickable
            centeredText
            height={200}
            text="Department Name"
          />
        </CCol>
        <CCol sm="6" lg="3">
          <Modal
            ref={modal}
            centered
            title="Add Department"
            modalOnClose={toggleModal}
            hidden
            closeButton
            footer={
              <>
                <CButton color="primary" disabled={hasErrors || isLoading} onClick={handleSubmit}>
                  {
                    isLoading ? <CSpinner color="secondary" size="sm" /> : 'Submit'
                  }
                </CButton>
              </>
            }
          >
            <AddDepartment {...{ employees, onChange, data }} />
          </Modal>
          <Card
            text={
              <CIcon size={"xl"} color="primary" name={"cil-plus"} />
            }
            clickable
            centeredText
            height={200}
            onClickMethod={toggleModal}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default Departments
