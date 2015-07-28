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
    Club.create(:name => params['club-name'], :city => params['city'], :state => params['state'], :country => params['country'])

    redirect_to action: 'index'
  end
end
