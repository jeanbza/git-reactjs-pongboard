/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var MatchConstants = require('../constants/MatchConstants');
var assign = require('object-assign');

var _matches = {};

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(winner, loser) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _matches[id] = {
    winner: winner,
    loser: loser
  };
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  delete _matches[id];
}

var MatchStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _matches;
  },
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case MatchConstants.MATCH_ADD:
      create(action.winner, action.loser);
      break;
    case TodoConstants.MATCH_DESTROY:
      destroy(action.id);
      break;
    default:
  }
});

module.exports = MatchStore;
