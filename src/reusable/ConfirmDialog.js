import React, { forwardRef, useImperativeHandle, useState } from "react";
import { CModal, CModalBody, CButton, CCol, CRow } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreator, ActionTypes } from "utils/actions";
const ConfirmDialog = forwardRef(
  (
    {
      DialogBody,
      centered = false,
      title,
      onCloseCallback,
      onConfirm,
      confirmButton = true,
      cancelButtonText = "Cancel",
      children,
    },
    ref
  ) => {
    const [dialog, setDialog] = useState(false);

    const openDialog = () => {
      setDialog(true);
    };
    const closeDialog = () => {
      setDialog(false);

    };
    useImperativeHandle(ref, () => ({
      toggle() {
        if (dialog) {
          closeDialog();
        } else {
          openDialog();
        }
      },
    }));
    return (
      <div className="custom-dialog">
        <CModal
          show={dialog}
          centered={centered}
          closeOnBackdrop={false}
        >
          <CModalBody>
            <blockquote className="blockquote text-center">
              <p className="mb-0">{title}</p>
            </blockquote>
            {DialogBody && DialogBody}
            <CRow className="justify-content-center no-gutters">
              {children}
              {confirmButton && (
                <CCol lg="4" className="px-1 mb-2">
                  <CButton
                    color="primary"
                    size="md"
                    onClick={() => {
                      if (onConfirm) {
                        onConfirm();
                      }
                      closeDialog();
                    }}
                    block
                  >
                    Confirm
                  </CButton>
                </CCol>
              )}

              <CCol lg="4" className="px-1 mb-2">
                <CButton color="danger" onClick={() => {
                  closeDialog()
                  if (onCloseCallback) {
                    onCloseCallback();
                  }
                }} size="md" block>
                  {cancelButtonText}
                </CButton>
              </CCol>
            </CRow>
          </CModalBody>
        </CModal>
      </div>
    );
  }
);
export default ConfirmDialog;
