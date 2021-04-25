import React, { useState, useEffect, useLayoutEffect } from "react";
import {
    CCard,
    CCardBody,
    CRow,
    CCol,
    CFormGroup,
    CInput,
    CLabel,
    CForm,
    CSelect,
    CModalFooter,
    CButton,
    CSpinner,
} from "@coreui/react";
import { setWidth, toCapitalize, getAge, formatDate } from "utils/helpers";
import validator from "utils/helpers/validator";
import APP_MESSAGES from 'utils/helpers/Consts';

const UserModal = (props) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        address: '',
        gender: '',
        birthdate: '',
        role: '',
        mobileno: '',
        age: '0',
        status: '',
    })
    let _process = {
        loading: false,
        pending: false,
        uploading: false,
    };

    const fields = [
        [
            {
                name: "firstname",
                rules: validator.isLettersOnly,
                errorMessage: APP_MESSAGES.error.onlyLettersInName,
                props: { placeholder: 'John', }
            },
            {
                name: "lastname",
                rules: validator.isLettersOnly,
                errorMessage: APP_MESSAGES.error.onlyLettersInName,
                props: { placeholder: 'Doe' }
            }
        ],
        [{
            name: "gender",
            type: 'select',
            options: ['male', 'female']
        },
        {
            name: "mobileno", props: {
                placeholder: '09xxxxxxxxx'
            }
        }],
        [
            {
                name: "birthdate", placeholder: '', type: 'date', props: {
                    max: formatDate(Date.now())
                }
            },
            { name: "age", placeholder: '', disabled: true }],
        [
            {
                name: "role", type: 'select',
                options: ['pastor', 'leader', 'member']
            },
            {
                name: "status", label: 'marital status',
                type: 'select',
                options: ['single', 'married', 'widowed', 'divorced', 'separated']
            }
        ],
        [{
            name: "address", props: {
                placeholder: ''
            }
        }],
    ];

    const updateUser = (name, value) => {
        let newUser = { ...user, [name]: value }
        return setUser(newUser)
    }

    const submit = () => {
        let { setModal, setUsers } = props;

        setUsers(val => {
            let newUser = { id: Date.now(), ...user }
            return [...val, newUser]
        });
        setModal(false);
    }

    useEffect(() => {
        if (user.birthdate) {
            updateUser('age', getAge(user.birthdate))
        }
        return () => {
        };
    }, [user.birthdate]);

    useLayoutEffect(() => {
        if (props.user) {
            setUser(props.user)
        }
        // do side effects
        return () => { }/* cleanup */
    }, [props.user]);

    return (
        <>
            <CCard>
                <CCardBody>
                    <CRow gutters={false} className="">
                        <CCol>
                            <CForm>
                                {fields.map((_field, idx) => {
                                    return (
                                        <CRow key={idx} gutters={false}>
                                            {_field.map((field) => {
                                                let val = null
                                                return (
                                                    <CCol
                                                        className="px-1"
                                                        {...setWidth((12 / _field.length).toString())}
                                                        key={field.name}
                                                    >
                                                        <CFormGroup>
                                                            <CLabel htmlFor="name">
                                                                {" "}
                                                                <strong>{toCapitalize(field.label || field.name)}</strong>
                                                            </CLabel>
                                                            {
                                                                field.type !== 'select' && <CInput
                                                                    {...field?.props}
                                                                    name={field.name}
                                                                    type={field.type || 'text'}
                                                                    onChange={(e) => {
                                                                        let { name, value } = e.target;
                                                                        if (field.hasOwnProperty('rules')) {
                                                                            if (!field.rules(value) && value != '') {
                                                                                return alert(field.errorMessage)
                                                                            }
                                                                        }
                                                                        return updateUser(name, value)
                                                                    }}
                                                                    disabled={field.disabled}
                                                                    value={user[field.name]}
                                                                />

                                                            }

                                                            {
                                                                field.type === 'select' && <CSelect
                                                                    onChange={(e) => {
                                                                        let { name, value } = e.target;
                                                                        updateUser(name, value)
                                                                    }}
                                                                    value={user[field.name]}
                                                                    name={field.name}>
                                                                    {
                                                                        !user[field.name] && <option value="" hidden>Select {field.label || field.name}</option>
                                                                    }
                                                                    {
                                                                        field.options.map(option => <option key={option} value={option}>{toCapitalize(option)}</option>)
                                                                    }

                                                                </CSelect>
                                                            }

                                                        </CFormGroup>
                                                    </CCol>
                                                );
                                            })}
                                        </CRow>
                                    );
                                })}
                            </CForm>
                        </CCol>
                    </CRow>
                    <CRow className="justify-content-center">
                        <CCol col="6" sm="4" md="2" xl={4} className="mb-3 mb-xl-0">
                            <CButton onClick={submit} block color="primary"> {loading ? (
                                <CSpinner color="secondary" size="sm" />
                            ) : (
                                "Submit"
                            )}</CButton>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </>
    );
};
// }

export default UserModal;
