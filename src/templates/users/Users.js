import React, { useState, useEffect, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPopover
} from '@coreui/react'
import { DropZone, NoData } from 'reusable'
import UserModal from './UserModal'
import Icon from '@mdi/react'
import { mdiTrashCan, mdiAccountEdit } from '@mdi/js';
import colors from 'assets/theme/colors';

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const Users = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [modal, setModal] = useState(false)
  const [users, setUsers] = useState([])
  const [mode, setMode] = useState(0)
  const [user, setUser] = useState(null)
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }
  const dzoneRef = useRef();
  const removeUser = (id) => {
    setUsers(val => {
      return val.filter(el => {
        return el.id.toString() !== id.toString()
      })
    })
  }

  const checkObjectKeys = (obj) => {
    let keys = Object.keys(obj)
    let expectedKeys = [
      'firstname',
      'lastname',
      'address',
      'gender',
      'birthdate',
      'role',
      'mobileno',
      'age',
      'status',
    ]
    let result = true;
    keys.map(key => {
      if (!expectedKeys.includes(key)) {
        result = false;
      }
    })
  }
  useEffect(() => {

    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
    <CRow className="justify-content-center">
      <CModal
        show={modal}
        size="lg"
        onClose={() => {
          setModal(false)
          setMode(0)
          if (dzoneRef?.current) dzoneRef.current.reset();
        }}
      >
        <CModalHeader closeButton>
          <CModalTitle>{mode === 1 ? 'Import Data from file' : user ? 'Update User' : 'Add New User'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {
            mode === 1 ?
              <DropZone ref={dzoneRef} setUsers={setUsers} setModal={setModal} /> :
              <UserModal setUsers={setUsers} setModal={setModal} user={user} />
          }
        </CModalBody>
      </CModal>
      <CCol xl={10}>
        <CCard>
          <CCardHeader>
            Users
            <div className="card-header-actions">
              <CLink className="card-header-action">
                <CButton color="primary" onClick={() => {
                  setUser(null)
                  setMode(0)
                  setModal(true)
                }}>Add New</CButton>
              </CLink>
              <CLink className="card-header-action">
                <CButton color="primary" onClick={() => {
                  setMode(1)
                  setModal(true)
                }}>Import from file</CButton>
              </CLink>
            </div>
          </CCardHeader>
          <CCardBody className='pt-1'>
            <CDataTable
              outlined
              itemsPerPageSelect
              items={users}
              noItemsViewSlot={<NoData />}
              fields={[
                { key: 'name', _classes: 'font-weight-bold' },
                'birthdate',
                'status',
                'gender',
                'age',
                'mobileno',
                'address',
                'role',
                {
                  key: 'action',
                  _classes: 'text-center',
                  _style: { width: '20%' },
                  sorter: false,
                  filter: false,
                }
              ]}
              hover
              pagination
              itemsPerPage={users.length >= 5 ? 5 : users.length}
              activePage={page}
              // clickableRows
              // onRowClick={(item) => history.push(`/users/${item.id}`)}
              scopedSlots={{
                'name': (item) => (
                  <td>
                    {item.firstname} {item.lastname}
                  </td>
                ),
                'action':
                  (item) => (
                    <td className='text-center'>
                      <CPopover header={`Edit`}>
                        <CButton onClick={() => {
                          setUser(item)
                          setMode(0)
                          setModal(true)
                        }}>
                          <Icon path={mdiAccountEdit}
                            size={0.8}
                            horizontal
                            vertical
                            rotate={180}
                            color={colors.$green}
                          />
                        </CButton>
                      </CPopover>
                      <CPopover header={'Delete'}>
                        <CButton onClick={() => {
                          removeUser(item.id)
                        }} >
                          <Icon path={mdiTrashCan}
                            size={0.8}
                            horizontal
                            vertical
                            rotate={180}
                            color={colors.$red}
                          />
                        </CButton>
                      </CPopover>
                    </td>
                  )
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow >
  )
}

export default Users
