/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var MatchConstants = require('../constants/MatchConstants');

var MatchActions = {
  create: function(winner, loser) {
    AppDispatcher.dispatch({
      actionType: MatchConstants.MATCH_CREATE,
      winner: winner,
      loser: loser
    });
  },

  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: MatchConstants.MATCH_DESTROY,
      id: id
    });
  }
};

module.exports = MatchActions;
