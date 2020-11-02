import React, { useState, useEffect, useRef } from 'react';
import { CButton } from "@coreui/react";
import { Modal } from 'reusable'
import Questions from './component/Questions'
import { QUESTIONS } from "utils/constants/constant";
import { useSelector, useDispatch } from 'react-redux'
import { actionCreator, ActionTypes } from 'utils/actions';
import PerformanceReviewModel from 'models/PerformanceReviewModel'
import api from "utils/api"

const PerformanceReviewModal = ({ user }) => {
  console.log(user);
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

  const [isZero, setIsZero] = useState(true)
  const [review, setReview] = useState(PerformanceReviewModel)
  const [activeIndex, setActiveIndex] = useState(0)

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
    let res = await api.post("/create_performance_review", review)
    if (!res.error) {
      dispatch(actionCreator(ActionTypes.ADD_PERFORMANCE_REVIEW, res.data.performance_review_information[0]))
      toggleModal()
    } else {
      alert("error")
    }
    toggleModal()
  }

  useEffect(() => {
    let checkZero = rating.every((rate) => rate > 0)
    setIsZero(!checkZero)
  }, [rating, review, activeIndex]);

  return (
    <Modal
      ref={modal}
      centered
      btnTitle="Add Perforrmance Review"
      title={`${user.firstname} ${user.lastname}`}
      modalOnClose={toggleModal}
      footer={
        <>
          <CButton color="primary" onClick={submitReview} disabled={isZero}>Submit</CButton>
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
