class ExerciseSet < ActiveRecord::Base

  validates :reps, :presence => true, :numericality => { :greater_than => 0 }
  validates :weight, :presence => true, :numericality => { :greater_than => 0 }
  validates_presence_of :name, :reps, :weight, :user_id, :workout_id, :exercise_id

  def volume
    self.reps * self.weight
  end

  def strength
    if self.reps == 0
      0
    else
      self.weight / self.reps
    end
  end

end
