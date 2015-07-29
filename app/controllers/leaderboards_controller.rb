class LeaderboardsController < ApplicationController
  def data
    players = Hash.new do |hash, key|
      hash[key] = Elo::Player.new
    end

    matches = Match.for_club(params[:club_id]).order(created_at: 'desc')

    matches.each do |match|
      players[match.winner].wins_from(players[match.loser])
    end

    sorted_players = players.sort_by { |name, player| player.rating}.reverse!

    render json: sorted_players.map { |arr| {name: arr[0], rating: arr[1].rating}}
  end
end
