import React, { useState, useEffect, useRef } from 'react';
import { CBadge, CCard, CCardBody, CCol, CDataTable, CCollapse, CRow, CButton } from "@coreui/react";
import { Modal } from 'reusable'
import Questions from './component/Questions'
import { QUESTIONS } from "utils/constants/constant";

const PerformanceReview = () => { // lacking api, name of employee, submit method

  const [rating, setRating] = useState(
    [0, 0, 0, 0, 0]
  )
  const [isZero, setIsZero] = useState(true)

  const usersData = [
    { id: 0, name: 'John Doe', registered: '2018/01/01', role: 'Guest', status: 'Pending' },
    { id: 1, name: 'Samppa Nori', registered: '2018/01/01', role: 'Member', status: 'Active' },
    { id: 2, name: 'Estavan Lykos', registered: '2018/02/01', role: 'Staff', status: 'Banned' }
  ]

  const modal = useRef();

  const fields = [
    { key: 'name', _style: { width: '40%' } },
    'registered',
    { key: 'role', _style: { width: '20%' } },
    { key: 'status', _style: { width: '20%' } },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ]

  const getBadge = (status) => {
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }

  const toggleModal = () => {
    modal.current.toggle();
  };

  const submitReview = () => {
    console.log(rating)
    setRating([0, 0, 0, 0, 0])
  }

  useEffect(() => {
    let checkZero = rating.every((rate) => rate > 0)
    setIsZero(!checkZero)
  }, [rating]);

  return (
    <CRow>
      <CCol xl={12}>
        <Modal
          ref={modal}
          centered
          title="Name of Employee"
          modalOnClose={toggleModal}
          hidden
          closeButton
          footer={
            <>
              <CButton color="primary" onClick={submitReview} disabled={isZero}>Submit</CButton>
              <CButton color="danger" onClick={() => {
                modal.current.toggle();
                setRating([0, 0, 0, 0, 0])
              }} >Cancel</CButton>
            </>
          }
          hideCancelButton
        >
          <Questions {...{ rating, setRating, QUESTIONS }} />
        </Modal>
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
                'status':
                  (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                'show_details':
                  (item, index) => {
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => { toggleModal() }}
                        >Button</CButton>
                      </td>
                    )
                  }
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow >
  )
}

export default PerformanceReview
