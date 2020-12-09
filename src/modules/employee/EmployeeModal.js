import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { CButton, CSelect, CRow, CCol, CContainer, CForm, CFormGroup, CLabel, CInput, CInvalidFeedback, CAlert, CSpinner } from '@coreui/react'
import { Modal, LoadingButton, ConfirmDialog } from 'reusable'
import { actionCreator, ActionTypes } from 'utils/actions'
import api from "utils/api";
import { APP_MESSAGES, ROLE, ACCOUNT_ROLES } from 'utils/constants/constant';
import { RULES, shallowCopy, getAge } from 'utils/helpers'
import { fetchEmployeeAccounts, retrieveEmployees } from 'utils/helpers/fetch';
import _ from 'lodash';

const defaultErrors = {
  firstname: false,
  lastname: false,
  middlename: false,
  birthdate: false,
  email: false,
  mobileno: false,
  role: false,
  // department: false,
  gender: false,
  street: false,
  city: false,
  country: false,
  sss: false,
  phil_health_no: false,
  pag_ibig_no: false,

}
const defaultEmployee = {
  role: null,
  accountType: null,
  firstname: "",
  lastname: "",
  middlename: "",
  gender: "",
  mobileno: "",
  birthdate: "",
  email: "",
  street: "",
  city: "",
  country: "",
  sss: "",
  phil_health_no: "",
  pag_ibig_no: "",
  isActive: 1

}

const EmployeeModal = ({ isUpdate = false, data = null }) => {
  let dispatch = useDispatch();
  const modal = useRef();
  const dialog = useRef();
  const [employee, createEmployee] = useState(!data ? shallowCopy(defaultEmployee) : data)
  const [errors, setError] = useState(defaultErrors)
  const [disabled, setDisabled] = useState(false);
  const [responseError, setResponseError] = useState();

  const handleOnChange = (event) => {
    setResponseError('')
    setError(defaultErrors)
    let _errors = shallowCopy(errors)
    let Employee = shallowCopy(employee)
    let { name, value } = event.target
    _errors[name] = false
    if (name === "role") {
      let { role, accountType } = JSON.parse(value)
      Employee['role'] = role;
      Employee["accountType"] = +accountType;
    } else {
      Employee[name] = value;
    }
    createEmployee(Employee)
  }

  const validateInfo = (name, value) => {
    const { ageRules, nameRules, numberRules, emailRules } = RULES
    if (name === "birthdate") {
      return ageRules(getAge(value))
    }

    if (['firstname', 'lastname'].includes(name)) {
      return nameRules(value)
    }

    if (name === 'middlename' && value !== "") {
      return nameRules(value)
    } else {
      return false
    }

    if (name === "mobileno") {
      return numberRules(value)
    }

    if (name === "email") {
      return emailRules(value)
    }

    if (['sss', 'phil_health_no', 'pag_ibig_no'].includes(name)) {
      return false
    }
    return value !== "" || APP_MESSAGES.INPUT_REQUIRED;
  }

  // const addEmployee = async () => {
  //     let res = await api.post("/create_employee", employee)
  //     if (!res.error) {
  //         employee.id = res.data.id
  //         dispatch(actionCreator(ActionTypes.ADD_EMPLOYEE, employee))
  //     }
  //     // else {
  //     //     setError(res.message)
  //     // }
  // }
  // const updateEmployee = async () => {
  //     let res = await api.post("/create_employee", employee)
  //     if (!res.error) {
  //         employee.id = res.data.id
  //         dispatch(actionCreator(ActionTypes.ADD_EMPLOYEE, employee))
  //     }
  //     // else {
  //     //     setError(res.message)
  //     // }
  // }

  const modalOnClose = () => {
    if (!isUpdate) {
      createEmployee(defaultEmployee)
    }
    setError(defaultErrors)
    setResponseError('');
  }

  const onSubmit = async () => {
    setDisabled(true)
    let path = isUpdate ? "update_employee" : "create_employee"
    let payload = shallowCopy(employee)
    if (isUpdate) {
      payload["employeeId"] = data.employeeId;
    }
    let res = await api.post(`/${path}`, payload)
    if (!res.error) {
      let fetched = await retrieveEmployees(dispatch);
      if (fetched.error) {
        dispatch(actionCreator(ActionTypes.ADD_EMPLOYEE, res.data.employee_information[0]))
      }
      await fetchEmployeeAccounts(dispatch)
    } else {
      setResponseError(res.message);
    }
    setDisabled(false)
    modal.current.toggle()
    modalOnClose();
  }



  const validate = () => {

    let _errors = shallowCopy(defaultErrors)
    let {
      role,
      firstname,
      lastname,
      middlename,
      gender,
      mobileno,
      birthdate,
      email,
      city,
      country,
      pag_ibig_no,
      phil_health_no,
      sss
    } = employee;
    let checkRequired = val => RULES.required(val)
    _errors['role'] = checkRequired(role);
    _errors['firstname'] = RULES.nameRules(firstname);
    _errors['lastname'] = RULES.nameRules(lastname);
    _errors['gender'] = checkRequired(gender);
    _errors['mobileno'] = RULES.numberRules(mobileno);
    _errors['birthdate'] = RULES.ageRules(getAge(birthdate));
    _errors['city'] = checkRequired(city);
    _errors['country'] = checkRequired(country);
    _errors['email'] = checkRequired(email);
    _errors['middlename'] = false;
    if (middlename && middlename.length) {
      _errors['middlename'] = RULES.nameRules(middlename);
    }
    // if (sss.length) {
    //   _errors['sss'] = RULES.numberRules(sss);
    // }
    // if (phil_health_no.length) {
    //   _errors['phil_health_no'] = RULES.numberRules(phil_health_no);
    // }
    // if (pag_ibig_no.length) {
    //   _errors['pag_ibig_no'] = RULES.numberRules(pag_ibig_no);
    // }
    setError(_errors)
    let isValid = true;
    _.values(_errors).map(err => {
      if (typeof err == 'string') {
        isValid = false
      }
    })
    //valid
    if (isValid) {
      dialog.current.toggle()
    }
  }


  const renderFeedback = (message) => {
    return message !== false &&
      <CInvalidFeedback className="help-block">
        {message}
      </CInvalidFeedback>
  }

  return (
    <Modal ref={modal} {...{
      modalOnClose,
      size: "lg",
      title: isUpdate ? "Update Details" : "Add Employee",
      color: "warning",
      footer:
        <>
          <LoadingButton  {...{ isLoading: disabled, submit: validate, btnText: !isUpdate ? "Submit" : "Update" }} />
          {/* <CButton
                        disabled={disabled}
                        onClick={validate}
                        className="mr-1"
                        color="primary">
                        {
                            disabled ? <CSpinner color="secondary" size="sm" /> : !isUpdate ? "Submit" : "Update"
                        }
                    </CButton> */}
        </>
    }}>

      <CContainer fluid>
        <ConfirmDialog
          id="cutom_dialog"
          ref={dialog}
          {...{
            onConfirm: () => {
              onSubmit();
            },
            title: "Please confirm.",
          }}
        ></ConfirmDialog>
        <CRow>
          <CCol sm="12">
            {responseError && responseError.length > 0 ? <CAlert color="danger justify-content-center text-align-center">{responseError}</CAlert> : null}
            <CForm action="" method="post" >
              <CFormGroup row className="my-0">
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel>Firstname</CLabel>
                    <CInput
                      onChange={handleOnChange}
                      name="firstname"
                      value={employee.firstname || ""}
                      placeholder="Enter Firstname"
                      invalid={typeof errors.firstname !== 'boolean'}
                    //valid={!errors.firstname} 
                    />
                    {renderFeedback(errors.firstname)}
                  </CFormGroup>
                </CCol>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel>Middlename</CLabel>
                    <CInput
                      onChange={handleOnChange}
                      name="middlename"
                      value={employee.middlename || ""}
                      placeholder="Enter Middlename"
                      invalid={typeof errors.middlename !== 'boolean'}
                    />
                    {renderFeedback(errors.middlename)}

                  </CFormGroup>
                </CCol>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel>Lastname</CLabel>
                    <CInput
                      onChange={handleOnChange}
                      name="lastname"
                      value={employee.lastname || ""}
                      placeholder="Enter Lastname"
                      invalid={typeof errors.lastname !== 'boolean'}
                    />
                    {renderFeedback(errors.lastname)}

                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup row className="my-0">
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel>Gender</CLabel>
                    <CSelect onChange={handleOnChange}
                      value={employee.gender}
                      invalid={typeof errors.gender !== 'boolean'}
                      name="gender">
                      {
                        !employee.gender && <option value="" hidden>Select Gender</option>
                      }
                      <option value='male'>Male</option>
                      <option value='female'>Female</option>
                    </CSelect>
                    {renderFeedback(APP_MESSAGES.INPUT_REQUIRED)}
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel>Birthdate</CLabel>
                    <CInput
                      type='date'
                      //valid={!errors.birthdate}
                      onChange={handleOnChange}
                      name="birthdate"
                      invalid={typeof errors.birthdate !== 'boolean'}
                      onChange={handleOnChange}
                      value={employee.birthdate || ""}
                      placeholder="Enter Birthdate.."
                    />
                    {renderFeedback(errors.birthdate)}
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup row className="my-0">
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel>Role</CLabel>
                    <CSelect
                      onChange={handleOnChange}
                      name="role"
                      // value={employee.role || ""}
                      invalid={typeof errors.role !== 'boolean'}
                    >
                      {
                        !employee.role && <option value="" hidden>Select Role</option>
                      }

                      {ACCOUNT_ROLES.map(role => {
                        return (
                          <optgroup label={role.category} key={role.category}>
                            {
                              role.roles.map((_role, idx) => {
                                return (<option value={JSON.stringify({ role: _role, accountType: role.accountType })} key={idx} >{_role}</option>)
                              })
                            }
                          </optgroup>)

                      })}
                    </CSelect>
                    {renderFeedback(APP_MESSAGES.INPUT_REQUIRED)}
                  </CFormGroup>
                </CCol>
                {/* <CCol xs="6">
                                    <CFormGroup>
                                        <CLabel>Department</CLabel>
                                        <CSelect onChange={handleOnChange}
                                            value={employee.department}
                                            invalid={ typeof errors.department !== false}
                                            name="department">
                                            <option value="" hidden>Select Department</option>
                                            {
                                                departments.map(dept => <option key={dept.department_id} value={dept.department_id}>{dept.department_name}</option>)
                                            }

                                        </CSelect>
                                        {renderFeedback(APP_MESSAGES.INPUT_REQUIRED)}
                                    </CFormGroup>
                                </CCol> */}
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel>Mobile Number</CLabel>
                    <CInput
                      invalid={typeof errors.mobileno !== 'boolean'}
                      //valid={!errors.mobileno}
                      onChange={handleOnChange}
                      name="mobileno"
                      value={employee.mobileno}
                      placeholder="Enter Mobile Number.."

                    />
                    {renderFeedback(errors.mobileno)}
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup row className="my-0">

                <CCol xs="6">
                  <CFormGroup>
                    <CLabel>Email</CLabel>
                    <CInput
                      onChange={handleOnChange}
                      name="email"
                      //valid={!errors.email}
                      value={employee.email || ""}
                      invalid={typeof errors.email !== 'boolean'}
                      placeholder="Enter Email.."

                    />
                    {renderFeedback(errors.email)}
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel>Status</CLabel>
                    <CSelect onChange={handleOnChange}
                      value={employee.isActive}
                      disabled={!isUpdate}
                      name="isActive">
                      <option value="" hidden>{isUpdate ? employee.isActive === 1 ? 'Active' : 'Inactive' : 'Select Status'}</option>
                      {
                        [{ status: 'Active', value: 1 },
                        { status: 'Inctive', value: 0 }]
                          .map(st => <option key={st.value} value={st.value}>{st.status}</option>)
                      }
                    </CSelect>
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup row className="my-0">
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel>Street</CLabel>
                    <CInput
                      onChange={handleOnChange}
                      name="street"
                      //valid={!errors.street}
                      invalid={typeof errors.street !== 'boolean'}
                      value={employee.street || ""}
                      placeholder="Enter Street.."

                    />
                    {renderFeedback(APP_MESSAGES.INPUT_REQUIRED)}
                  </CFormGroup>
                </CCol>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel>City</CLabel>
                    <CInput
                      onChange={handleOnChange}
                      //valid={!errors.city}
                      name="city"
                      invalid={typeof errors.city !== 'boolean'}
                      value={employee.city || ""}
                      placeholder="Enter City.."

                    />
                    {renderFeedback(APP_MESSAGES.INPUT_REQUIRED)}
                  </CFormGroup>
                </CCol>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel>Country</CLabel>
                    <CInput
                      onChange={handleOnChange}
                      name="country"
                      //valid={!errors.country}
                      invalid={typeof errors.country !== 'boolean'}
                      value={employee.country || ""}
                      placeholder="Enter Country.."
                    />
                    {renderFeedback(APP_MESSAGES.INPUT_REQUIRED)}
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup row className="my-0 d-none">
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel>SSS NO.</CLabel>
                    <CInput
                      onChange={handleOnChange}
                      name="sss"
                      invalid={typeof errors.sss !== 'boolean'}
                      value={employee.sss || ""}
                      placeholder="SSS NO."

                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel>PHIL HEALTH NO.</CLabel>
                    <CInput
                      onChange={handleOnChange}
                      invalid={typeof errors.phil_health_no !== 'boolean'}
                      name="phil_health_no"
                      value={employee.phil_health_no || ""}
                      placeholder="PHIL HEALTH NO."

                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel>PAGIBIG NO.</CLabel>
                    <CInput
                      onChange={handleOnChange}
                      invalid={typeof errors.pag_ibig_no !== 'boolean'}
                      name="pag_ibig_no"
                      value={employee.pag_ibig_no || ""}
                      placeholder="PAGIBIG NO."
                    />
                  </CFormGroup>
                </CCol>
              </CFormGroup>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
    </Modal>
  )
}

export default EmployeeModal;
