Rails.application.routes.draw do
  get '/', to: 'pong#clubs'
  get '/about', to: 'pong#about'
  get '/clubs', to: 'pong#clubs'
  get '/feed', to: 'pong#feeddata'
  get '/leaderboard', to: 'pong#leaderboard'

  scope '/:club' do
    get '/feed', to: 'pong#feed'
    get '/feed/data', to: 'pong#feeddata'
    get '/leaderboard', to: 'pong#leaderboard'
    get '/leaderboard/data', to: 'pong#leaderboarddata'
    post '/matches', to: 'pong#matches'
  end
end
