var Match = React.createClass({
    render: function() {
        return (
            <div className="match"> {this.props.winner} beat {this.props.loser}</div>
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
    },
    render: function() {
        return (
            <div>
                <h1>Matches</h1>
                {this.state.matches}
            </div>
        );
    }
});

var endpoint = "http://" + window.location.host + "/data"

React.render(
    <PongBoard url={endpoint} />,
    document.getElementById('content')
);