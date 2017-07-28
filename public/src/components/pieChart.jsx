import React from 'react';
import { Pie } from 'react-chartjs-2';
import Dashboard from '../containers/dashboard.jsx';

const colors = ['#ba68c8', '#7986cb', '#4fc3f7', '#4dd0e1', '#4db6ac', '#81c784', '#dce775', '#fff176', '#ffb74d', '#ff8a65'];

const PieChart = (props) => {
  const chartData = {
    labels: props.labels,
    datasets: [{
      label: 'Pie Chart',
      backgroundColor: colors,
      borderColor: 'White',
      borderWidth: 2,
      hoverBorderColor: 'Black',
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
      position: 'left',
      labels: {
        fontColor: 'White'
      }

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
      fontColor: 'White',
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
