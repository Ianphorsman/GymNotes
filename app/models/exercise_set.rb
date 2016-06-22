class ExerciseSet < ActiveRecord::Base

  validates :reps, :presence => true
  validates :weight, :presence => true
  validates :duration, :presence => true
  validates_presence_of :name, :reps, :weight, :user_id, :workout_id, :exercise_id

  def volume
    reps = self.reps
    weight = self.weight
    duration = self.duration
    if weight == 0 && duration == 0 && reps > 0
      reps
    elsif reps > 0 && weight > 0 && duration == 0
      reps * weight
    elsif reps == 0 && weight == 0 && duration > 0
      duration
    else
      reps * weight
    end
  end

  def strength
    if self.reps == 0
      0
    else
      self.weight / self.reps
    end
  end

end
