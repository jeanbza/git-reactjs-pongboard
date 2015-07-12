var Player = React.createClass({
    render: function() {
        return (
            <h3>{this.props.name} {this.props.rating}</h3>
        );
    }
});

var LeaderBoard = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                var players = data.map(function (player) {
                    return (
                        <Player name={player.name} rating={player.rating} />
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
            <div>
                {this.state.players ? this.state.players : <h1 className='loading'>Loading leaderboard data...</h1>}
            </div>
        );
    }
});

var endpoint = "http://" + window.location.host + "/leaderboard/data"

React.render(
    <LeaderBoard url={endpoint} />,
    document.getElementById('leaderboard')
);