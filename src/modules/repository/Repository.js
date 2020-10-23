import React, { useState } from 'react'
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CListGroup,
    CListGroupItem,
    CRow,
    CTabContent,
    CTabPane,
    CProgress
} from '@coreui/react'
import CIcon from '@coreui/icons-react';


const Repository = () => {
    const files = [
        {
            uploadedBy: "test",
            date_uplpaded: Date.now(),
            path: "/images/photo.png",
            type: "image",
            description: "test"
        },
        {
            uploadedBy: "test",
            date_uplpaded: Date.now(),
            path: "/images/photo.png",
            type: "image",
            description: "test"
        },
        {
            uploadedBy: "test",
            date_uplpaded: Date.now(),
            path: "/images/photo.png",
            type: "image",
            description: "test"
        },
    ]

    return (
        <>
            <CRow>
                <CCol sm="12" xl="12">
                    <CCard>
                        <CCardHeader>
                            Company Files
                        </CCardHeader>
                        <CCardBody>
                            <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                                <thead className="thead-light">
                                    <tr>
                                        <th>User</th>
                                        {/* <th className="text-center">Country</th>
                                        <th>Usage</th>
                                        <th className="text-center">Payment Method</th> */}
                                        <th>Activity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div>Yiorgos Avraamu</div>
                                            <div className="small text-muted">
                                                <span>New</span> | Registered: Jan 1, 2015
                      </div>
                                        </td>
                                        {/* <td className="text-center">
                                            <CIcon height={25} name="cif-us" title="us" id="us" />
                                        </td>
                                        <td>
                                            <div className="clearfix">
                                                <div className="float-left">
                                                    <strong>50%</strong>
                                                </div>
                                                <div className="float-right">
                                                    <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                                                </div>
                                            </div>
                                            <CProgress className="progress-xs" color="success" value="50" />
                                        </td>
                                        <td className="text-center">
                                            <CIcon height={25} name="cib-cc-mastercard" />
                                        </td> */}
                                        <td>
                                            <div className="small text-muted">Last login</div>
                                            <strong>10 sec ago</strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Repository
