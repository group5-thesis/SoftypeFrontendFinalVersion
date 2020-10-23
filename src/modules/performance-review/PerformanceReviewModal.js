import React, { useState, useEffect, useRef } from 'react';
import { CButton } from "@coreui/react";
import { Modal } from 'reusable'
import Questions from './component/Questions'
import { QUESTIONS } from "utils/constants/constant";

const PerformanceReviewModal = ({ employee }) => { // lacking api, name of employee, submit method
    const [rating, setRating] = useState(
        [0, 0, 0, 0, 0]
    )
    const [isZero, setIsZero] = useState(true)
    const modal = useRef();
    const toggleModal = () => {
        modal.current.toggle();
    };

    const submitReview = () => {
        setRating([0, 0, 0, 0, 0])
    }
    useEffect(() => {
        let checkZero = rating.every((rate) => rate > 0)
        setIsZero(!checkZero)
    }, [rating]);
    return (
        <Modal
            ref={modal}
            centered
            btnTitle="Add Perforrmance Review"
            title={`${employee.firstname} ${employee.lastname}`}
            modalOnClose={toggleModal}
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
    )
}

export default PerformanceReviewModal
