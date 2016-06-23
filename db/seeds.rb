# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require_relative 'SeedLibrary'

SeedLibrary.clear_seeds
#User.create({ :email => 'ianphorsman@gmail.com', :password => 'herpderp' })
SeedLibrary.mock_workouts_for('ianphorsman@gmail.com', 3)
# Deletes all rows from the Users, ExerciseSets, and Workouts table, but keeps the Exercise rows.
<<-eof

SeedLibrary.clear_seeds

eof

# populate app with exercises based on the 'db/workout.json' file
<<-eof

SeedLibrary.populate_exercises

eof

# Determine the primary 'muscle_category' for each exercise based on its 'primary_muscle_group' field
# SeedLibrary.map_muscle_category { muscle_category => primary_muscle_group, ... }
# Default options provided below.
<<-eof

SeedLibrary.map_muscle_category category_group_pair = {
  "Abs" => "Abdominals",
  "Arms" => "Biceps",
  "Arms" => "Forearms",
  "Arms" => "Triceps",
  "Back" => "Lats",
  "Back" => "Lower Back",
  "Back" => "Middle Back",
  "Back" => "Neck",
  "Chest" => "Chest",
  "Glutes" => "Abductors",
  "Glutes" => "Adductors",
  "Glutes" => "Glutes",
  "Legs" => "Calves",
  "Legs" => "Hamstrings",
  "Legs" => "Quadriceps",
  "Shoulders" => "Shoulders",
  "Shoulders" => "Traps"
}

eof

# Populate the color field of each exercise.
# This will provide color coordinating of exercises by muscle category for graphs and plots.
# Make sure that muscle_categories have been mapped first above with SeedLibrary.map_muscle_category {...}
# Default options provided below.
<<-eof

SeedLibrary.map_color_code exercise_color_pair = {
  "Abs" => "#d9bf2b",
  "Arms" => "#607625",
  "Back" => "#613cb3",
  "Chest" => "#d96e2b",
  "Glutes" => "#d92b4b",
  "Legs" => "#036",
  "Shoulders" => "#a2c83c"
}

eof


# Populate an existing user with mock workouts spanning back 'x' days.
# Workouts are filled with exercise sets chosen at random.
# Exercise sets are performed a random number of times with a random amount of weight and number of reps.
<<-eof
SeedLibrary.mock_workouts_for 'testuser@gmail.com', 14
eof

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