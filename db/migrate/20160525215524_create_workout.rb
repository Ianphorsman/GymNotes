class CreateWorkout < ActiveRecord::Migration
  def change
    create_table :workouts do |t|
      t.integer   :user_id
      t.date      :day
      t.text      :notes

      t.timestamps null: false
    end
  end
end
