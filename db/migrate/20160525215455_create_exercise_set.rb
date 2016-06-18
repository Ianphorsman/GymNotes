class CreateExerciseSet < ActiveRecord::Migration
  def change
    create_table :exercise_sets do |t|
      t.integer   :user_id
      t.integer   :reps
      t.float     :weight
      t.integer   :exercise_id
      t.integer   :workout_id

      t.timestamps null: false
    end
  end
end
