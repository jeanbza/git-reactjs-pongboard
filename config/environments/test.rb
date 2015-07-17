Rails.application.configure do
  config.eager_load = false
  config.consider_all_requests_local = true
  config.log_level = :debug
end
