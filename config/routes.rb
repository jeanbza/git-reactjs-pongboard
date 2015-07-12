Rails.application.routes.draw do
  get '/', to: 'pong#feed'
  get '/leaderboard', to: 'pong#leaderboard'
  get '/about', to: 'pong#about'

  get '/data', to: 'pong#data'
end
