import React from 'react';
import { Pie } from 'react-chartjs-2';
import Dashboard from '../containers/dashboard.jsx';

const PieChart = (props) => {
  const chartData = {
    labels: props.labels,
    datasets: [{
      label: 'Pie Chart',
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      borderColor: 'White',
      borderWidth: 2,
      hoverBorderColor: 'White',
      data: props.data
    }]
  };

  const chartOptions = {
    cutoutPercentage: 0,
    maintainAspectRatio: true
  };


  return (
    <div className="col-lg-6">
      <Pie
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
};

export default PieChart;
