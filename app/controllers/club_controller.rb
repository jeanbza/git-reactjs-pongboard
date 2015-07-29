class ClubController < ActionController::Base
  layout 'application'

  def index
    clubs = Club.all.map do |club|
      {
        id: club.id,
        name: club.name,
        country: club.country.downcase,
        player_count: Club.members_in_club(club.id)
      }
    end
    clubs.sort_by! do |item| item[:player_count] end
    clubs.reverse!

    @clubs_1_step = []
    @clubs_2_step = []
    @clubs_3_step = []

    clubs.each_with_index do |club, index|
      if index % 3 == 0
        @clubs_1_step.push(club)
      end

      if index % 3 == 1
        @clubs_2_step.push(club)
      end

      if index % 3 == 2
        @clubs_3_step.push(club)
      end
    end
  end

  def create
    Club.create(:name => params['club-name'], :city => params['city'], :state => params['state'], :country => params['country'])

    redirect_to action: 'index'
  end
end
