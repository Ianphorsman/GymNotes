class Exercise < ActiveRecord::Base

  validates_uniqueness_of :name

  def self.muscle_groups
    Exercise.all.map(&:primary_muscle_group).uniq
  end

  def self.list
    exercise_list = {}
    Exercise.all.each do |exercise|
      if exercise_list[exercise[:primary_muscle_group]]
        exercise_list[exercise[:primary_muscle_group]] << exercise[:name]
      else
        exercise_list[exercise[:primary_muscle_group]] = [exercise[:name]]
      end
    end
    exercise_list.sort_by { |k, v| k }.to_h
  end

  def self.list_for user_id
    user = User.find_by_id(user_id)
    exercises = {}
    Exercise.all.map do |e|
      exercises[e.name] = {
          :count => 0,
          :muscle_group => e.primary_muscle_group
      }
    end
    user.exercise_sets.each do |es|
      exercises[es.name][:count] += 1
    end
    exercise_list = {}
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
