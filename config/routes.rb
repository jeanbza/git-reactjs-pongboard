Rails.application.routes.draw do
  get '/about', to: 'about#index'

  resources :clubs, only: [:index, :create] do
    member do
      resource :leaderboard, only: :show
    end
  end

  get '/feed', to: 'clubs#feed'
  get '/leaderboard', to: 'pong#leaderboard'

  scope '/:club' do
    get '/feed', to: 'pong#feed'
    get '/feed/data', to: 'pong#feeddata'
    get '/leaderboard', to: 'pong#leaderboard'
    get '/leaderboard/data', to: 'pong#leaderboarddata'
    post '/matches', to: 'pong#matches'
  end

  root to: 'clubs#index'
end
