class FeedsController < ApplicationController
  def data
    formatted_club_name = params[:id].gsub(/-/, ' ')
    render json: Match.joins(:club).where('lower(clubs.name) = ?', formatted_club_name).to_json
  end
end
