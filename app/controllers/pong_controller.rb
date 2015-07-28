require 'elo'

class PongController < ActionController::Base
  layout 'application'

  def about
  end

  def feed
    if params[:club] == nil do
      redirect_to '/clubs'
    end
  end

  def feeddata
    if params[:club] == nil
      redirect_to '/clubs'
    else
      formatted_club_name = params[:club].gsub(/-/, ' ')
      render json: Match.joins(:club).where('lower(clubs.name) = ?', formatted_club_name).to_json
    end
  end

  def leaderboard
    if params[:club] == nil
      redirect_to '/clubs'
    end
  end

  def leaderboarddata
    players = {}

    if params[:club] == nil
      redirect_to '/clubs'
    else
      formatted_club_name = params[:club].gsub(/-/, ' ')
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
    end

    sorted_players = players.sort_by { |name, player| player.rating}.reverse!

    render json: sorted_players.map { |arr| {name: arr[0], rating: arr[1].rating}}
  end
end
