import React, { useState, forwardRef, useImperativeHandle } from "react";
import "./card.scss"
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
      isIcon = false,
      setImg = false,
      image,
      animation = false,
      textClass,
      imgClass,
      textStyle,
      dept_role,
      textRoleStyle,
      deleteCard = false,
      deleteButton
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
      <div className={animation ? "user" : ""}>
        <div className={deleteCard === true ? "flip-card" : ""} style={deleteCard === true ? { cursor: clickable && "pointer" } : {}}>
          <div className={deleteCard === true ? "flip-card-inner" : ""}>
            <div className={deleteCard === true ? "flip-card-front" : ""}>
              <CCard style={setHeight(height)} color={color} onClick={onClickMethod}>
                {
                  !showHeader ? "" : (
                    <CCardHeader >
                      {header}
                    </CCardHeader>
                  )
                }
                <CCardBody style={deleteCard === false ? { cursor: clickable && "pointer", maxWidth: "100px" } : {}}>
                  <CCardTitle>
                    {title}
                  </CCardTitle>
                  <CCardSubtitle>
                    {subtitle}
                  </CCardSubtitle>
                  {
                    setImg ?
                      <div style={{ position: 'absolute', left: '50%', top: '30%', transform: 'translate(-50%, -50%)' }}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEfe4jZpM05qPqzKdz7rlObs3odx45NzOgA&usqp=CAU" className={imgClass} />
                      </div> : ""
                  }
                  <CCardText
                    style={centeredText ? setVerticallyHorizontallyCentered() : textStyle}
                    className={textClass}
                  >
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
            </div>
            {
              deleteCard === true ?
                <div className="flip-card-back">
                  <div style={setVerticallyHorizontallyCentered()}>
                    {
                      deleteButton
                    }
                  </div>
                </div> : ""
            }
          </div>
        </div>
      </div >
    );
  }
);

export default Card;
