import React, { useState, useEffect, useRef } from 'react';
import { CCardBody, CCol, CCarouselInner, CCarouselControl, CCarouselItem, CCarousel, CRow, CButton } from "@coreui/react";
import StarRatings from 'react-star-ratings';
import CIcon from "@coreui/icons-react";
import { copyArray } from 'utils/helpers';
import { RATINGS } from 'utils/constants/constant'
const Questions = ({ rating, setRating, activeIndex, setActiveIndex, QUESTIONS }) => {


  const setNewRating = (rate, idx) => {
    let arr = copyArray(rating)
    arr[idx] = rate;
    setRating(arr)
  }


  return (
    <CRow>
      <CCol xl={12}>
        <CCardBody >
          <CCarousel activeIndex={activeIndex} onSlideChange={(e) => {
            setActiveIndex(e)
          }}>
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
                            RATINGS[("" + rating[index])]
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
            <CCarouselControl direction="next" className="mt-5" >
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
