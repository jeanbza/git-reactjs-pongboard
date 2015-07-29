desc 'Import data from racquet.io'
task :import_racquet_data => :environment do
  puts 'Importing data from Racquet.io'

  Club.all.each_with_index do |club, index|
    club_uri = club.name.gsub(/[ \.\/]/, '-').gsub(/[-]+/, '-').downcase
    club_uri = club_uri[0...-1] if club_uri[-1, 1] == '-' # Remove last character if -
    club_url = "http://racquet.io/#{club_uri}/matches.json?limit=500"

    puts "(#{index + 1}/#{Club.count}) Importing #{club.name} data from #{club_url}"

    match_data = JSON.parse(HTTParty.get(club_url).body)['results']

    match_data.each do |match|
      Match.create(winner: match['winner'], loser: match['loser'], club_id: club.id, racquet_match_id: match['match_id'])
    end
  end
end
