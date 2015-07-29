require 'elo'

class MatchController < ActionController::Base
  layout 'application'

  def index
    if params[:club_id] == nil
      redirect_to '/clubs'
    end
  end

  def feeddata
    puts 'helloooo'

    if params[:club_id] == nil
      redirect_to '/clubs'
    else
      puts "*"*80
      foo = Match.where(club_id: params[:club_id])

      puts foo
      render json: Match.where(club_id: params[:club_id]).to_json
    end
  end

  def rankingdata
    players = {}

    if params[:club_id] == nil
      redirect_to '/clubs'
    else
      matches = Match.where(club_id: params[:club_id]).order(created_at: 'desc')

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
