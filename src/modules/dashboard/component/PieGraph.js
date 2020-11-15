import React from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  CChartBar,
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPie,
  CChartPolarArea,
  CChart
} from '@coreui/react-chartjs'
import Chart from 'chart.js';

const Pie = () => {

  const pie = {
    labels: [
      'Red',
      'Green',
      'Yellow',
    ],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
      }],
  };

  const options = {
    // tooltips: {
    //   enabled: false,
    //   custom: customTooltips
    // },
    maintainAspectRatio: false
  }

  return (
    <CRow>
      <CCol sm="6">
        {/* <h4>OLOK</h4> */}
        <div>
          <CChart
            type="pie"
            datasets={pie.datasets}
            labels={pie.labels}
          // options={{
          //   rotation: 50,
          //   circumference: 30,

          // }}
          />
        </div>
        <hr />
      </CCol>
    </CRow>


  )
}

export default Pie
