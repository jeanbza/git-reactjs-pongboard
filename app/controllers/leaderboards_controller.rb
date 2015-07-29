class LeaderboardsController < ApplicationController
  def data
    players = {}

    formatted_club_name = params[:club_id].gsub(/-/, ' ')
    matches = Match.joins(:club).where('lower(clubs.name) = ?', formatted_club_name).order(created_at: 'desc')

    matches.each do |match|
        winner = match['winner']
        loser = match['loser']

      if (!players.has_key? winner)
        players[winner] = Elo::Player.new
      end

      if (!players.has_key? loser)
        players[loser] = Elo::Player.new
      end

      players[winner].wins_from(players[loser])
    end

    sorted_players = players.sort_by { |name, player| player.rating}.reverse!

    render json: sorted_players.map { |arr| {name: arr[0], rating: arr[1].rating}}
  end
end
