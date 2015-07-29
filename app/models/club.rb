class Club < ActiveRecord::Base
  def to_param
    name.downcase.gsub(/ /, '-')
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

    result.to_a.last || 0
  end
end
