class Match < ActiveRecord::Base
  validates :racquet_match_id, uniqueness: true
end
