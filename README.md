# git-reactjs-pongboard
Ping Pong leaderboard using [Racquet.io](racquet.io) as data source.

## Installation and running

1. Install postgresql
  1. `brew install postgres; brew upgrade postgres`
  1. `initdb /usr/local/pgsql/data`
1. Start postgres `postgres -D /usr/local/pgsql/data`
1. Create a pongboard database `createdb pongboard`
1. Set up database `db:migrate db:seed import_racquet_data`
1. Install ruby `brew install rbenv && rbenv install 2.2.0-p247 && gem install bundler`
1. Install deps `cd /path/to/project && bundle install`
1. Start server `cd /path/to/project rails s`
1. Navigate to `http://localhost:3000/`

## Contributing

Feel free to contribute by forking and submitting PRs. See the issues tab for open issues to work on.
Contact jadekler@gmail.com for any questions about contributing.
