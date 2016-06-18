class AddDayToExerciseSet < ActiveRecord::Migration
  def change
    add_column :exercise_sets, :day, :date
  end
end
