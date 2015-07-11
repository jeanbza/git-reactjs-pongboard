class PongController < ActionController::Base
  def index
  end

  def data
    data = HTTParty.get('http://racquet.io/pivotal-denver/matches.json?limit=200')

    render json: data.body
  end
end
