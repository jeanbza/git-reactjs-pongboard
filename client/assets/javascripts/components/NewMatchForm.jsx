import React from 'react';

var MatchActions = require('../actions/MatchActions');

const NewMatchForm = React.createClass({
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
    event.preventDefault();

    MatchActions.create(this.state.winner, this.state.loser);
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

module.exports = NewMatchForm;
