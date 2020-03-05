import React from 'react';
import Chart from './Chart.jsx';

class ChartApp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>This is the app</h1>
        <Chart />
      </div>
    )
  }
}

export default ChartApp;