class Club < ActiveRecord::Base
  before_validation :set_slug

  validates :slug, presence: true

  def set_slug
    self.slug = name.downcase.gsub(/ /, '-')
  end

  def to_param
    slug
  end

  def player_count
    conn = ActiveRecord::Base.connection
    result = conn.execute(%Q{
      select count(*) as members_in_club
      from (
        select distinct(player)
        from (
          select distinct(winner) as player
          from matches
          where club_id = #{conn.quote(id)}
          union
          select distinct(loser) as player
          from matches
          where club_id = #{conn.quote(id)}
        ) x
      ) y
    })

    result.to_a.last['members_in_club'].to_i || 0
  end
end
