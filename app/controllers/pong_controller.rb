require 'elo'

class PongController < ActionController::Base
  layout 'application'

  def feed
  end

  def leaderboard
    if params[:club] == nil
      redirect_to '/clubs'
    end
  end

  def about
  end

  def clubs
    @clubs = Club.all.map do |club|
      {
        name: club.name,
        resource_name: club.name.downcase.gsub(/ /, '-'),
        player_count: Club.members_in_club(club.id)
      }
    end

    @clubs.sort_by! do |item| item[:player_count] end
    @clubs.reverse!
  end

  def feeddata
    if params[:club] == nil
      redirect_to '/clubs'
    else
      data = HTTParty.get("http://racquet.io/#{params[:club]}/matches.json?limit=200")
      render json: data.body
    end
end

  def leaderboarddata
    players = {}

    if params[:club] == nil
      redirect_to '/clubs'
    else
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
    end

    sorted_players = players.sort_by { |name, player| player.rating}.reverse!

    render json: sorted_players.map { |arr| {name: arr[0], rating: arr[1].rating}}
  end
end
