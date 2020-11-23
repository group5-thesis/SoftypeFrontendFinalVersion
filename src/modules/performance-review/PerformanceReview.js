import React, { useState, useEffect, useRef } from 'react';
import { CBadge, CCard, CCardBody, CCol, CDataTable, CCollapse, CRow, CButton } from "@coreui/react";
import { Modal } from 'reusable'
import { PERFORMANCE_REVIEW_STATUS } from "utils/constants/constant";
import PerformanceReviewModal from 'modules/performance-review/PerformanceReviewModal';

const PerformanceReview = () => {
   // Performance details lacking

  const usersData = [
    { employeeId: 0, name: 'John Doe', date_reviewed: '2018/01/01', status: 'Pending' },
    { employeeId: 1, name: 'Samppa Nori', date_reviewed: '2018/01/01', status: 'Done' }
  ]

  const modal = useRef();

  const fields = [
    { key: 'name', _style: { width: '20%' } },
    { key: 'date_reviewed', _style: { width: '20%' } },
    { key: 'status', _style: { width: '10%' } },
    { key: 'action', _style: { width: '10%' } }
  ]

  const getBadge = (STATUS, status) => {
    return STATUS[status];
  };

  const toggleModal = () => {
    modal.current.toggle();
  };

  useEffect(() => {
  }, []);

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardBody>
            <CDataTable
              items={usersData}
              fields={fields}
              itemsPerPageSelect
              itemsPerPage={5}
              hover
              pagination
              scopedSlots={{
                'status': (item) => (
                  <td>
                    <CBadge color={getBadge(PERFORMANCE_REVIEW_STATUS, item.status)}>
                      {item.status}
                    </CBadge>
                  </td>
                ),
                'action':
                  (item, index) => {
                    return (
                      <td className="py-2">
                        <CButton
                          color="info"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => {
                            console.log(item, index, " Details")
                          }}
                        >
                          {"Details"}
                        </CButton>
                        {/* <PerformanceReviewModal {...{usersData}} /> */}
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => {
                            console.log(item, index, " Reviews")
                          }}
                        >
                          {"Review"}
                        </CButton>
                      </td>
                    )
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
