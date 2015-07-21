var Player = React.createClass({
    render: function() {
        return (
            <tr className="player">
                <td><h4 className="ui header"><div className="content">{this.props.name}</div></h4></td>
                <td>{this.props.rating}</td>
                <td>11</td>
            </tr>
        );
    }
});

var LeaderBoard = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        var colours = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown'].reverse();
        var coloursLength = colours.length;
        // var randomColourStart = Math.floor(Math.random() * coloursLength);
        var colourStart = 6;

        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                var players = data.map(function (player, index) {
                    var colour = colours[(colourStart + index) % coloursLength]

                    return (
                        <Player name={player.name} rating={player.rating} colour={colour} />
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

var endpoint = window.location.origin + window.location.pathname + '/data'

React.render(
    <LeaderBoard url={endpoint} />,
    document.getElementById('leaderboard')
);
