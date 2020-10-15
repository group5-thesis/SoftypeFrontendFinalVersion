import React, { useState } from 'react'
import { CCard, CCardBody, CSelect, CCardHeader, CButton, CRow, CCol, CForm, CFormGroup, CLabel, CInput, CFormText } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreator, ActionTypes } from 'utils/actions';
import { shallowCopy } from 'utils/helpers';
import NoData from 'reusable/NoData';
import { Modal } from 'reusable'
import api from "utils/api";

const User = ({ match }) => {
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState({})

  const usersData = useSelector(state => {
    return state.appState.employee.employees.filter(el => {
      return String(el.id) === String(match.params.id)  
     })
  })
  console.log(usersData)
  const user = usersData[0]
  
  if (!Object.keys(user.length)) {
    return <NoData/>    
  }else{
    shallowCopy(user)
  }

  const handleOnChange = (event) => {
    const dataHolder = shallowCopy(newUser)
    dataHolder[event.target.name] = event.target.value
    setNewUser(dataHolder)
  }


  const UpdateEmployee = async () => {
    let res = await api.post("/update_employee", newUser)
    if (!res.error) {
      dispatch(actionCreator(ActionTypes.UPDATE_EMPLOYEE, newUser))
    }
    
  }

  const userDetails = user ? Object.entries(user) :
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]


  return (

    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            User id: {match.params.id}
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {
                  userDetails.map(([key, value], index) => {
                    return (
                      <tr key={index.toString()}>
                        <td>{`${key}:`}</td>
                        <td><strong>{value}</strong></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <Modal {...{
              title: "Update Employee",
              color: "warning",
              footer:
                <CButton
                  // disabled = {disabled}
                  onClick={UpdateEmployee}
                  className="mr-1"
                  color="warning">
                  Update
          </CButton>
            }}>
              <CRow>
                <CCol sm="12">
                  <CForm action="" method="post" >
                    <CFormGroup>
                      <CLabel>Firstname</CLabel>
                      <CInput
                        onChange={handleOnChange}
                        name="firstname"
                        value={newUser.firstname}
                        placeholder={user.firstname}
                      />
                      <CFormText className="help-block">Please enter your Firstname</CFormText>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Lastname</CLabel>
                      <CInput
                        onChange={handleOnChange}
                        name="lastname"
                        value={newUser.lastname}
                        placeholder={user.lastname}

                      />
                      <CFormText className="help-block">Please enter your Lastname</CFormText>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Middlename</CLabel>
                      <CInput
                        onChange={handleOnChange}
                        name="middlename"
                        value={newUser.middlename}
                        placeholder={user.middlename}

                      />
                      <CFormText className="help-block">Please enter your Middlename</CFormText>
                    </CFormGroup>

                    <CFormGroup>
                      <CLabel>Role</CLabel>
                      <CSelect name="roleId">
                        <option value="" placeholder={user.roleId}></option>
                        <option value={1} >Mdsadsadase</option>
                        <option value={2}>Femadsadsadasdsle</option>
                      </CSelect>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Gender</CLabel>
                      <CSelect name="gender" >
                        <option value="" placeholder={user.gender}></option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                      </CSelect>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Department</CLabel>
                      <CSelect
                        name="department">
                        <option value="" placeholder={user.department}></option>
                        <option value='lodge'>Lodge</option>
                        <option value='cr'>CR</option>
                      </CSelect>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Mobile Number</CLabel>
                      <CInput
                        onChange={handleOnChange}
                        name="mobileno"
                        required
                        value={newUser.mobileno}
                        placeholder={user.mobileno}

                      />
                      <CFormText className="help-block">Please enter your Mobile Number</CFormText>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Birthdate</CLabel>
                      <CInput
                        type='date'
                        onChange={handleOnChange}
                        name="birthdate"
                        value={newUser.birthdate}
                        placeholder={user.birthdate}


                      />
                      <CFormText className="help-block">Please enter your Birthdate</CFormText>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Email</CLabel>
                      <CInput
                        onChange={handleOnChange}
                        name="email"
                        value={newUser.email}
                        placeholder={user.email}

                      />
                      <CFormText className="help-block">Please enter your Email</CFormText>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Street</CLabel>
                      <CInput
                        onChange={handleOnChange}
                        name="street"
                        value={newUser.street}
                        placeholder={user.street}

                      />
                      <CFormText className="help-block">Please enter your Street</CFormText>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>City</CLabel>
                      <CInput
                        onChange={handleOnChange}
                        name="city"
                        value={newUser.city}
                        placeholder={user.city}

                      />
                      <CFormText className="help-block">Please enter your City</CFormText>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Country</CLabel>
                      <CInput
                        onChange={handleOnChange}
                        name="country"
                        value={newUser.country}
                        placeholder={user.country}

                      />
                      <CFormText className="help-block">Please enter your Country</CFormText>
                    </CFormGroup>
                  </CForm>
                </CCol>
              </CRow>
            </Modal>
          </CCardBody>
          {/* <CButtonToolbar justify="end">
            <CButton color="warning" >Update</CButton>
            <CButton color="danger">Delete</CButton>
          </CButtonToolbar> */}

        </CCard>
      </CCol>
    </CRow>

  )
}

export default User
