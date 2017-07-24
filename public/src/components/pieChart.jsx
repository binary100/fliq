import React from 'react';
import { Pie } from 'react-chartjs-2';
import Dashboard from '../containers/dashboard.jsx';

var dynamicColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

const PieChart = (props) => {
  const chartData = {
    labels: props.labels,
    datasets: [{
      label: 'Pie Chart',
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
    maintainAspectRatio: true,
    legend: {
      position: 'bottom'
    },
    title: {
      display: true,
      fontSize: 20,
      text: 'Custom Chart Title'
    }
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
