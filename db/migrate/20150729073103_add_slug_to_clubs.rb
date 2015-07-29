class AddSlugToClubs < ActiveRecord::Migration
  def change
    add_column :clubs, :slug, :string
    add_index :clubs, :slug
  end
end
