# git-reactjs-pongboard
Ping Pong leaderboard using [Racquet.io](racquet.io) as data source.

## Installation and running

1. Install mysql
1. `mysql -uroot -e 'create database pongboard'`
1. `mysql -uroot -e 'create table matches(id int(11) auto_increment, winner varchar(255) not null, loser varchar(255) not null, created_at timestamp, primary key (id));' pongboard`
1. Install ruby
1. `bundle install && rails s`
1. Navigate to `http://localhost:3000/`

## To be implemented:

- Data store to reduce load times and excess API calls
- Match input to remove dependency on racquet.io
- Groups, so that this is not denver labs specific
- Better UI (resize/mobile friendly, for instance)
- Twitter integration
