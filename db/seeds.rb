# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require_relative 'SeedLibrary'
SeedLibrary.clear_seeds
SeedLibrary.mock_workouts_for 'ianphorsman@gmail.com'

__END__
SeedLibrary.color_code(exercise_color_pair = {
    "Abdominals"    => "#d9bf2b",
    "Abductors"     => "#d92b4b",
    "Adductors"     => "#d92b4b",
    "Biceps"        => "#607625",
    "Calves"        => "#036",
    "Chest"         => "#d96e2b",
    "Forearms"      => "#607625",
    "Glutes"        => "#d92b4b",
    "Hamstrings"    => "#036",
    "Lats"          => "#613cb3",
    "Lower Back"    => "#613cb3",
    "Middle Back"   => "#613cb3",
    "Neck"          => "#613cb3",
    "Quadriceps"    => "#036",
    "Shoulders"     => "#a2c83c",
    "Traps"         => "#a2c83c",
    "Triceps"       => "#607625"
})

__END__
SeedLibrary.map_muscle_category(category_group_pair = {
  "Abdominals"    => "Abs",
  "Abductors"     => "Glutes",
  "Adductors"     => "Glutes",
  "Biceps"        => "Arms",
  "Calves"        => "Legs",
  "Chest"         => "Chest",
  "Forearms"      => "Arms",
  "Glutes"        => "Glutes",
  "Hamstrings"    => "Legs",
  "Lats"          => "Back",
  "Lower Back"    => "Back",
  "Middle Back"   => "Back",
  "Neck"          => "Back",
  "Quadriceps"    => "Legs",
  "Shoulders"     => "Shoulders",
  "Traps"         => "Shoulders",
  "Triceps"       => "Arms"
})

__END__
SeedLibrary.populate_exercises