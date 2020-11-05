import React from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import MyNode from "./chartfunction";

const CustomNodeChart = () => {
  const ds = {
    id: "n1",
    name: "Arvind K",
    title: "HEAD MANAGER",
    children: [
      { id: "n2", name: "Nana L", title: "DEPARTMENT MANAGER" },
      {
        id: "n3",
        name: "Nikunj S",
        title: "DEPARTMENT MANAGER",
        children: [
          { id: "n4", name: "Kel Custodio", title: "SENIOR ENGINEER",
          children: [
            { id: "n5", name: "Sachin Savale", title: "ENGINEER",
            children: [
                { id: "n4", name: "Shahbudin Kaji", title: "ENGINEER"},
                { id: "n4", name: "Jaydas Sakhare", title: "ENGINEER"},
                { id: "n4", name: "Visahl Pitale", title: "ENGINEER"},
                { id: "n4", name: "Madhu Rai", title: "ENGINEER"}
        ]
        },
            { id: "n6", name: "Nitesh Devadiga", title: "ENGINEER" },
            { id: "n7", name: "Amol Jagkar", title: "ENGINEER" }
          ],
        },
          {id: "n8", name: "Manashi H",title: "SENIOR ENGINEER"},
          { id: "n9", name: "Moses R", title: "SENIOR ENGINEER" },
          { id: "n10", name: "Prachi S", title: "SENIOR ENGINEER" }
        ]
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
