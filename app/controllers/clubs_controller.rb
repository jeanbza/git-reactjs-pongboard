class ClubsController < ApplicationController
  def index
    @club = Club.new
    @clubs = Club.all
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
