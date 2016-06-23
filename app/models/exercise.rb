class Exercise < ActiveRecord::Base

  validates_uniqueness_of :name

  def self.muscle_groups
    Exercise.all.map(&:primary_muscle_group).uniq
  end

  def self.list
    Exercise.all.map(&:name).sort
  end

  def self.list_for user_id
    user = User.find_by_id(user_id)
    exercises = {}
    Exercise.all.map do |e|
      exercises[e.name] = {
          :count => 0,
          :muscle_group => e.muscle_category
      }
    end
    user.exercise_sets.each do |es|
      exercises[es.name][:count] += 1
    end
    exercise_list = {}
    exercise_list["Performed"] = user.exercise_sets.map(&:name).uniq.sort
    exercises.sort_by { |k, v| [v[:muscle_group], -v[:count]] }.each do |e|
      if exercise_list[e[1][:muscle_group]]
        exercise_list[e[1][:muscle_group]] << e[0]
      else
        exercise_list[e[1][:muscle_group]] = [e[0]]
      end
    end
    exercise_list
  end

end
