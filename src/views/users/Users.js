import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { CButton, CModal, CModalBody, CModalHeader, CModalFooter, CContainer, CForm, CFormGroup, CLabel, CInput, CFormText, } from '@coreui/react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'

import usersData from './UsersData'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

// const addRow = ()=>{
//   var items = items //functional component this nga keyword is not applicable
//   // console.log(items)
//   items.push('new row');
//   this.setState({items : items}) //wala kay state :) 
// }


const Users = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }

  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [items, setitems] = useState(usersData)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
    <>
      <CButton
        color="warning"
        onClick={toggle}
        className="mr-1"
      >Add Employee</CButton>
      <CModal
        className="fade"
        show={modal}
        onClose={toggle}
      >
        <CModalHeader closeButton>Modal title</CModalHeader>
        <CContainer fluid>
          <CRow>
            <CCol sm="12">
              <CForm action="" method="post">
                <CFormGroup>
                  <CLabel htmlFor="nf-email">Email</CLabel>
                  <CInput
                    type="email"
                    id="nf-email"
                    name="nf-email"
                    placeholder="Enter Email.."
                    autoComplete="email"
                  />
                  <CFormText className="help-block">Please enter your email</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-password">Password</CLabel>
                  <CInput
                    type="password"
                    id="nf-password"
                    name="nf-password"
                    placeholder="Enter Password.."
                    autoComplete="current-password"
                  />
                  <CFormText className="help-block">Please enter your password</CFormText>
                </CFormGroup>
              </CForm>
            </CCol>
          </CRow>
        </CContainer>
        
        {/* <CModalBody>
          Lorem ipsum dolor...
        </CModalBody> */}
        <CModalFooter>
          {/* <CButton color="warning">Update</CButton>{' '} */}
          {/* <CButton color="danger">Delete</CButton> */}
          <CButton
            color="secondary"
            onClick={toggle}
          >Cancel</CButton>
        </CModalFooter>
      </CModal>
      <br></br>
      {/* </> */}
      <CRow>
        <CCol xl={6}>
          <CCard>
            <CCardHeader>
              Users
            <small className="text-muted"> example</small>
              {/* <button id="addBtn" onClick={addRow} type="button" class="btn btn-warning">Add</button> */}
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={usersData}
                fields={[
                  { key: 'name', _classes: 'font-weight-bold' },
                  'registered', 'role', 'status'
                ]}
                hover
                striped
                itemsPerPage={5}
                activePage={page}
                clickableRows
                onRowClick={(item) => history.push(`/users/${item.id}`)}
                scopedSlots={{
                  'status':
                    (item) => (
                      <td>
                        <CBadge color={getBadge(item.status)}>
                          {item.status}
                        </CBadge>
                      </td>
                    )
                }
                }

              />

              <CPagination
                activePage={page}
                onActivePageChange={pageChange}
                pages={5}
                doubleArrows={false}
                align="center"
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}




export default Users
