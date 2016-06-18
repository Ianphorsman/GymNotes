class CreateExercise < ActiveRecord::Migration
  def change
    create_table :exercises do |t|
      t.string    :name
      t.string    :muscle_category
      t.string    :primary_muscle_group
      t.string    :secondary_muscles
      t.string    :mechanic
      t.string    :equipment
      t.text      :guide
      t.string    :exercise_type
      t.string    :force
      t.boolean   :is_bodyweight
      t.string    :color

      t.timestamps null: false
    end
  end
end
