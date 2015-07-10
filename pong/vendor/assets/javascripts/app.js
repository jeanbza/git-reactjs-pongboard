var Match = React.createClass({
    render: function() {
        return (
            <div className="match"> {this.props.winner} beat {this.props.loser}</div>
        );
    }
});

var PongBoard = React.createClass({
    getInitialState: function() {
        return {match_data: []};
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'jsonp',
            cache: false,
            success: function(data) {
                console.log(data);

                var matches = data['results'].map(function(match) {
                    return (
                        <Match winner={match.winner} loser={match.loser}/>
                    );
                });

                this.setState({match_data: matches});
            }.bind(this),
            error: function(xhr, status, err) {
                console.log('bad');

                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        console.log(this.state);

        return (
            <h1>Matches</h1>
        );
    }
});

React.render(
    <PongBoard url="http://racquet.io/pivotal-denver/matches.json?limit=200"/>,
    document.getElementById('content')
);