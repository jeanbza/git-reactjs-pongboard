Rails.application.routes.draw do
  get '/about', to: 'about#index'

  get '/', to: 'club#index'
  get '/clubs', to: 'club#index'
  post '/clubs', to: 'club#create'

  get '/feed', to: 'club#feed'
  get '/leaderboard', to: 'pong#leaderboard'

  scope '/:club' do
    get '/feed', to: 'pong#feed'
    get '/feed/data', to: 'pong#feeddata'
    get '/leaderboard', to: 'pong#leaderboard'
    get '/leaderboard/data', to: 'pong#leaderboarddata'
    post '/matches', to: 'pong#matches'
  end
end
