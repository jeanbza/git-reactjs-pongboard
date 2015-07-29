Rails.application.routes.draw do
  get '/about', to: 'about#index'

  get '/', to: 'club#index'
  get '/clubs', to: 'club#index'
  post '/clubs', to: 'club#create'

  get '/feed', to: 'club#feed'
  get '/leaderboard', to: 'match#index'

  scope '/:club_id' do
    get '/leaderboard', to: 'match#index'
    get '/leaderboard/feeddata', to: 'match#feeddata'
    get '/leaderboard/rankingdata', to: 'match#rankingdata'
  end
end
