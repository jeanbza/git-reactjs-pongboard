var Match = React.createClass({
    render: function() {
        return (
            <tr className="match">
                <td className=""><a href={"https://twitter.com/" + this.props.winner} target="_blank">{this.props.winner}</a></td>
                <td className=""><a href={"https://twitter.com/" + this.props.loser} target="_blank">{this.props.loser}</a></td>
            </tr>
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
          <table className="ui very basic table">
            <thead>
              <tr>
                <th>Winner</th>
                <th>Loser</th>
              </tr>
            </thead>
            <tbody>
              {this.state.matches ? this.state.matches : <td className='loading'>Loading pong data...</td>}
            </tbody>
          </table>
        );
    }
});

var endpoint = window.location.origin + window.location.pathname + "/feed"

React.render(
    <PongBoard url={endpoint} />,
    document.getElementById('feed')
);
