import React, { useState, useRef, useEffect } from 'react'
import {
  CButton,
  CCol,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel,
  CSelect,
  CInvalidFeedback,
  CSpinner,
} from '@coreui/react'
import { Modal, ConfirmDialog, LoadingButton } from 'reusable'
import { actionCreator, ActionTypes } from 'utils/actions';
import TicketModel from 'models/TicketModel'
import { useSelector, useDispatch } from 'react-redux'
import { shallowCopy, dispatchNotification, toCapitalize, renameKey } from 'utils/helpers';
import api from 'utils/api';
import _ from 'lodash';
import moment from 'moment';


const TicketForm = () => {
  const defaultErrors = {
    item: false,
    quantity: false,
    date_needed: false,
    price: false,
    purpose: false
  }
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(TicketModel)
  const [errors, setErrors] = useState(defaultErrors)

  const user = useSelector(state => {
    let authed = state.appState.auth.user;
    return {
      firstname: authed.firstname,
      lastname: authed.lastname,
      employeeId: authed.employeeId,
      userId: authed.userId
    }
  })

  TicketModel.name = `${toCapitalize(user.firstname)} ${toCapitalize(user.lastname)}`
  TicketModel.employeeId = user.employeeId

  const handleOnChange = (e) => {
    setErrors(defaultErrors)
    let key = e.target.name
    let value = e.target.value
    let copy = shallowCopy(data)
    copy[key] = value
    let _total = copy['price'] * copy['quantity']
    copy['total_price'] = _total > 0 ? _total : 0;
    setData(copy)
  }

  const validate = () => {
    let dateValid = moment(data.date_needed).isSameOrAfter(moment());
    let _errors = {}
    let { item, quantity, date_needed, price, purpose } = data
    if (!item) {
      _errors['item'] = true;
    }
    if (quantity < 1) {
      _errors['quantity'] = true;
    }
    if (!date_needed || !dateValid) {
      _errors['date_needed'] = true;
    }
    if (price < 1) {
      _errors['price'] = true;
    }
    if (!purpose) {
      _errors['purpose'] = true;
    }
    setErrors(_errors)
    if (_.values(_errors).includes(true)) {
      return
    }
    // handleSubmit()
    dialogRef.current.toggle()
  }

  const handleSubmit = async () => {
    dispatchNotification(dispatch, { type: 'info', message: "Please wait" });
    setIsLoading(true)
    let res = await api.post("/create_officeRequest ", data)
    setIsLoading(false)
    if (!res.error) {
      dispatch(actionCreator(ActionTypes.ADD_TICKET, renameKey(res.data.officeRequest_information[0])))
      modalRef.current.toggle()
      modalOnClose()
    } else {
      dispatchNotification(dispatch, { type: 'error', message: res.message });
    }
  }

  const renderError = (field) => {
    let message = "";
    switch (field) {
      case 'date_needed':
        message = "Invalid date";
        break;
      case 'quantity':
        message = "Invalid Quantity";
        break;
      case 'price':
        message = "Invalid Price";
        break;
      case 'item':
        message = "Item is required";
        break;
    }

    return <CInvalidFeedback className="help-block">
      {message}
    </CInvalidFeedback>
  }

  const modalOnClose = () => {
    setErrors(defaultErrors)
    setData(TicketModel)
  }
  const modalRef = useRef();
  const dialogRef = useRef();

  const actions = () => (
    <>
      <CButton color="primary" disabled={isLoading} onClick={validate}>
        {
          isLoading ? <CSpinner color="secondary" size="sm" /> : 'Submit'
        }
      </CButton>
    </>
  )

  return (
    <Modal ref={modalRef} {...{
      title: "New Request",
      footer: <>
        <LoadingButton  {...{ isLoading, submit: validate, btnText: "Submit" }} />
      </>,
      modalOnClose,
      cancelBtnTitle: "Close"
    }}>
      <ConfirmDialog
        id="cutom_dialog"
        ref={dialogRef}
        {...{
          onConfirm: () => {
            dialogRef.current.toggle()
            handleSubmit();
          },
          title: "Please confirm.",
        }}
      ></ConfirmDialog>
      <CFormGroup >
        <CLabel>Requestor : </CLabel>
        <CInput id="name" value={data.name} disabled />
      </CFormGroup>
      <CFormGroup >
        <CLabel>Item : </CLabel>
        <CInput
          name="item"
          onChange={handleOnChange}
          invalid={errors.item}
          placeholder="name/brand ect."
          value={data.item || ""}
        />
        {renderError('item')}

      </CFormGroup>
      <CFormGroup row className="my-0">
        <CCol xs="6">
          <CFormGroup >
            <CLabel>Price per item : </CLabel>
            <CInput
              type="number"
              name="price"
              value={data.price}
              onChange={handleOnChange}
              invalid={errors.price}
              placeholder="0.00"
            />
            {renderError('price')}
          </CFormGroup>
        </CCol>
        <CCol xs="6">
          <CFormGroup >
            <CLabel>Quantity : </CLabel>
            <CInput
              type="number"
              name="quantity"
              value={data.quantity}
              onChange={handleOnChange}
              invalid={errors.quantity}
              placeholder="0"
            />
            {renderError('quantity')}
          </CFormGroup>
        </CCol>
      </CFormGroup>


      <CFormGroup >
        <CLabel>Total Price : </CLabel>
        <CInput id="name" value={data.total_price} disabled />
      </CFormGroup>
      <CFormGroup>
        <CLabel htmlFor="textarea-input">Purpose : </CLabel>
        <CTextarea
          onChange={handleOnChange}
          name="purpose"
          value={data.purpose}
          invalid={errors.purpose}
          rows="5"
        />
        <CInvalidFeedback className="help-block">
          Please provide a valid information
                  </CInvalidFeedback>
      </CFormGroup>
      <CFormGroup >
        <CLabel htmlFor="date-input">Date Needed : </CLabel>
        <CInput
          type="date"
          onChange={handleOnChange}
          name="date_needed"
          invalid={errors.date_needed}
          placeholder="Date Needed" />
        {renderError('date_needed')}
      </CFormGroup>
    </Modal>
  )
}

export default TicketForm
