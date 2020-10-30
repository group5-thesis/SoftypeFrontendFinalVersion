import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCardSubtitle,
  CCardText,
  CCardTitle,
} from "@coreui/react";
import { setHeight, setVerticallyHorizontallyCentered } from "utils/helpers";

const Card = forwardRef(
  (
    {
      showHeader = false,
      showFooter = false,
      title,
      footer,
      header,
      centeredText = false,
      subtitle,
      text,
      height = 0,
      clickable = false,
      onClickMethod,
      color,
      isIcon = false
    },
    ref
  ) => {
    // const [modal, setModal] = useState(false);

    // const toggle = () => {
    //   setModal(!modal);
    // };
    useImperativeHandle(ref, () => ({
      // toggle() {
      //   toggle();
      // },
    }));

    return (
      <>
        <CCard style={setHeight(height)} color={color} onClick={onClickMethod}>
          {
            !showHeader ? "" : (
              <CCardHeader >
                {header}
              </CCardHeader>
            )
          }
          <CCardBody style={{ cursor: clickable && "pointer" , maxWidth: "100px"} }>
            <CCardTitle>
              {title}
            </CCardTitle>
            <CCardSubtitle>
              {subtitle}
            </CCardSubtitle>
            <CCardText
              style={centeredText ? setVerticallyHorizontallyCentered() : {}}
              className={!isIcon ? "text-white font-weight-bold h2" : "font-weight-bold h2"}>
              {text}
            </CCardText>
          </CCardBody>
          {
            !showFooter ? "" : (
              <CCardFooter>
                {footer}
              </CCardFooter>
            )
          }
        </CCard>
      </>
    );
  }
);

export default Card;
