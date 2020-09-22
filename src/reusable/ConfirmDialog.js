import React from 'react'
import { CModal, CModalBody, CButton, CCol, CRow } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreator, ActionTypes } from 'utils/actions'
const ConfirmDialog = ({ DialogBody, title, onConfirm, confirmButton = true, cancelButtonText = "Cancel", children }) => {
    const show = useSelector(state => { return state.appState.app.confirmDialog })
    const dispatch = useDispatch()
    const closeDialog = () => {
        dispatch(actionCreator(ActionTypes.TOGGLE_DIALOG))
    }
    return (
        <div className="custom-dialog">
            <CModal show={show} centered closeOnBackdrop={false} onClose={() => {
                closeDialog()
            }}  >
                <CModalBody>
                    <blockquote className="blockquote text-center">
                        <p className="mb-0">{title}</p>
                    </blockquote>
                    {DialogBody && DialogBody}
                    <CRow className="justify-content-center no-gutters">
                        {children}
                        {
                            confirmButton && <CCol lg="4" className="px-1 mb-2">
                                <CButton color="primary" size="md" onClick={() => {
                                    if (onConfirm) {
                                        onConfirm()
                                    }
                                    closeDialog()
                                }} block>Confirm</CButton>
                            </CCol>
                        }

                        <CCol lg="4" className="px-1 mb-2">
                            <CButton color="danger" onClick={closeDialog} size="md" block>{cancelButtonText}</CButton>
                        </CCol>
                    </CRow>

                </CModalBody>
            </CModal >
        </div>
    )
}

export default ConfirmDialog