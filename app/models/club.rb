class Club < ActiveRecord::Base
  def self.members_in_club(id)
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

    final_result = 0
    result.each do |result|
      final_result = result
    end

    final_result
  end
end
