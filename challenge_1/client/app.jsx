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
      return (
        <div>
          {result.date}
          {' '}
          {result.description}
        </div>
      )
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
      perPage: 10,
      elements: [],
      currentPage: 0,
    }
  }

  loadResultsFromServer() {
    $.ajax({
      url: 'http://localhost:3000/events',
      dataType: 'json',
      type: 'GET',
      crossDomain: true,
      success: data => {
        console.log('success data', data)
        this.setState({
          data: data,
          pageCount: Math.ceil(data.length / this.state.perPage),
        }, () => this.setElementsForCurrentPage());
      },
      error: (xhr, status, err) => {
        console.error(err.toString());
      }
    });
  }

  setElementsForCurrentPage() {
    let elements = this.state.data.slice(this.state.offset, this.state.offset + this.state.perPage).map(post => ( <Result data={post} />)
    );
    this.setState({ elements: elements })
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
      <div>
        <Search />
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
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));

