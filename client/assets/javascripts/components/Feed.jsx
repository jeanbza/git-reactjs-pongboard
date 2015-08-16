import Match from './Match';
import React from 'react';

var MatchStore = require('../stores/MatchStore');

function getMatches() {
  var matches = [];
  var matchStoreMatches = MatchStore.getAll();

  for (var key in matchStoreMatches) {
    matches.push(<Match winner={matchStoreMatches[key].winner} loser={matchStoreMatches[key].loser} id={key} />);
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
              <th></th>
            </tr></thead>
            <tbody>
              {this.state.matches.length > 0 ? this.state.matches : <td className='loading'>Loading pong data...</td>}
            </tbody>
          </table>
        );
    },
    _onChange: function() {
      this.setState(getMatches());
    }
});

module.exports = Feed;
