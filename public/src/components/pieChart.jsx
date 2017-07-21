import React from 'react';
import { Pie } from 'react-chartjs-2';
import Dashboard from '../containers/dashboard.jsx';

const PieChart = (props) => {

  const chartData = {
    labels: props.labels,
    datasets: [{
      label: 'Test Chart',
      backgroundColor: ['#FF6384','#36A2EB','#FFCE56'],
      borderColor: 'White',
      borderWidth: 2,
      // hoverBackgroundColor: [],
      hoverBorderColor: 'White',
      data: props.data
    }]
  }

  const chartOptions = {
    cutoutPercentage: 0,
    // rotation: ,
    // circumference: ,
    // animation.animateRotate: true,
    // animation.animteScale: false
    maintainAspectRatio: true
  }


  return (
    <div className="col-lg-6">
      <Pie
        data={chartData}
        options={chartOptions}
      />
    </div>
  )
}

export default PieChart;
