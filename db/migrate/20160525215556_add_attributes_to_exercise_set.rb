class AddAttributesToExerciseSet < ActiveRecord::Migration
  def change
    add_column :exercise_sets, :name, :string
    add_column :exercise_sets, :primary_muscle_group, :string
    add_column :exercise_sets, :secondary_muscles, :string
    add_column :exercise_sets, :muscle_category, :string
  end
end
