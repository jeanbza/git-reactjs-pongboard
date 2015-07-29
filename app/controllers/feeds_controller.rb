class FeedsController < ApplicationController
  def data
    @matches = Match.for_club(params[:club_id])
    render json: @matches
  end
end
