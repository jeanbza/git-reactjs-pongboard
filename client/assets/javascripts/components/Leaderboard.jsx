import Player from './Player';
import React from 'react';

var LeaderBoard = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        $.ajax({
            url: window.location.origin + window.location.pathname + '/rankings',
            dataType: 'json',
            cache: false,
            success: function(data) {
                var players = data.map(function (player, index) {
                    return (
                        <Player name={player.name} rating={player.rating} rank={index + 1}/>
                    );
                });

                this.setState({players: players});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
          <table className="ui very basic collapsing celled table">
            <thead><tr>
              <th>Name</th>
              <th>ELO Score</th>
              <th>ELO Rank</th>
            </tr></thead>
            <tbody>
                {this.state.players ?
                  this.state.players :
                  <tr><td className='loading'>Loading leaderboard data...</td></tr>}
            </tbody>
          </table>
        );
    }
});

module.exports = LeaderBoard;
