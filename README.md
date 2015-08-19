# git-reactjs-pongboard
Ping Pong leaderboard using [Racquet.io](racquet.io) as data source.

[![Build Status](https://travis-ci.org/jadekler/git-reactjs-pongboard.svg)](https://travis-ci.org/jadekler/git-reactjs-pongboard)

## Installation and running

1. Install postgresql
  1. `brew install postgres; brew upgrade postgres`
  1. `initdb /usr/local/pgsql/data`
1. Start postgres (in a new shell) `postgres -D /usr/local/pgsql/data`
1. Create a pongboard database `createdb pongboard`
1. Set up database `db:migrate db:seed import_racquet_data`
1. Install ruby `brew install rbenv && rbenv install 2.2.0-p247 && gem install bundler`
1. Clone and navigate to project `git clone https://github.com/jadekler/git-reactjs-pongboard.git && cd git-react-pongboard`
1. Install deps `bundle install && npm install`
1. Generate assets from client `cd client && $(npm bin)/webpack --config webpack.rails.config.js && cd ..`
1. Start server `rails s`
1. Navigate to `http://localhost:3000/`

## Hotswapping assets when a change occurs

You can use `$(npm bin)/webpack -w --config webpack.rails.config.js` to recompile assets on each file change.

## Contributing

Feel free to contribute by forking and submitting PRs. See the issues tab for open issues to work on.
Contact jadekler@gmail.com for any questions about contributing.
