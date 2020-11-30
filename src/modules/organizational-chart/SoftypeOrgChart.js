import React, { lazy, useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import OrganizationChart from "@dabeng/react-orgchart";
import MyNode from "./chartfunction";

const CustomNodeChart = () => {

  const chartData = useSelector((state) => {
    return state.appState.employee.chartData
  });


  const ds = {
    id: "n1",
    name: "Arvind K",
    title: "Chief Executive Officer, Softype Global",
    children: [
      { id: "n2", name: "Nana L", title: "Chief Executive Officer, Softype PH" },
      {
        id: "n3",
        name: "Nikunj S",
        title: "Chief Operation Officer",
        children: chartData
      }
    ]
  };

  return (
    <OrganizationChart
      datasource={ds}
      chartClass="myChart"
      NodeTemplate={MyNode}
      pan={true}
      zoom={true}
    />
  );
};

export default CustomNodeChart;
