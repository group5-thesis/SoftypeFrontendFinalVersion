import React, { useState, useEffect, useRef } from "react";
import QrReader from "react-qr-reader";
import { useDispatch } from "react-redux";
import { CButton, CSpinner, CFormGroup, CInputCheckbox, CLabel } from "@coreui/react";
import { CenteredLayout } from "containers";
import { ConfirmDialog, Modal } from "reusable";
import { checkCamera } from "utils/helpers";
import { actionCreator, ActionTypes } from "utils/actions";
import api from "utils/api";

const QrCodeScanner = ({ onLoading }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [checked, toggleChecked] = useState(false)
  const modalRef = useRef();
  const dialog = useRef();
  const scannerStyle = {
    width: "100%",
  };

  const handleError = (err) => {
    setError(err ? err : "Something went wrong");
    dialog.current.toggle();
  };
  const handleScan = (data) => {
    if (data) {
      alert(data)
      console.log(data)
      return
      setResult(data);
      setError("Confirm Login")
      dialog.current.toggle();
    }
  };

  const loginWithQr = async () => {
    return
    onLoading(true);
    let res = await api.post("/loginQr", JSON.parse(result));
    onLoading(false);
    if (!res.error) {
      let { access_token, account_information } = res.data;
      localStorage.setItem("token", access_token);
      dispatch(
        actionCreator(ActionTypes.FETCH_PROFILE_SUCCESS, account_information)
      );
      dispatch(actionCreator(ActionTypes.LOGIN));
    } else {
      setError(res.message);
      dialog.current.toggle();
    }
  };
  // useEffect(() => {
  //   dialog.current.toggle();
  // }, [])
  return (
    <Modal
      ref={modalRef}
      {...{
        title: "Scan your QR Code to Login",
        btnTitle: "Login with QR Code",
        block: true,
      }}
    >
      {/* <CenteredLayout bg={false}> */}
      <ConfirmDialog
        id="cutom_dialog"
        ref={dialog}
        size="sm"
        {...{
          size: "sm",
          DialogBody: () => {
            return result ? <p className="h4 text-center pb-3">Confirm Login</p> : null
          }
          ,
          onConfirm: () => {
            loginWithQr()
          },
          title: error,
          cancelButtonText: !result ? "Ok" : "Confirm",
          confirmButton: result ? true : false,
        }}
      >
      </ConfirmDialog>
      <QrReader
        style={scannerStyle}
        delay={300}
        resolution={300}
        onError={handleError}
        onScan={handleScan}
      />
    </Modal>
  );
};

export default QrCodeScanner;