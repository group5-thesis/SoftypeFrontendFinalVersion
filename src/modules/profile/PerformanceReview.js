import React, { useState, useEffect, useRef } from 'react';
import { CBadge, CCard, CCardBody, CCol, CDataTable, CCollapse, CRow, CButton } from "@coreui/react";
import { QUESTIONS, RATINGS } from 'utils/constants/constant'
import colors from 'assets/theme/colors';
import { NoData } from 'reusable';
const PerformanceReview = ({ reviews = [] }) => {
    const fields = [
        { key: 'month_reviewed', label: "Month", _style: { width: '10%', textAlign: 'center' } },
        { key: 'c1', label: QUESTIONS[0] },
        { key: 'c2', label: QUESTIONS[1] },
        { key: 'c3', label: QUESTIONS[2] },
        { key: 'c4', label: QUESTIONS[3] },
        { key: 'c5', label: QUESTIONS[4] },
        { key: 'reviewer', label: 'Reviewer', _style: { width: '10%', textAlign: 'center' } },
    ]

    const renderRating = rating => {
        if (rating) {
            let arr = new Array(rating).fill("x")
            return (<td >
                {arr.map((i, idx) => {
                    return <span key={idx} style={{ color: colors.$orange, fontSize: 20 }}> &#9733;</span>
                })}
                <p>{RATINGS[rating.toString()]}</p>

            </td>)
        }
        return null
    }

    return (
        <CRow>
            <CCol xl={12}>
                <CCard>
                    <CCardBody>
                        <CDataTable
                            items={reviews}
                            fields={fields}
                            itemsPerPageSelect
                            itemsPerPage={12}
                            hover
                            pagination
                            noItemsViewSlot={<NoData title="No Reviews" />}
                            scopedSlots={{
                                month_reviewed: item => {
                                    return <td>
                                            <span style={{ whiteSpace: 'pre-line', fontSize: 20 }}>{'\n'}</span>
                                            <p>{item.month_reviewed}</p>
                                        </td>
                                },
                                c1: item => {
                                    return renderRating(item.criteria_1)
                                },
                                c2: item => {
                                    return renderRating(item.criteria_2)
                                },
                                c3: item => {
                                    return renderRating(item.criteria_3)
                                },
                                c4: item => {
                                    return renderRating(item.criteria_4)
                                },
                                c5: item => {
                                    return renderRating(item.criteria_5)
                                },
                                reviewer: item => {
                                    return <td>
                                            <span style={{ whiteSpace: 'pre-line', fontSize: 20 }}>{'\n'}</span>
                                            <p>{item.reviewer}</p>
                                        </td>
                                },

                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow >
    )
}

export default PerformanceReview
