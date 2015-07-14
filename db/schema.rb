# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150714182755) do

  create_table "clubs", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.string   "city",       limit: 255
    t.string   "state",      limit: 255
    t.string   "country",    limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "matches", force: :cascade do |t|
    t.string   "winner",     limit: 255
    t.string   "loser",      limit: 255
    t.integer  "club_id",    limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "clubs_id",   limit: 4
  end

  add_index "matches", ["club_id"], name: "fk_rails_10d81630ec", using: :btree
  add_index "matches", ["clubs_id"], name: "index_matches_on_clubs_id", using: :btree

  add_foreign_key "matches", "clubs"
end
