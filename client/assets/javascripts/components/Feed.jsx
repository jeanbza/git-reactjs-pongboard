import Match from './Match';
import React from 'react';

var MatchStore = require('../stores/MatchStore');

function getMatches() {
  console.log('getting matches');
  var matchStoreMatches = MatchStore.getAll();
  var matches = [];

  for (var key in matchStoreMatches) {
    matches.push(<Match winner={matchStoreMatches[key].winner} loser={matchStoreMatches[key].loser} />);
  }

  return {matches: matches};
}

var Feed = React.createClass({
    getInitialState: function() {
      return getMatches();
    },
    componentDidMount: function() {
      MatchStore.addChangeListener(this._onChange);
    },
    render: function() {
        return (
          <table className="ui very basic table">
            <thead><tr>
              <th>Winner</th>
              <th>Loser</th>
            </tr></thead>
            <tbody>
              {this.state.matches ? this.state.matches : <td className='loading'>Loading pong data...</td>}
            </tbody>
          </table>
        );
    },
    _onChange: function() {
      this.setState(getMatches());
    }
});

module.exports = Feed;
