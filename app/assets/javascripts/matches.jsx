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

var Feed = React.createClass({
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
            <thead><tr>
              <th>Winner</th>
              <th>Loser</th>
            </tr></thead>
            <tbody>
              {this.state.matches ? this.state.matches : <td className='loading'>Loading pong data...</td>}
            </tbody>
          </table>
        );
    }
});

var NewMatchForm = React.createClass({
  getInitialState: function() {
    return {winner: '', loser: ''};
  },
  onWinnerChange: function(e) {
    this.setState({winner: e.target.value, loser: this.state.loser});
  },
  onLoserChange: function(e) {
    this.setState({winner: this.state.winner, loser: e.target.value});
  },
  handleSubmit: function(event) {
    $.ajax({
      url: this.props.url,
      type: "POST",
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      },
      dataType: 'json',
      data: JSON.stringify(this.state)
    })

    event.preventDefault();
  },
  render: function() {
    return (
      <form className="ui fluid form" id="add-match" onSubmit={this.handleSubmit}>
        <div className="two fields">
          <div className="field">
            <input nameName="winner" placeholder="@winner" type="text" onChange={this.onWinnerChange} value={this.state.winner}/>
          </div>
          <div className="field">
            <input nameName="loser" placeholder="@loser" type="text" onChange={this.onLoserChange} value={this.state.loser}/>
          </div>
          <button className="ui icon button" type="submit">
            <i className="checkmark box icon"></i>
          </button>
        </div>
      </form>
    );
  }
});

// TODO: replace with server-side injection?
var matchesGetEndpoint = window.location.origin + window.location.pathname + "/feed";
var matchesCreateEndpoint = window.location.origin + window.location.pathname + "/match";

React.render(
    <Feed url={matchesGetEndpoint} />,
    document.getElementById('feed')
);

React.render(
    <NewMatchForm url={matchesCreateEndpoint} />,
    document.getElementById('newMatchForm')
);
