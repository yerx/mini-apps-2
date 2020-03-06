import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

const data = {
  labels: ['Jan', 'Feb'],
  datasets: [
    {
      label: 'BTC Price USD',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rga(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointHitRadius: 10,
      // empty at the beginning
      data: [55, 65]
    }
  ]
}

const options = {
  scales: {
    xAxes: [{
      type: 'realtime',
      realtime: {
        duration: 20000,
        refresh: 1000,
        delay: 1000,
        pause: false,
        ttl: undefined,

        onRefresh: function(chart) {
          // alt code
          // var data = getLatestData();

          // Array.prototype.push.apply(chart.data.datasets[0].data, data);

          // from example page
          chart.data.datasets.forEach(function(dataset) {
            dataset.data.push({
              x: Date.now(),
              y: Math.random()
            })
          })
        }
      }
    }]
  },
  plugins: {
    streaming: {
      frameRate: 30
    }
  }
}

class Chart extends React.Component {
  constructor(props) {
    super(props);
  }




  render() {
    return (
      <div>
        <h2>Line Example</h2>
        {/* <Line data={data} options={options} /> */}
        <Line data={data} />
      </div>
    )
  }
}

export default Chart;