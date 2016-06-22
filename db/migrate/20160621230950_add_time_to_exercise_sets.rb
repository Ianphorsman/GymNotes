class AddTimeToExerciseSets < ActiveRecord::Migration
  def change
    add_column :exercise_sets, :duration, :integer
  end
end
