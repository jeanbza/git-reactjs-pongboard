var Player = React.createClass({
    render: function() {
        return (
            <div className="player">
                <a className={"ui image label " + this.props.colour}>
                    {this.props.name}
                    <div className="detail">{this.props.rating}</div>
                </a>
            </div>
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
            <div className="leaderboard">
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