import React from 'react';
import { Pie } from 'react-chartjs-2';
import Dashboard from '../containers/dashboard.jsx';

const PieChart = (props) => {
  const chartData = {
    labels: props.labels,
    datasets: [{
      label: 'Pie Chart',
      backgroundColor: ['#FF6384', '#36A2EB', '#FFE168', '#cc65fe', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850', '#F2F2F2', '#808080'],
      borderColor: 'White',
      borderWidth: 2,
      hoverBorderColor: 'White',
      data: props.data
    }]
  };

  const chartOptions = {
    cutoutPercentage: 0,
    // rotation: ,
    // circumference: ,
    // animation.animateRotate: true,
    // animation.animteScale: false
    maintainAspectRatio: true,
    legend: {
      position: 'left'
    },
    layout: {
      padding: {
          left: 25,
          right: 25,
          top: 25,
          bottom: 25
      }
    },
    title: {
      display: true,
      fontSize: 20,
      text: props.title
    }
  }


  return (
    <div>
      <Pie
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
};

export default PieChart;
