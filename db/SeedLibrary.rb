require 'json'
module SeedLibrary

  def self.clear_seeds
    ExerciseSet.all.each(&:destroy)
    Workout.all.each(&:destroy)
    User.all.each(&:destroy)
    user = User.create({
        :email => "ianphorsman@gmail.com",
        :password => "herpderp"
                       })
  end

  def self.mock_workouts_for email, x
    user = User.find_by_email(email)
    start_date = Date.today.days_ago(x)
    until start_date > Date.today
      workout = user.workouts.create({
                                         :day => start_date
                                     })
      SeedLibrary.exercise_sets_for workout
      start_date = start_date.next_day
    end

  end

  def self.exercise_sets_for workout
    6.times do
      exercise = Exercise.find_by_id(rand(873))
      rand(7).times do
        exercise_set = ExerciseSet.create({
                                              workout_id: workout.id,
                                              user_id: workout.user_id,
                                              exercise_id: exercise.id,
                                              day: workout.day,
                                              primary_muscle_group: exercise.primary_muscle_group,
                                              secondary_muscles: exercise.secondary_muscles,
                                              muscle_category: exercise.muscle_category,
                                              name: exercise.name,
                                              reps: (rand(10) + 1),
                                              weight: (rand(100) + 10),

                                          })
      end
    end
  end
  def self.populate_exercises
    data = JSON.load(File.open('db/workout.json', 'r').read)
    exercise_data = []
    data.each do |exercise|
      e = {}
      exercise = exercise.first
      e["name"] = exercise[0].strip || ""
      e["force"] = exercise[1]["Force"].strip || ""
      e["primary_muscle_group"] = exercise[1]["Main Muscle Worked"].strip || ""
      e["equipment"] = exercise[1]["Equipment"].strip || ""
      e["type"] = exercise[1]["Type"].strip || ""
      e["mechanic"] = exercise[1]["Mechanics Type"].strip || ""
      if exercise[1]["Equipment"].strip == "Body Only" then e["is_bodyweight"] = true else e["is_bodyweight"] = false end
      if exercise[1]["Other Muscles"]
        e["secondary_muscles"] = exercise[1]["Other Muscles"].strip
      else
        e["secondary_muscles"] = ""
      end
      e["guide"] = exercise[1]["guide"].join(' ').strip || ""
      exercise_data << e
    end
    exercise_data.each do |exercise|
      e = Exercise.create({
                              :name => exercise["name"],
                              :force => exercise["force"],
                              :primary_muscle_group => exercise["primary_muscle_group"],
                              :secondary_muscles => exercise["secondary_muscles"],
                              :equipment => exercise["equipment"],
                              :exercise_type => exercise["type"],
                              :mechanic => exercise["mechanic"],
                              :guide => exercise["guide"],
                              :is_bodyweight => exercise["is_bodyweight"]
                          })
    end
  end

  def self.color_code exercise_color_pair={}
    exercise_color_pair.each do |exercise, color|
      Exercise.where(muscle_category: exercise).each do |ex|
        ex.color = color
        ex.save
      end
    end
  end

  def self.map_muscle_category category_group_pair={}
    category_group_pair.each do |category, group|
      Exercise.where(primary_muscle_group: category).each do |ex|
        ex.muscle_category = group
        ex.save
      end
    end
  end

end