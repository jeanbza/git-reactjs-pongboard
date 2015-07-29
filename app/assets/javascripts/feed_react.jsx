var Match = React.createClass({
    render: function() {
        return (
            <div className="match">
                <div className="participant ui green label"><a href={"https://twitter.com/" + this.props.winner} target="_blank">{this.props.winner}</a></div>
                <h2 className="versus">vs</h2>
                <div className="participant ui olive label"><a href={"https://twitter.com/" + this.props.loser} target="_blank">{this.props.loser}</a></div>
            </div>
        );
    }
});

var PongBoard = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                var matches = data.map(function (match) {
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
                {this.state.matches ? this.state.matches : <h1 className='loading'>Loading pong data...</h1>}
            </div>
        );
    }
});

var endpoint = window.location.origin + window.location.pathname + "/feeddata"

React.render(
    <PongBoard url={endpoint} />,
    document.getElementById('feed')
);
