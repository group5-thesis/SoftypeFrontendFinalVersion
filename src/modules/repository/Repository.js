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
    CTabPane
} from '@coreui/react'
import { DocsLink } from 'reusable'
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
                            <CListGroup>
                                <CListGroupItem><CIcon name="cil-folder"></CIcon>   Company File.docx</CListGroupItem>
                                <CListGroupItem><CIcon name="cil-folder"></CIcon>   Company File2.docx</CListGroupItem>
                                <CListGroupItem><CIcon name="cil-folder"></CIcon>   Company File3.docx</CListGroupItem>
                                <CListGroupItem><CIcon name="cil-folder"></CIcon>   Company File4.txt</CListGroupItem>
                                <CListGroupItem><CIcon name="cil-folder"></CIcon>   Company Filte5.mp4</CListGroupItem>
                            </CListGroup>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Repository
