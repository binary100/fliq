import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = (props) => {
  const chartData = {
    labels: props.labels,
    datasets: [{
      label: 'Bar Chart',
      backgroundColor: ['#FF6384','#36A2EB','#FFCE56'],
      borderColor: 'White',
      borderWidth: 2,
      hoverBorderColor: 'White',
      data: props.data
    }]
  }

  const chartOptions = {
    maintainAspectRatio: true
  }

  return (
    <div className="col-lg-6">
      <Bar
        data={chartData}
        width={100}
        height={50}
        options={chartOptions}
      />
    </div>
  )
}

export default BarChart;
