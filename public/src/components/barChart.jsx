import React from 'react';
import { Bar, HorizontalBar } from 'react-chartjs-2';

const colors = ['#ba68c8', '#7986cb', '#4fc3f7', '#4dd0e1', '#4db6ac', '#81c784', '#dce775', '#fff176', '#ffb74d', '#ff8a65'];

const BarChart = (props) => {
  const chartData = {
    labels: props.labels,
    datasets: [{
      label: 'Bar Chart',
      backgroundColor: colors,
      borderWidth: 2,
      hoverBorderColor: 'Black',
      data: props.data
    }]
  };

  const chartOptions = {
    maintainAspectRatio: true,
    legend: {
      display: false
    },
    title: {
      display: true,
      fontColor: 'White',
      fontSize: 20,
      text: props.title
    },
    scales: {
      xAxes: [{
          ticks: {
            fontColor: 'White',
            callback: function(value, index, values) {
                return parseInt(value * 100) + '%';
            },
            min: 0
          }
      }],
      yAxes: [{
          ticks: {
            fontColor: 'White'
          }
      }]
    }
  };

  return (
    <div>
      <HorizontalBar
        data={chartData}
        width={100}
        height={50}
        options={chartOptions}
      />
    </div>
  );
};

export default BarChart;
