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
        country: club.country.downcase,
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
      render json: Match.all.to_json
    end
  end

  def leaderboarddata
    players = {}

    if params[:club] == nil
      redirect_to '/clubs'
    else
      formatted_club_name = format_club_name params[:club]
      matches = Match.joins(:club).where('lower(clubs.name) = ?', 'pivotal denver').order(created_at: 'desc')

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

  def format_club_name(club_name)
    formatted_club_name = club_name.gsub(/[ \.\/]/, '-').gsub(/[-]+/, '-').downcase
    formatted_club_name[0...-1] if formatted_club_name[-1, 1] == '-' # Remove last character if -
  end
end
