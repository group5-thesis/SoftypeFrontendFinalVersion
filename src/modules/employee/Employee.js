import React from 'react'
import { CCard, CCardBody,CSelect, CCardHeader, CButton, CRow, CCol, CForm, CFormGroup, CLabel, CInput, CFormText } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useSelector } from 'react-redux'
import { actionCreator, ActionTypes } from 'utils/actions';
import { shallowCopy } from 'utils/helpers';
import NoData from 'reusable/NoData';
import { Modal } from 'reusable'
import employee from './EmployeeModal'


const User = ({ match }) => {
  const usersData = useSelector(state => {
    // show:false
    return state.appState.employee.employees
    
  })
  const user = usersData.find(user => String(user.id) === match.params.id)
  if (!Object.keys(user).length) {
    return <NoData />
  }
  // const UpdateEmployee = async () =>{
  //   let res = await api.post("/update_employee", employee)
  //   if(!res.error){
  //     console.log(res)
  //     dispatch(actionCreator(ActionTypes.UPDATE_EMPLOYEE, employee))

  //   }
  // }
  // const updateData = async () => {
  //   let newUser = shallowCopy(user[0])

  //unsaon pag reuse sa form ?????????? wa kuy alamag ani.......

  // firstname : newUser.firstname
  // lastname : newUser.lastname
  // middlename : newUser.middlename
  // roleId : newUser.roleId
  // department : newUser.department
  // gender : newUser.gender
  // mobileno : newUser.mobileno
  // bithdate : newUser.birthdate
  // email : newUser.email
  // street : newUser.street
  // city : newUser.city
  // country : newUser.country

  // }


  const userDetails = user ? Object.entries(user) :
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  const handleOnChange = () => {
    let newUser = shallowCopy(user[0])
     newUser.firstname 
  }



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
                  // onClick={addEmployee}
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
                          // onChange={handleOnChange}

                          name="firstname"
                          value={employee.firstname || ""}
                          placeholder={user.firstname}
                        />
                        <CFormText className="help-block">Please enter your Firstname</CFormText>
                      </CFormGroup>
                      <CFormGroup>
                                <CLabel>Lastname</CLabel>
                                <CInput
                                    

                                    name="lastname"
                                    value={employee.lastname || ""}
                                    placeholder={user.lastname}

                                />
                                <CFormText className="help-block">Please enter your Lastname</CFormText>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Middlename</CLabel>
                                <CInput
                                    
                                    name="middlename"
                                    value={employee.middlename || ""}
                                    placeholder={user.middlename}

                                />
                                <CFormText className="help-block">Please enter your Middlename</CFormText>
                            </CFormGroup>

                            <CFormGroup>
                                <CLabel>Role</CLabel>
                                <CSelect  name="roleId">
                                    <option value="" placeholder={user.roleId}></option>
                                    <option value={1} >Mdsadsadase</option>
                                    <option value={2}>Femadsadsadasdsle</option>
                                </CSelect>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Gender</CLabel>
                                <CSelect  name="gender" >
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
                                    
                                    name="mobileno"
                                    required
                                    value={employee.mobileno || ""}
                                    placeholder={user.mobileno}

                                />
                                <CFormText className="help-block">Please enter your Mobile Number</CFormText>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Birthdate</CLabel>
                                <CInput
                                    type='date'
                                    
                                    name="birthdate"
                                    value={employee.birthdate || ""}
                                    placeholder={user.birthdate}


                                />
                                <CFormText className="help-block">Please enter your Birthdate</CFormText>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Email</CLabel>
                                <CInput
                                   
                                    name="email"
                                    value={employee.email || ""}
                                    placeholder={user.email}

                                />
                                <CFormText className="help-block">Please enter your Email</CFormText>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Street</CLabel>
                                <CInput
                                  
                                    name="street"
                                    value={employee.street || ""}
                                    placeholder={user.street}

                                />
                                <CFormText className="help-block">Please enter your Street</CFormText>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>City</CLabel>
                                <CInput
                                    
                                    name="city"
                                    value={employee.city || ""}
                                    placeholder={user.city}

                                />
                                <CFormText className="help-block">Please enter your City</CFormText>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Country</CLabel>
                                <CInput
                                    
                                    name="country"
                                    value={employee.country || ""}
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
