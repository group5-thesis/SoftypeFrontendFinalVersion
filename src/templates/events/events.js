import React, { useState } from 'react';
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm, CFormGroup, CInput, CLabel, CListGroup, CListGroupItem, CRow, CSelect, CSpinner, CTextarea, CWidgetDropdown, CWidgetIcon, CWidgetSimple } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { setWidth, toCapitalize, getAge, formatDate } from "utils/helpers";
import validator from "utils/helpers/validator";
import APP_MESSAGES from 'utils/helpers/Consts';
import events from 'mock_data/Events'
import { MONTHS } from 'utils/constants/constant'
import ChartLineSimple from 'templates/charts/ChartLineSimple';


const Events = ({ match }) => {

    console.table(events)
    const [loading, setLoading] = useState(false)

    return (
        <CRow className="justify-content-center">
            <CCol xl={7}>
                <CCard>
                    <CCardHeader>
                        <h2> Events </h2>
                    </CCardHeader>
                    <CCardBody className='pt-2'>
                        <CListGroup accent>
                            {
                                events.map(event => {
                                    const { startDate } = event;
                                    let date = new Date(startDate);
                                    let month = MONTHS[date.getMonth()].substring(0, 3);
                                    let day = date.getDate();
                                    return (
                                        <div className="card" key={event.id}>
                                            <div className="d-flex align-items-center">
                                                <div className="bg-gradient-primary p-3 mfe-3">
                                                    <div className="text-value text-primary">
                                                        <h4>
                                                            {day}
                                                        </h4>
                                                    </div>
                                                    <div className="text-secondary text-uppercase font-weight-bold small">{month}</div>
                                                </div>
                                                <div>
                                                    <div className="text-value text-uppercase text-primary">
                                                        <h3>{event.title}</h3>
                                                    </div>
                                                    <div className="text-muted  font-weight-bold small">{event.startDate} - {event.endDate}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )

                                })
                            }
                        </CListGroup>
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol xl={5}>
                <CCard>
                    <CCardHeader>
                        <strong> Calendar View </strong>
                    </CCardHeader>
                    <CCardBody className='pt-1'>

                    </CCardBody>
                </CCard>
            </CCol>
        </CRow >
    )
}

export default Events
