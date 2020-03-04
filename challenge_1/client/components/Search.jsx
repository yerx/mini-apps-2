import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <form>
          <label>
            Search here
            <input />
          </label>
        </form>
      </div>
    )
  }
}

export default Search;