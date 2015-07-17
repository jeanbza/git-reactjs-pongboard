require File.expand_path('../boot', __FILE__)

require 'rails/all'
require 'rufus-scheduler'

Bundler.require(*Rails.groups)

module Pong
  class Application < Rails::Application
  end
end

scheduler = Rufus::Scheduler.new

scheduler.every '5s' do
  Rake::Task.clear
  Pong::Application.load_tasks

  Rake::Task[:import_racquet_data].reenable # in case you're going to invoke the same task second time.
  Rake::Task[:import_racquet_data].invoke
end
