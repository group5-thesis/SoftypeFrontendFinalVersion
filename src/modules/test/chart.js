import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CFade,
  CLink,
  CRow,
  CButton,
  CModal,
  CModalBody,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import changeState from 'utils/reducers/app'
const Cards = () => {
  const [showCard, setShowCard] = useState(true)
  const [small, setSmall] = useState(false)

  const [appState, ChangeState] = useState({
    activeObject: null,
    Objects: [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9}]
  })
  const [collapsed, setCollapsed] = useState(false)


  function AppActive(index){
    changeState({...appState,activeObject: appState.Objects[index]});
  }

  function dropdown(index){
    if(appState.Objects[index]){
      return 'cil-chevron-bottom';
    }else {
      return 'cil-chevron-top'
    }
  }
  return (
    <>
    <CRow>
      {appState.Objects.map((elements,index)=>(
      <CCol xs="12" sm="6" md="4" className ="go" onClick={() => dropdown(index)}>
        <CFade in={showCard}>
          <CCard>
            <CCardHeader>
            <CImg
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRPgEmtQwrC7r80BUtMhPaF6okDFFu41i5fRQ&usqp=CAU"
                block
                class="mb-1"
              />
              <div className="card-header-actions">
                <CLink className="card-header-action try" onClick={() => setCollapsed(!collapsed)}>
                  <CIcon name={collapsed ? 'cil-chevron-bottom' : 'cil-chevron-top'} />
                </CLink>
              </div>
            </CCardHeader>
            <CCollapse show={collapsed}>
              <CCardBody onClick={() => setSmall(!small)}>
                Leonilo Torres
              </CCardBody>
              <CModal
                show={small}
                onClose={setSmall}
              >
                <CModalBody>
                  <CButton color="info">More Info</CButton>{'    '}
                  <CButton
                    color="danger"
                    onClick={() => setSmall(false)}
                  >Cancel</CButton>
                </CModalBody>
              </CModal>
            </CCollapse>
          </CCard>
        </CFade>
      </CCol>
      ))}
    </CRow>
    </>
    
  )
}

export default Cards
