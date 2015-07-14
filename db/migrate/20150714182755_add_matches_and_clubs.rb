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

      add_reference :clubs, :club, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
