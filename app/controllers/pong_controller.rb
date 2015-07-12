class PongController < ActionController::Base
  def feed
  end

  def leaderboard
  end

  def about
  end

  def data
    data = HTTParty.get('http://racquet.io/pivotal-denver/matches.json?limit=200')

    render json: data.body
  end
end
