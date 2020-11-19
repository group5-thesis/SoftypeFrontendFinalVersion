import React, { useState, useEffect, useRef } from 'react';
import { CButton } from "@coreui/react";
import { Modal } from 'reusable'
import Questions from './component/Questions'
import { QUESTIONS } from "utils/constants/constant";
import { useSelector, useDispatch } from 'react-redux'
import { actionCreator, ActionTypes } from 'utils/actions';
import PerformanceReviewModel from 'models/PerformanceReviewModel'
import api from "utils/api"
import { dispatchNotification } from 'utils/helpers'
import { LoadingButton } from 'reusable'

const PerformanceReviewModal = ({ user }) => {
  const reviewer = useSelector(state => {
    let authed = state.appState.auth.user;
    return {
      firstname: authed.firstname,
      lastname: authed.lastname,
      employeeId: authed.employeeId,
      userId: authed.userId
    }
  })

  const [rating, setRating] = useState(
    [0, 0, 0, 0, 0]
  )

  const [review, setReview] = useState(PerformanceReviewModel)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLoading, toggleIsLoading] = useState(false)

  PerformanceReviewModel.reviewer = reviewer.employeeId;
  PerformanceReviewModel.employee_reviewed = user.employeeId
  PerformanceReviewModel.c1 = rating[0]
  PerformanceReviewModel.c2 = rating[1]
  PerformanceReviewModel.c3 = rating[2]
  PerformanceReviewModel.c4 = rating[3]
  PerformanceReviewModel.c5 = rating[4]

  const dispatch = useDispatch();
  const modal = useRef();

  const toggleModal = () => {
    modal.current.toggle();
    setRating([0, 0, 0, 0, 0])
    setReview(PerformanceReviewModel)
    setActiveIndex(0)
  };

  const submitReview = async () => {
    toggleIsLoading(true)
    dispatchNotification(dispatch, { type: 'info', message: "Please wait" })
    let res = await api.post("/create_performance_review", review)
    if (!res.error) {
      dispatchNotification(dispatch, { type: 'success', message: 'Success' })
      dispatch(actionCreator(ActionTypes.ADD_PERFORMANCE_REVIEW, res.data.performance_review_information[0]))
    } else {
      dispatchNotification(dispatch, { type: 'error', message: res.message })
    }
    toggleModal()
    toggleIsLoading(false)
  }
  const validate = () => {
    if (!rating.includes(0)) {
      submitReview()
    } else {
      dispatchNotification(dispatch, { type: 'error', message: "Please add some review" })
    }

  }


  return (
    <Modal
      ref={modal}
      centered
      btnTitle="Add Perforrmance Review"
      title={`${user.firstname} ${user.lastname}`}
      modalOnClose={toggleModal}
      footer={
        <>
          <LoadingButton {...{ isLoading, submit: validate, btnText: 'Submit' }} />
          <CButton color="danger" onClick={() => {
            toggleModal()
          }} >Cancel</CButton>
        </>
      }
      hideCancelButton
    >
      <Questions {...{ rating, setRating, activeIndex, setActiveIndex, QUESTIONS }} />
    </Modal>
  )
}

export default PerformanceReviewModal
