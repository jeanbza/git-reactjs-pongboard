class LeaderboardsController < ApplicationController
  def show
  end

  def rankings
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

  def feed
    @matches = Match.for_club(params[:club_id]).order(racquet_match_id: :desc, created_at: :desc)
    render json: @matches
  end

  def match
    match_data = JSON.parse(request.body.read)
    club_id = Club.where(slug: params[:club_id]).first.id
    match = Match.new(winner: match_data['winner'], loser: match_data['loser'], club_id: club_id)
    if match.save
      render :nothing => true, :status => 200
    else
      render :nothing => true, :status => 400
    end
  end
end
