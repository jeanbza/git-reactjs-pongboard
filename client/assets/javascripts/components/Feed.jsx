import Match from './Match';
import React from 'react';

var MatchStore = require('../stores/MatchStore');

var Feed = React.createClass({
    getInitialState: function() {
        return {}}
    },
    componentDidMount: function() {
      var matchStoreMatches = MatchStore.getAll();
      var matches = [];

      for (var key in matchStoreMatches) {
        matches.push(<Match winner={matchStoreMatches[key].winner}, loser={matchStoreMatches[key].loser} />);
      }

      // var matches = MatchStore.getAll().map(function (match) {
      //     return (
      //         <Match winner={match.winner} loser={match.loser} />
      //     );
      // });

      this.setState({matches: matches});
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
    }
});

module.exports = Feed;
