Rails.application.routes.draw do
  get '/', to: 'pong#index'

  get '/data', to: 'pong#data'
end
