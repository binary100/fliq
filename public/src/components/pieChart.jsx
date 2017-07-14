import React from 'react';
import {Pie} from 'react-chartjs-2';
react-chart.js
react-chart.js
chart.js


class PieChart extends React.Component {
  constructor(props) {
    super(props);
  }



}

<canvas><canvas id="myChart"></canvas>
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [{
      backgroundColor: [
        "#2ecc71",
        "#3498db",
        "#95a5a6",
        "#9b59b6",
        "#f1c40f",
        "#e74c3c",
        "#34495e"
      ],
      data: [12, 19, 3, 17, 28, 24, 7]
    }]
  }
});




const React = require('react');

class Bar1 extends React.Component {
  constructor(props) {
    super(props);

    const data = {
      labels: [],
      datasets: [
        {
          label: 'Item Profit/Cost in Dollars',
          backgroundColor: [],
          borderColor: [],
          borderWidth: 2,
          hoverBackgroundColor: [],
          hoverBorderColor: [],
          data: []
        }
      ]
    };

    this.state = {
      data: Object.keys(this.props.spendingData).reduce((acc, curr) => {
        acc.labels.push(curr);
        acc.datasets[0].data.push(this.props.spendingData[curr]);
        if (this.props.spendingData[curr] < 0) {
          acc.datasets[0].backgroundColor.push('rgba(200,0,0,0.2)');
          acc.datasets[0].borderColor.push('rgba(200,0,0,0.8)');
          acc.datasets[0].hoverBackgroundColor.push('rgba(200,0,0,0.8)');
          acc.datasets[0].hoverBorderColor.push('rgba(200,0,0,1)');
        } else {
          acc.datasets[0].backgroundColor.push('rgba(0,200,0,0.2)');
          acc.datasets[0].borderColor.push('rgba(0,200,0,0.8)');
          acc.datasets[0].hoverBackgroundColor.push('rgba(0,200,0,0.8)');
          acc.datasets[0].hoverBorderColor.push('rgba(0,200,0,1)');
        }
        return acc;
      }, data)
    };
  }

  render() {
    return (
      <div>
        <Bar
          data={this.state.data}
          width={1}
          height={1}
          options={{
            maintainAspectRatio: true
          }}
        />
      </div>
    );
  }
};

module.exports = Bar1;
