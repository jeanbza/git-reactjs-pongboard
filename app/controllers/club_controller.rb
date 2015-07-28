class ClubController < ActionController::Base
  layout 'application'

  def index
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

  def create

  end
end
