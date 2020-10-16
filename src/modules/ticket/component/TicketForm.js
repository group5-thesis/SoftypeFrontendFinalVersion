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
import { Modal } from 'reusable'
import { actionCreator, ActionTypes } from 'utils/actions';
import TicketModel from 'models/TicketModel'
import { useSelector, useDispatch } from 'react-redux'
import { shallowCopy, hasMissingFieds, toCapitalize, renameKey } from 'utils/helpers';
import api from 'utils/api';


const TicketForm = () => {
  const dispatch = useDispatch();
  const [hasErrors, setHasErrors] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(TicketModel)


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
    let key = e.target.name
    let value = e.target.value
    let copy = shallowCopy(data)
    copy[key] = value
    setData(copy)
    setHasErrors(hasMissingFieds(copy))
  }


  const checkErrors = () => {
    for (const [_, value] of Object.entries(data)) {
      if (value === '') {
        setHasErrors(true)
        return
      }
    }
    setHasErrors(false)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    let res = await api.post("/create_ticket", data)
    if (!res.error) {
      dispatch(actionCreator(ActionTypes.ADD_TICKET, renameKey(res.data.ticket_information[0])))
      modalRef.current.toggle()
      modalOnClose()
    } else {
      alert("error")
    }
    setIsLoading(false)
  }

  const modalOnClose = () => {
    setData(TicketModel)
    }
  const modalRef = useRef()

  const actions = () => (
    <>
      <CButton color="primary" disabled={hasErrors || isLoading} onClick={handleSubmit}>
        {
          isLoading ? <CSpinner color="secondary" size="sm" /> : 'Submit'
        }
      </CButton>
    </>
  )

  useEffect(() => {
    checkErrors()
  }, [data])

  return (
    <Modal ref={modalRef} {...{
      title: "Form Request",
      footer: actions(),
      modalOnClose,
      cancelBtnTitle: "Close"
    }}>
      <CFormGroup >
        <CLabel>Name : </CLabel>
        <CInput id="name" value={data.name} disabled />
      </CFormGroup>
      <CFormGroup >
        <CLabel>Item : </CLabel>
        <CInput
          name="item"
          id="item"
          onChange={handleOnChange}
          invalid={!data.item}
          valid={data.item !== ''}
          value={data.item || ""}
        />
      </CFormGroup>
      <CFormGroup >
        <CLabel>Quantity : </CLabel>
        <CInput
          id="name"
          type="number"
          name="quantity"
          onChange={handleOnChange}
          value={data.quantity}
          invalid={!data.quantity}
          valid={data.quantity !== ''}
        />
      </CFormGroup>
      <CFormGroup >
        <CLabel>Description : </CLabel>
        <CTextarea
          onChange={handleOnChange}
          name="description"
          value={data.description}
          invalid={!data.description}
          valid={data.description !== ''}
          rows="3"
        />
        <CInvalidFeedback className="help-block">
          Please provide a valid reason
        </CInvalidFeedback>
      </CFormGroup>
    </Modal>
  )
}

export default TicketForm
