import React from 'react';
import { Pie } from 'react-chartjs-2';
import Dashboard from '../containers/dashboard.jsx';

const PieChart = (props) => {
  const chartData = {
    labels: props.labels,
    datasets: [{
      label: 'Pie Chart',
      backgroundColor: ['#e57373', '#ba68c8', '#7986cb', '#4fc3f7', '#4db6ac', '#aed581', '#fff176', '#ffb74d', '#a1887f', '#90a4ae'],
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
