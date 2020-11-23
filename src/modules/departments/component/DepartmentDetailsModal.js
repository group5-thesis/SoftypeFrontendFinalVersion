import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CCol, CInput, CForm, CRow,CLabel ,CFormGroup ,CFormText } from "@coreui/react";
import _ from 'lodash';
import { Modal, ConfirmDialog } from 'reusable';


const DepartmentDetailsModal = ({ deptEmp, firstElementDept }) => {

  return (
    <>
      <CRow>
        <CCol>
          <CForm action="" method="post" >
            <CFormGroup>
              <CLabel>Department Name</CLabel>
              <CInput
                // onChange={handleOnChange}
                name="department_name"
                value={firstElementDept.department_name || ""}
                placeholder={firstElementDept.department_name}
              />
              <CFormText className="help-block">Please enter your Department Name</CFormText>
            </CFormGroup>
          </CForm>
        </CCol>
      </CRow>
    </>
  )
}

export default DepartmentDetailsModal
