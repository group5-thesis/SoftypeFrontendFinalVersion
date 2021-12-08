import React, { useState } from 'react';
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm, CFormGroup, CInput, CLabel, CRow, CSelect, CSpinner, CTextarea, CWidgetSimple } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { setWidth, toCapitalize, getAge, formatDate } from "utils/helpers";
import validator from "utils/helpers/validator";
import APP_MESSAGES from 'utils/helpers/Consts';

const fields = [
    [
        {
            name: "Title",
            required: true,
            isInput: true,
            props: { placeholder: 'Title' }
        },
    ],
    [
        {
            name: "Description",
            required: true,
            type: 'textarea',
            props: { placeholder: 'Add more description', }
        },
    ],
    [
        {
            name: "startDate", label: 'Start Date', isInput: true, type: 'date', props: {
                min: formatDate(Date.now())
            }
        },
        {
            name: "endDate", label: 'End Date', isInput: true, type: 'date'
        },
    ],
    [
        {
            name: "startTime", label: 'Start Time', isInput: true, type: 'time', props: {
                min: formatDate(Date.now())
            }
        },
        {
            name: "endTime", label: 'End Time', isInput: true, type: 'time'
        },
    ]
];


const Announcements = ({ match }) => {

    const [loading, setLoading] = useState(false)



    return (
        <CRow className="justify-content-center">
            <CCol xl={7}>
                <CCard>
                    <CCardHeader>
                        <strong> Create Event </strong>
                    </CCardHeader>
                    <CCardBody className='pt-1'>
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
                                                            field.isInput && <CInput
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
                                                                    // return updateUser(name, value)
                                                                }}
                                                                disabled={field.disabled}
                                                            // value={user[field.name]}
                                                            />
                                                        }
                                                        {
                                                            field.type === 'textarea' && <CTextarea
                                                                {...field?.props}
                                                                name={field.name}
                                                                rows={5}
                                                                type={field.type || 'text'}
                                                                onChange={(e) => {
                                                                    let { name, value } = e.target;
                                                                    if (field.hasOwnProperty('rules')) {
                                                                        if (!field.rules(value) && value != '') {
                                                                            return alert(field.errorMessage)
                                                                        }
                                                                    }
                                                                    // return updateUser(name, value)
                                                                }}
                                                                disabled={field.disabled}
                                                            // value={user[field.name]}
                                                            />

                                                        }

                                                        {
                                                            field.type === 'select' && <CSelect
                                                                onChange={(e) => {
                                                                    let { name, value } = e.target;
                                                                    // updateUser(name, value)
                                                                }}
                                                                // value={user[field.name]}
                                                                name={field.name}>
                                                                {/* {
                                                                    !user[field.name] && <option value="" hidden>Select {field.label || field.name}</option>
                                                                } */}
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
                    </CCardBody>
                    <CCardFooter>
                        <CRow className="justify-content-center">
                            <CCol col="6" sm="4" md="2" xl={4} className="mb-3 mb-xl-0">
                                <CButton block color="primary"> {loading ? (
                                    <CSpinner color="secondary" size="sm" />
                                ) : (
                                    "Submit"
                                )}</CButton>
                            </CCol>
                        </CRow>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow >
    )
}

export default Announcements
