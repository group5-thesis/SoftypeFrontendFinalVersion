import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { CButton } from '@coreui/react'
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
import usermodal from './UserModal.js'

import usersData from './UsersData'
import Usermodal from './UserModal.js';

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
// let modalE = (condition) => {
//   if(condition){
//     return <Usermodal></Usermodal>
//   }
// }

const Users = () => {
  let modalE = false;
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
    // modalE(!modal)
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
      <br></br>
      <Usermodal></Usermodal>
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
