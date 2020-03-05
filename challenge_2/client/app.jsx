import React from 'react';
import ReactDOM from 'react-dom';
import ChartApp from './components/ChartApp.jsx';

function App() {
  return (
    <div>
      <ChartApp />
      <p>Powered by <a href="https://www.coindesk.com/price/bitcoin">CoinDesk</a></p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));

