import React, { lazy, useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import OrganizationChart from "@dabeng/react-orgchart";
import MyNode from "./chartfunction";

const CustomNodeChart = () => {

  const stateActiveEmployees = useSelector((state) => {
    return state.appState.employee.employees
  });

  const [employees, setEmployees] = useState(stateActiveEmployees)

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
        children: [
          {
            id: "n4", name: "Sachin Salve", title: "Director Technical Services", children: [
              {
                id: "n4a", name: "Nitesh", title: "Technical Associate"
              },
              {
                id: "n4b", name: "Farhan", title: "Technical Associate"
              },
              {
                id: "n4c", name: "Amol", title: "Technical Associate"
              },
            ]
          },
          {
            id: "n5", name: "Manisha", title: "Director Technical Services"
          },
          {
            id: "n6", name: "Moses", title: "Director Technical Services"
          },
          {
            id: "n7", name: "Prachi", title: "Director Technical Services"
          }
        ]
      }
    ]
  };

  return (
    <OrganizationChart
      datasource={ds}
      chartClass="myChart"
      NodeTemplate={MyNode}
    // pan={true}
    // zoom={true}
    />
  );
};

export default CustomNodeChart;
