Rails.application.routes.draw do
  get '/about', to: 'pong#about'

  get '/', to: 'pong#clubs'
  get '/clubs', to: 'pong#clubs'

  get '/:club/feed', to: 'pong#feed'
  get '/:club/feed/data', to: 'pong#feeddata'
  get '/feed', to: 'pong#feeddata'

  get '/:club/leaderboard', to: 'pong#leaderboard'
  get '/:club/leaderboard/data', to: 'pong#leaderboarddata'
  get '/leaderboard', to: 'pong#leaderboard'
end
