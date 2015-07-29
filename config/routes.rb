Rails.application.routes.draw do
  resources :clubs, only: [:index, :create] do
    member do
      resource :leaderboard, only: :show
      resource :feed, only: :show do
        member do
          get :data
        end
      end
      resource :leaderboard, only: :show do
        member do
          get :data
        end
      end
    end
  end

  get '/leaderboard', to: 'pong#leaderboard'

  scope '/:club' do
    get '/leaderboard', to: 'pong#leaderboard'
    get '/leaderboard/data', to: 'pong#leaderboarddata'
    post '/matches', to: 'pong#matches'
  end

  get '/about', to: 'about#index'

  root to: 'clubs#index'
end
