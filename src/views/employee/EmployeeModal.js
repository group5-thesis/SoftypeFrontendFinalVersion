import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { CButton, CModal, CSelect, CRow, CCol, CDropdown, CDropdownItem, CDropdownToggle, CDropdownMenu, CContainer, CForm, CFormGroup, CLabel, CInput, CFormText, } from '@coreui/react'
import { Modal } from 'reusable'
import { actionCreator, ActionTypes } from 'utils/actions'
import api from "utils/api"
const EmployeeModal = () => {
    let dispatch = useDispatch();
    const [employee, createEmployee] = useState({
        roleId: "",
        department: "",
        firstname: "",
        lastname: "",
        middlename: "",
        gender: "",
        mobileno: "",
        birthdate: "",
        email: "",
        street: "",
        city: "",
        country: ""

    },
    )

    const addEmployee = async () => {
        let res = await api.post("/create_employee", employee)
        console.log(res)
        if (!res.error) {
            dispatch(actionCreator(ActionTypes.ADD_EMPLOYEE, employee))
        } else {
            alert(res.message);
        }

    }
    const handleOnChange = (event) => {
        let Employee = Object.assign({}, employee)
        Employee[event.target.name] = event.target.value
        createEmployee(Employee)

    }

    // POST  /create_employee {
    //     'firstname' => 'required',
    //     'middlename' => 'required',
    //     'lastname' => 'required',
    //     'mobileno' => 'required',
    //     'birthdate' => 'required',
    //     'email' => 'required',
    //     'gender' => 'required',
    //     'street' => 'required',
    //     'city' => 'required',
    //     'country' => 'required',
    //     'roleId' => 'required',
    //     }
    //     $table->string('firstname');
    //     $table->string('middlename');
    //     $table->string('lastname');
    //     $table->string('mobileno');
    //     $table->date('birthdate');
    //     $table->string('email')->unique();
    //     $table->string('gender');
    //     $table->string('profileImage');
    //     $table->string('street');
    //     $table->string('city');
    //     $table->string('country');
    //     $table->integer('roleId');
    //     @renzy

    return (
        <Modal {...{
            title: "Add Employee",
            color: "warning",
            footer:
                <CButton
                    onClick={addEmployee}
                    className="mr-1"
                    color="warning">
                    Add
                </CButton>

        }}>

            <CContainer fluid>
                <CRow>
                    <CCol sm="12">
                        <CForm action="" method="post" >
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
                                <CLabel>Role</CLabel>
                                <CSelect onChange={handleOnChange} name="roleId">
                                    {/* <option value="N/A"></option>/ */}
                                    <option value="1">Mdsadsadase</option>
                                    <option value="2">Femadsadsadasdsle</option>
                                </CSelect>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Gender</CLabel>
                                <CSelect onChange={handleOnChange} name="gender">
                                    {/* <option value="N/A"></option> */}
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </CSelect>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Department</CLabel>
                                <CSelect onChange={handleOnChange} name="department">
                                    {/* <option value="N/A"></option> */}
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
                                    value={employee.mobileno || ""}
                                    placeholder="Enter Mobile Number.."

                                />
                                <CFormText className="help-block">Please enter your Mobile Number</CFormText>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Birthdate</CLabel>
                                <CInput
                                    type='date'
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

export default EmployeeModal;