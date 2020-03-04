import React from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import $ from 'jquery';

import Search from './components/Search.jsx';

window.React = React;

export class ResultList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let resultNodes = this.props.data.map(function(result, index) {
      return <div key={result.description} >
        {result.description}
      </div>
    });
    return (
      <div>
        <ul>{resultNodes}</ul>
      </div>
    );
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      data: [],
      // elements: [],
      // perPage: 10,
      // currentPage: 0,
      // pageCount: 0,
    }

    this.loadResultsFromServer = this.loadResultsFromServer.bind(this);

  }

  loadResultsFromServer() {
    $.ajax({
      url: 'http://localhost:3000/events',
      dataType: 'json',
      type: 'GET',

      success: data => {
        console.log('success data', data)
        this.setState({
          //@dev console log here
          data: data.data,
          //@dev what is meta and total here?
          pageCount: Math.ceil(data.meta.total_count / data.meta.limit)
        });
      },
      // (xhr, status, err)
      error: (xhr, status, err) => {
        console.error(err.toString());
      }
    });
  }

  componentDidMount() {
    this.loadResultsFromServer();
  }

  handlePageClick = data => {
    console.log('selected', data.selected);
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPage);

    this.setState({ offset: offset }, () => {
      this.loadResultsFromServer();
    });
  };

  render() {
    return (
      <div className="resultsBox">
        <ResultList data={this.state.data} />
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}


ReactDOM.render(<App perPage={10} />, document.getElementById('app'));

