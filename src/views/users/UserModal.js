import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import { CButton, CModal, CRow, CCol, CModalBody, CModalHeader, CModalFooter, CContainer, CForm, CFormGroup, CLabel, CInput, CFormText, } from '@coreui/react'
import {Modal} from 'reusable'
import {actionCreator , ActionTypes} from 'utils/actions'
const Usermodal = () => {
    let dispatch = useDispatch();
    const [employee, createEmployee] = useState({
        // name: "",
        // status: "",
        // role: ""
        firstname: "",
        lastname: "",
        middlename: "",
        gender: "",
        mobilenumber:"",
        birthdate:"",
        email:"",
        street: "",
        city: "",
        country: ""

    })

    const addEmployee = () => {
        console.log(employee);
        
        dispatch(actionCreator(ActionTypes.ADD_EMPLOYEE, employee))

    }
    const handleOnChange = (event) => {
        let Employee = Object.assign({}, employee)
        Employee[event.target.name] = event.target.value
        createEmployee(Employee)

    }
    
    return (
        <Modal {...{
            title: "Add Employee",
            color: "warning",
            footer:
                <CButton onClick={addEmployee} className="mr-1" color="warning">
                    Add
                </CButton>

        }}>

            <CContainer fluid>
                <CRow>
                    <CCol sm="12">
                        <CForm action="" method="post">
                            <CFormGroup>
                                <CLabel>Firstname</CLabel>
                                <CInput
                                    onChange={handleOnChange}

                                    name="firstname"
                                    value={employee.firstname || ""}
                                    placeholder="Enter Firstname"
                                />
                                <CFormText className="help-block">Please enter your Firstname</CFormText>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Lastname</CLabel>
                                <CInput
                                    onChange={handleOnChange}

                                    name="lastname"
                                    value={employee.lastname || ""}
                                    placeholder="Enter Lastname.."

                                />
                                <CFormText className="help-block">Please enter your Lastname</CFormText>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Middlename</CLabel>
                                <CInput
                                    onChange={handleOnChange}
                                    name="middlename"
                                    value={employee.middlename || ""}
                                    placeholder="Enter Middlename.."

                                />
                                <CFormText className="help-block">Please enter your Middlename</CFormText>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Gender</CLabel>
                                <CInput
                                    onChange={handleOnChange}
                                    name="gender"
                                    value={employee.gender || ""}
                                    placeholder="Enter Gender.."

                                />
                                <CFormText className="help-block">Please enter your Gender</CFormText>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Mobile Number</CLabel>
                                <CInput
                                    onChange={handleOnChange}
                                    name="mobilenumber"
                                    value={employee.mobilenumber || ""}
                                    placeholder="Enter Mobile Number.."

                                />
                                <CFormText className="help-block">Please enter your Mobile Number</CFormText>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Birthdate</CLabel>
                                <CInput
                                    onChange={handleOnChange}
                                    name="birthdate"
                                    value={employee.birthdate || ""}
                                    placeholder="Enter Birthdate.."
                                    

                                />
                                <CFormText className="help-block">Please enter your Birthdate</CFormText>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Email</CLabel>
                                <CInput
                                    onChange={handleOnChange}
                                    name="email"
                                    value={employee.email || ""}
                                    placeholder="Enter Email.."

                                />
                                <CFormText className="help-block">Please enter your Email</CFormText>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Street</CLabel>
                                <CInput
                                    onChange={handleOnChange}
                                    name="street"
                                    value={employee.street || ""}
                                    placeholder="Enter Street.."

                                />
                                <CFormText className="help-block">Please enter your Street</CFormText>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>City</CLabel>
                                <CInput
                                    onChange={handleOnChange}
                                    name="city"
                                    value={employee.city || ""}
                                    placeholder="Enter City.."

                                />
                                <CFormText className="help-block">Please enter your City</CFormText>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Country</CLabel>
                                <CInput
                                    onChange={handleOnChange}
                                    name="country"
                                    value={employee.country || ""}
                                    placeholder="Enter Country.."

                                />
                                <CFormText className="help-block">Please enter your Country</CFormText>
                            </CFormGroup>
                        </CForm>
                    </CCol>
                </CRow>
            </CContainer>
        </Modal>
    )
}

export default Usermodal;