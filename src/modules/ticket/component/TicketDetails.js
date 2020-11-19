import React from 'react';
import { CCardBody, CCol, CDataTable, CCardTitle, CRow, CLabel, CButton, CCardText } from "@coreui/react";
import { formatDate, splitSnakeCase, splitCamelCase } from 'utils/helpers';


const TicketDetails = (props) => {
  let {
    id,
    name,
    person_in_charge = props['person in charge'],
    item,
    quantity,
    description,
    status,
    remarks,
    date_requested = props['date requested'],
    resolved_date = props['resolve date']
  } = props

  const ticketDetails = Object.entries(props)

  const formattedValue = (key, value) => {
    if (key.toLowerCase() === "status") {
      return value === 0 ? "Closed" : "Open"
    }
    if (key.toLowerCase() === "date requested") {
      return formatDate(new Date(value))
    }
    return value;
  }

  return (
    <CRow>
      <CCol>
        <CCardBody>
          <table className="table table-hover " style={{ borderBottom: "1px solid grey" }}>
            <tbody>
              {
                ticketDetails.map(([key, value], index) => {
                  return ((value !== null && key !== "id" && value !== '') &&
                    <tr key={index.toString()}>
                      <td className="text-capitalize">  {`${splitSnakeCase(splitCamelCase(key))}:`}</td>
                      <td>{
                        <b><p>{formattedValue(key, value)}</p></b>
                      }
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </CCardBody>
      </CCol>
    </CRow>
  )

}

export default TicketDetails
