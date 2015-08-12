var AppDispatcher = require('../dispatcher/AppDispatcher');
var MatchConstants = require('../constants/MatchConstants');
var assign = require('object-assign');

var _matches = {5: {winner: 'bob', loser: 'sue'}, 8: {winner: 'alex', loser: 'ronda'}};

var matchesCreateEndpoint = window.location.origin + window.location.pathname + "/match";

function create(winner, loser) {
  console.log('Posting match to server');

  $.ajax({
    url: matchesCreateEndpoint,
    type: "POST",
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    },
    dataType: 'json',
    data: JSON.stringify(this.state),
    success: function(data) {
      // TODO: this id should be in the server response body
      var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

      _matches[id] = {
        winner: winner,
        loser: loser
      };

      console.log('Successful POST');
    }
  });
}

function destroy(id) {
  // TODO: should send a DELETE to server

  delete _matches[id];
}

var MatchStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    // $.ajax({
    //     url: this.props.url,
    //     dataType: 'json',
    //     cache: false,
    //     success: function(data) {
    //         var matches = data.map(function (match) {
    //             return (
    //                 <Match winner={match.winner} loser={match.loser} />
    //             );
    //         });
    //
    //         this.setState({matches: matches});
    //     }.bind(this),
    //     error: function(xhr, status, err) {
    //         console.error(this.props.url, status, err.toString());
    //     }.bind(this)
    // });

    return _matches;
  },
});

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case MatchConstants.MATCH_CREATE:
      create(action.winner, action.loser);
      break;
    case TodoConstants.MATCH_DESTROY:
      destroy(action.id);
      break;
    default:
  }
});

module.exports = MatchStore;
