
import React from 'react'
import {
  CRow,
  CCol,
  CButton
} from '@coreui/react'
import { getAge } from 'utils/helpers';
import Icon from '@mdi/react';
import {
  mdiCake
} from '@mdi/js';

const WidgetModalContent = ({ content }) => {


  return (
    <>
      <CRow>
        <CCol>
          {
            content.length ?
              <table className="table table-hover " style={{ borderBottom: "1px solid grey" }}>
                <tbody>
                  {
                    content.map((emp, idx) => {
                      return (
                        <tr key={idx.toString()}>
                          <td className="text-center">
                            <h5 className="card-title mb-0">
                              {`${emp.firstname} ${emp.lastname}
                            ${getAge(emp.birthdate)}${getAge(emp.birthdate).toString().substring(1, 2) === "1" ? "st" :
                                  getAge(emp.birthdate).toString().substring(1, 2) === "2" ? "nd" :
                                    getAge(emp.birthdate).toString().substring(1, 2) === "3" ? "rd" : "th"
                                } birthday!`}
                              <Icon path={mdiCake} size={1.5} />
                            </h5>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              :
              <div className="text-center"><h5 className="card-title mb-0">Nobody is celebrating now.</h5></div>
          }

        </CCol>
      </CRow>
    </>
  )
}

export default WidgetModalContent
