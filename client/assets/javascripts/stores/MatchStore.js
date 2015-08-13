var AppDispatcher = require('../dispatcher/AppDispatcher');
var MatchConstants = require('../constants/MatchConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _matches = [];

var CHANGE_EVENT = 'change';

$.ajax({
  url: window.location.origin + window.location.pathname + "/feed",
  dataType: 'json',
  cache: false,
  success: function(data) {
    var matches = data.map(function (match) {
      // TODO: id should come from server
      return {winner: match.winner, loser: match.loser};
    });

    _matches = matches;
    MatchStore.emitChange();
  }.bind(this),
  error: function(xhr, status, err) {
    console.error(status, err.toString());
  }.bind(this)
});

function create(winner, loser) {
  console.log('Posting match to server');

  var matchesCreateEndpoint = window.location.origin + window.location.pathname + "/match";

  $.ajax({
    url: matchesCreateEndpoint,
    type: "POST",
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    },
    dataType: 'json',
    data: JSON.stringify({winner: winner, loser: loser}),
    success: function(data) {
      console.log('Success!');

      console.log('Successful POST');
    }
  });

  // TODO: this should be in the ajax success call
  // TODO: this id should be in the server response body
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

  _matches.unshift({
    winner: winner,
    loser: loser
  });
}

function destroy(id) {
  // TODO: should send a DELETE to server
  // TODO: should delete based on winner/loser, maybe? tbd
  // delete _matches[id];
}

var MatchStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _matches;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
});

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case MatchConstants.MATCH_CREATE:
      create(action.winner, action.loser);
      MatchStore.emitChange();
      break;
    case TodoConstants.MATCH_DESTROY:
      destroy(action.id);
      MatchStore.emitChange();
      break;
    default:
  }
});

module.exports = MatchStore;
