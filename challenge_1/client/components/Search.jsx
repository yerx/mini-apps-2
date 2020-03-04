import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <form>
          <label>
            Search:
            <input type="text" />
          </label>
        </form>
    )
  }
}

export default Search;