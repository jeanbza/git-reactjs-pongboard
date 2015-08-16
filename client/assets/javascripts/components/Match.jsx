import React from 'react';

var MatchActions = require('../actions/MatchActions');

var Match = React.createClass({
  removeMatch: function(event) {
    var matchId = $(event.target).parents('tr.match').attr('data-id');
    MatchActions.destroy(matchId);
  },
  render: function() {
    return (
      <tr className="match" data-id={this.props.id}>
        <td className=""><a href={"https://twitter.com/" + this.props.winner} target="_blank">{this.props.winner}</a></td>
        <td className=""><a href={"https://twitter.com/" + this.props.loser} target="_blank">{this.props.loser}</a></td>
        <td>
          <button className="ui icon basic button" onClick={this.removeMatch}>
            <i className="icon remove"></i>
          </button>
        </td>
      </tr>
    );
  }
});

module.exports = Match;
