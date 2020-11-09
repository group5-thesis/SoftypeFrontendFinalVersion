import React from "react";
import PropTypes from "prop-types";
import "./chartstyle.scss";
import res from 'assets/img'
const propTypes = {
  nodeData: PropTypes.object.isRequired
};

/**  showHeader = false,
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
      isIcon = false */

const MyNode = ({ nodeData }) => {
  const selectNode = () => {
    alert("Hi All. I'm " + nodeData.name + ". I'm a " + nodeData.title + ".");
  };
  return (
    <div onClick={selectNode} >
      <div className="position">{nodeData.title}</div>
      <div className="fullname">{nodeData.name}</div>
    </div>
  );
};

MyNode.propTypes = propTypes;

export default MyNode;
