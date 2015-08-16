var AppDispatcher = require('../dispatcher/AppDispatcher');
var MatchConstants = require('../constants/MatchConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _matches = [];

var CHANGE_EVENT = 'change';

// Initial get matches
$.ajax({
  url: window.location.origin + window.location.pathname + "/feed",
  dataType: 'json',
  cache: false,
  success: function(data) {
    var matches = data.map(function (match) {
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
  var matchesCreateEndpoint = window.location.origin + window.location.pathname + "/match";

  $.ajax({
    url: matchesCreateEndpoint,
    type: "POST",
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    },
    data: JSON.stringify({winner: winner, loser: loser}),
    success: function(data) {
      _matches.unshift({
        winner: winner,
        loser: loser
      });
      MatchStore.emitChange();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    }
  });
}

function destroy(id) {
  // TODO: should send a DELETE to server
  // TODO: should delete based on winner/loser, maybe? tbd
  delete _matches[id];
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
    case MatchConstants.MATCH_DESTROY:
      destroy(action.id);
      MatchStore.emitChange();
      break;
    default:
  }
});

module.exports = MatchStore;
