import React from 'react';
import { Bar, HorizontalBar } from 'react-chartjs-2';

const BarChart = (props) => {
  const chartData = {
    labels: props.labels,
    datasets: [{
      label: 'Bar Chart',
      backgroundColor: ['#e57373', '#ba68c8', '#7986cb', '#4fc3f7', '#4db6ac', '#aed581', '#fff176', '#ffb74d', '#a1887f', '#90a4ae'],
      borderColor: 'White',
      borderWidth: 2,
      hoverBorderColor: 'White',
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
      fontSize: 20,
      text: props.title
    },
    scales: {
      xAxes: [{
          ticks: {
              callback: function(value, index, values) {
                  return parseInt(value * 100) + '%';
              },
              min: 0
          }
      }]
    }
  }

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
