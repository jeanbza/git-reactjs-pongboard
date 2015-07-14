# Import data from racquet.io
task :import_racquet_data => :environment do
  puts 'Importing data from Racquet.io'

  match_data = JSON.parse(HTTParty.get('http://racquet.io/pivotal-denver/matches.json?limit=500').body)['results']

  match_data.each do |match|
    Match.create(winner: match['winner'], loser: match['loser'], club_id: Club.first.id)
  end
end
