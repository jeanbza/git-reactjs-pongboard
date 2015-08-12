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
