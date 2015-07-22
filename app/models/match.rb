class Match < ActiveRecord::Base
  validates :racquet_match_id, uniqueness: true

  belongs_to :club
end
