import React from 'react';
import { CCardBody, CCol, CDataTable, CCardTitle, CRow, CLabel, CButton, CCardText } from "@coreui/react";
import { formatDate, splitSnakeCase, splitCamelCase } from 'utils/helpers';

const DepartmentDetails = ({ match }) => {

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              {/* <table className="table table-hover " style={{ borderBottom: "1px solid grey" }}>
                <tbody>
                  {
                    ticketDetails.map(([key, value], index) => {
                      return ((value !== null && key !== "id") &&
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
              </table> */}
              {"test"}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )

}

export default DepartmentDetails
