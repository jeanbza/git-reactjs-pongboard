Rails.application.routes.draw do
  get '/', to: 'pong#feed'
  get '/feed', to: 'pong#feed'
  get '/feed/data', to: 'pong#feeddata'

  get '/leaderboard', to: 'pong#leaderboard'
  get '/leaderboard/data', to: 'pong#leaderboarddata'

  get '/about', to: 'pong#about'
end
