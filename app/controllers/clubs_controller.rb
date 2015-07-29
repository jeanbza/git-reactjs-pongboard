class ClubsController < ApplicationController
  def index
    @club = Club.new

    @clubs = Club.all.to_a
    @clubs.sort_by!(&:player_count).reverse!

    @clubs = @clubs.in_groups_of(3, nil).transpose.map(&:compact)
  end

  def create
    @club = Club.create!(club_attributes)
    redirect_to clubs_path
  end

  private

  def club_attributes
    params[:club].permit(:name, :city, :state, :country)
  end
end
