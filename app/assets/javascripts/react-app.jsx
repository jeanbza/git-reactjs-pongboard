var Match = React.createClass({
    render: function() {
        return (
            <div className="match">
                <div className="participant ui green label">{this.props.winner}</div>
                <h2 className="versus">vs</h2>
                <div className="participant ui olive label">{this.props.loser}</div>
            </div>
        );
    }
});

var PongBoard = React.createClass({
    getInitialState: function() {
        return {matches: []};
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                var matches = data['results'].map(function (match) {
                    return (
                        <Match winner={match.winner} loser={match.loser} />
                    );
                });

                this.setState({matches: matches});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        // var matches = [{winner: 'foo', loser: 'bar'},{winner: 'gaz', loser: 'urk'},{winner: 'joe', loser: 'sam'}].map(function(match) {
        //     return (
        //         <Match winner={match.winner} loser={match.loser} />
        //     );
        // });
        // this.setState({matches: matches});
    },
    render: function() {
        return (
            <div>
                {this.state.matches}
            </div>
        );
    }
});

var endpoint = "http://" + window.location.host + "/data"

React.render(
    <PongBoard url={endpoint} />,
    document.getElementById('feed')
);