Rails.application.routes.draw do
  resources :clubs, only: [:index, :create] do
    resource :feed, only: :show do
      member do
        get :data
      end
    end

    resource :leaderboard, only: :show do
      member do
        get :feed
        get :rankings
        post :match
      end
    end
  end

  get '/about', to: 'about#index'

  root to: redirect('/clubs')
end
