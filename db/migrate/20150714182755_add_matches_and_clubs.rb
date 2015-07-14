class AddMatchesAndClubs < ActiveRecord::Migration
  def change
    create_table :clubs do |t|
      t.string :name
      t.string :city
      t.string :state
      t.string :country

      t.timestamps null: false
    end

    create_table :matches do |t|
      t.string :winner
      t.string :loser
      t.integer :club_id

      t.timestamps null: false
    end

    add_reference :matches, :clubs, index: true, foreign_key: true
  end
end
