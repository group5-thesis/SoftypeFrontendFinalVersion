import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CRow, CCol, CCardFooter } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch } from 'react-redux'
import { actionCreator, ActionTypes } from 'utils/actions';
import { shallowCopy, checkNull, toCapitalize } from 'utils/helpers';
import NoData from 'reusable/NoData';
import api from "utils/api";
import EmployeeModal from './EmployeeModal';

const User = (props) => {
  const { match } = props
  const employees = props.appState.employee.employees
  const { id } = match.params
  const usersData = employees.filter(el => {
    return el.employeeId.toString() === id.toString()
  })

  const user = usersData.length ? usersData[0] : null
  if (!user) {
    return <NoData />
  }

  const fields = [
    "firstname",
    "lastname",
    "middlename",
    "gender",
    "birthdate",
    "mobileno",
    "email",
    "address",
    "department",
    "role",
    "status"
  ];

  const renderContent = (key) => {
    let val = checkNull(user[key]) || "N/A"
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
  return (

    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            <strong>Employee Details</strong>
          </CCardHeader>
          <CCardBody style={{ maxHeight: "400px", overflowY: "auto" }}>
            <table className="table">
              <tbody>
                {
                  fields.map((field, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{`${renderContent(field).key}`}</td>
                        <td><strong>{renderContent(field).value}</strong></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </CCardBody>
          <CCardFooter>
            <div className={`float-right`} >
              <EmployeeModal isUpdate data={user} />
            </div>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>

  )
}

export default User
