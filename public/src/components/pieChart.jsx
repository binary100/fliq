import React from 'react';
import { Pie } from 'react-chartjs-2';

const testData = {
  labels: [
    'Action',
    'Comedy',
    'Horror'
  ],
  datasets: [{
    label: 'Test Chart',
    backgroundColor: ['#FF6384','#36A2EB','#FFCE56'],
    borderColor: 'White',
    borderWidth: 2,
    // hoverBackgroundColor: [],
    hoverBorderColor: 'White',
    data: [300, 50, 100]
  }]
}

const testOptions = {
  cutoutPercentage: 0,
  // rotation: ,
  // circumference: ,
  // animation.animateRotate: true,
  // animation.animteScale: false
  maintainAspectRatio: true
}

const PieChart = () => {
  return (
    <div>
      <div className="row">
        <Pie
          data={testData}
          options={testOptions}
        />
      </div>
    </div>
  )
}

export default PieChart;
