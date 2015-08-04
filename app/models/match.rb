class Match < ActiveRecord::Base
  scope :for_club, -> (slug) { joins(:club).where(clubs: {slug: slug}) }

  validates :racquet_match_id, uniqueness: true, :allow_nil => true

  belongs_to :club
end
