import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { CButton, CSelect, CRow, CCol, CContainer, CForm, CFormGroup, CLabel, CInput, CInvalidFeedback, CAlert, CSpinner } from '@coreui/react'
import { Modal, LoadingButton, ConfirmDialog } from 'reusable'
import { actionCreator, ActionTypes } from 'utils/actions'
import api from "utils/api";
import { APP_MESSAGES, ROLE, ACCOUNT_ROLES } from 'utils/constants/constant';
import { RULES, shallowCopy, getAge } from 'utils/helpers'
import { fetchEmployeeAccounts } from 'utils/helpers/fetch';
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
}
const defaultEmployee = {
    role: "",
    accountType: "",
    // department: "",
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

const EmployeeModal = ({ isUpdate = false, data = null, retrieveEmployees = null }) => {
    let dispatch = useDispatch();
    const modal = useRef();
    const dialog = useRef();
    const [employee, createEmployee] = useState(!data ? defaultEmployee : data)
    const [errors, setError] = useState(defaultErrors)
    const [disabled, setDisabled] = useState(false);
    const departments = useSelector(state => state.appState.department.departments)
    const [responseError, setResponseError] = useState();

    const handleOnChange = (event) => {
        setResponseError('')
        let _errors = shallowCopy(errors)
        let Employee = shallowCopy(employee)
        let { name, value } = event.target
        _errors[name] = false
        setError(_errors)
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

        if (name.includes("name")) {
            return nameRules(value)
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
            dispatch(actionCreator(ActionTypes.ADD_EMPLOYEE, employee))
            fetchEmployeeAccounts(dispatch)
        } else {
            setResponseError(res.message);
        }
        setDisabled(false)
        modal.current.toggle()
        modalOnClose();
    }



    const validate = () => {
        let _errors = shallowCopy(errors)
        Object.entries(employee).map(([key, value]) => {
            let valid = validateInfo(key, value);
            _errors[key] = valid === true ? false : valid
        })
        setError(_errors)
        let isValid = true;
        _.values(_errors).map(err => {
            if (err !== false) {
                isValid = false
            }
        })
        //
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
                                            invalid={errors.firstname !== false}
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
                                            invalid={errors.middlename !== false}
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
                                            invalid={errors.lastname !== false}
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
                                            invalid={errors.gender !== false}
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
                                            invalid={errors.birthdate !== false}
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
                                            invalid={errors.role !== false}
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
                                            invalid={errors.department !== false}
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
                                            invalid={errors.mobileno !== false}
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
                                            invalid={errors.email !== false}
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
                                            invalid={errors.street !== false}
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
                                            invalid={errors.city !== false}
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
                                            invalid={errors.country !== false}
                                            value={employee.country || ""}
                                            placeholder="Enter Country.."
                                        />
                                        {renderFeedback(APP_MESSAGES.INPUT_REQUIRED)}
                                    </CFormGroup>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row className="my-0">
                                <CCol xs="4">
                                    <CFormGroup>
                                        <CLabel>SSS NO.</CLabel>
                                        <CInput
                                            onChange={handleOnChange}
                                            name="sss"
                                            //valid={!errors.street}
                                            // invalid={errors.sss !== false}
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
