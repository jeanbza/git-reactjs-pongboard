import $ from 'jquery';
import React from 'react';
import LeaderBoard from 'components/LeaderBoard';
import Feed from 'components/Feed';
import NewMatchForm from 'components/NewMatchForm';

$(function onLoad() {
  function render() {
    if ($('#rankings').length > 0) {
      React.render(
        <LeaderBoard />,
        document.getElementById('rankings')
      );
    }

    if ($('#feed').length > 0) {
      React.render(
        <Feed />,
        document.getElementById('feed')
      );
    }

    if ($('#newMatchForm').length > 0) {
      React.render(
        <NewMatchForm />,
        document.getElementById('newMatchForm')
      );
    }
  }

  render();

  // TODO: this may be unnecessary?
  $(document).on('page:change', () => {
    render();
  });
});

$("document").ready(function() {
  $('.ui.dropdown').dropdown();
});
