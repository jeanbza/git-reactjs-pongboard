class LeaderboardsController < ApplicationController
  def data
    players = Hash.new do |hash, key|
      hash[key] = Elo::Player.new
    end

    formatted_club_name = params[:club_id].gsub(/-/, ' ')
    matches = Match.joins(:club).where('lower(clubs.name) = ?', formatted_club_name).order(created_at: 'desc')

    matches.each do |match|
      players[match.winner].wins_from(players[match.loser])
    end

    sorted_players = players.sort_by { |name, player| player.rating}.reverse!

    render json: sorted_players.map { |arr| {name: arr[0], rating: arr[1].rating}}
  end
end
