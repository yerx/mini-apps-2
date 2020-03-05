import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['Jan', 'Feb'],
  datasets: [
    {
      label: 'BTC Price USD',
      data: [55, 65]
    }
  ]
}

class Chart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>Line Example</h2>
        <Line data={data} />
      </div>
    )
  }
}

export default Chart;