require 'elo'

class PongController < ActionController::Base
  layout 'application'

  def feed
  end

  def leaderboard
  end

  def about
  end

  def clubs
  end

  def feeddata
    data = HTTParty.get("http://racquet.io/#{params[:club]}/matches.json?limit=200")

    render json: data.body
  end

  def leaderboarddata
    players = {}

    data = JSON.parse(HTTParty.get("http://racquet.io/#{params[:club]}/matches.json?limit=200").body)
    matches = data['results'].reverse!

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
