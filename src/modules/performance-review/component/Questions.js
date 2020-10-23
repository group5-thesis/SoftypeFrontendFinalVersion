import React, { useState, useEffect, useRef } from 'react';
import { CCardBody, CCol, CCarouselInner, CCarouselControl, CCarouselItem, CCarousel, CRow, CButton } from "@coreui/react";
import StarRatings from 'react-star-ratings';
import CIcon from "@coreui/icons-react";
import { copyArray } from 'utils/helpers';

const Questions = ({ rating, setRating, QUESTIONS }) => {

  // https://www.npmjs.com/package/react-star-ratings

  const setNewRating = (rate, idx) => {
    let arr = copyArray(rating)
    arr[idx] = rate;
    setRating(arr)
  }

  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <CRow>
      <CCol xl={12}>
        <CCardBody >
          <CCarousel activeIndex={activeIndex}>
            <CCarouselInner>
              {
                QUESTIONS.map((element, index) => {
                  return (
                    <CCarouselItem key={index}>
                      <center>
                        <h5>{`${index + 1}.) ${element}`}</h5>
                        <StarRatings
                          key={index}
                          rating={rating[index]}
                          starRatedColor="primary"
                          starDimension="25px"
                          numberOfStars={5}
                          changeRating={(rate) => {
                            setNewRating(rate, index)
                          }}
                          name='rating'
                        />
                        <br></br>
                        <h5>
                          {
                            rating[index] === 1 ? "Good" // 1 star Good
                              : rating[index] === 2 ? "Very Good" // 2 stars Very Good
                                : rating[index] === 3 ? "Best" // 3 stars Best
                                  : rating[index] === 4 ? "Excellent" // 4 starts Excellent
                                    : rating[index] === 5 ? "Outstanding" : " " // 5 stars Outstanding
                          }
                        </h5>
                      </center>
                    </CCarouselItem>
                  )
                })
              }
            </CCarouselInner>
            <CCarouselControl direction="prev" className="mt-5" >
              <CButton>
                <CIcon size={"sm"} color="primary" name={"cil-chevron-left"} />
              </CButton>
            </CCarouselControl>
            <CCarouselControl direction="next" className="mt-5">
              <CButton>
                <CIcon size={"sm"} color="primary" name={"cil-chevron-right"} />
              </CButton>
            </CCarouselControl>
          </CCarousel>
        </CCardBody>
      </CCol>
    </CRow >
  )
}

export default Questions
