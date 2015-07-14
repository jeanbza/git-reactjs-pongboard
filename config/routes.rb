Rails.application.routes.draw do
  get '/', to: 'pong#feed'
  get '/about', to: 'pong#about'
  get '/clubs', to: 'pong#clubs'

  get '/:club/feed/data', to: 'pong#feeddata'
  get '/:club/leaderboard', to: 'pong#leaderboard'
  get '/:club/leaderboard/data', to: 'pong#leaderboarddata'
end
