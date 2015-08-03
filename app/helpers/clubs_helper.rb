module ClubsHelper
  def in_columns(orig_clubs, num_columns = 3)
    clubs = orig_clubs.to_a.dup

    clubs.sort_by!(&:player_count).reverse!

    clubs.each_slice(num_columns).to_a.transpose
  end
end
