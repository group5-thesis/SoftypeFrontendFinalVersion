import React, { useState, useEffect, useRef } from 'react';
import { CBadge, CCard, CCardBody, CCol, CDataTable, CCollapse, CRow, CButton } from "@coreui/react";
import { QUESTIONS, RATINGS } from 'utils/constants/constant'
import colors from 'assets/theme/colors'
const PerformanceReview = () => { // Performance details lacking

    const dummyData = [
        {
            month: 'January',
            c1: 5,
            c2: 4,
            c3: 3,
            c4: 2,
            c5: 1,
            "reviewed by": "Yol"
        },
        {
            month: 'Febuary',
            c1: 1,
            c2: 2,
            c3: 3,
            c4: 5,
            c5: 5,
            "reviewed by": "Yol"
        },

    ]

    const fields = [
        { key: 'month', _style: { width: '5%', textAlign: 'center' } },
        { key: 'c1', label: QUESTIONS[0] },
        { key: 'c2', _style: { width: '20%' }, label: QUESTIONS[1] },
        { key: 'c3', label: QUESTIONS[2] },
        { key: 'c4', label: QUESTIONS[3] },
        { key: 'c5', label: QUESTIONS[4] },
        { key: 'reviewed by', },
    ]

    const renderRating = rating => {
        let arr = new Array(rating).fill("x")
        return (<td >
            {arr.map((i, idx) => {
                return <span key={idx} style={{ color: colors.$orange, fontSize: 20 }}> &#9733;</span>
            })}
            <p>{RATINGS[rating.toString()]}</p>

        </td>)
    }

    return (
        <CRow>
            <CCol xl={12}>
                <CCard>
                    <CCardBody>
                        <CDataTable
                            items={dummyData}
                            fields={fields}
                            itemsPerPageSelect
                            itemsPerPage={12}
                            hover
                            pagination
                            scopedSlots={{
                                c1: item => {
                                    return renderRating(item.c1)
                                },
                                c2: item => {
                                    return renderRating(item.c2)
                                },
                                c3: item => {
                                    return renderRating(item.c3)
                                },
                                c4: item => {
                                    return renderRating(item.c4)
                                },
                                c5: item => {
                                    return renderRating(item.c5)
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
