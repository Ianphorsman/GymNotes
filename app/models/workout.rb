class Workout < ActiveRecord::Base

  has_many :exercise_sets

  validates :day, :presence => true, :uniqueness => { :scope => :user_id }

  def total_sets
    self.exercise_sets.count
  end

  def total_volume
    if self.exercise_sets.length == 0
      0
    else
      self.exercise_sets.map(&:volume).inject(&:+)
    end
  end

  def average_strength
    if self.exercise_sets.length == 0
      0
    else
      strength = self.exercise_sets.map(&:strength)
      strength.inject(&:+) / strength.length
    end
  end

  def total_reps
    if self.exercise_sets.length == 0
      0
    else
      self.exercise_sets.map(&:reps).inject(&:+)
    end
  end

  def sets_by_exercise
    exercise_sets = {}
    self.exercise_sets.each do |es|
      if exercise_sets[es.name]
        exercise_sets[es.name] << es
      else
        exercise_sets[es.name] = [es]
      end
    end
    exercise_sets
  end

  def sets_by_muscle_group
    exercise_sets = {}
    self.exercise_sets.each do |es|
      if exercise_sets[es.primary_muscle_group]
        exercise_sets[es.primary_muscle_group] << es
      else
        exercise_sets[es.primary_muscle_group] = [es]
      end
    end
    exercise_sets
  end

  def sets_by_muscle_category
    exercise_sets = {}
    self.exercise_sets.each do |es|
      if exercise_sets[es.muscle_category]
        exercise_sets[es.muscle_category] << es
      else
        exercise_sets[es.muscle_category] = [es]
      end
    end
    exercise_sets
  end

  def focus
    muscle_categories = {}
    if self.exercise_sets.length == 0
      ["None", 0]
    else
      self.exercise_sets.each do |es|
        category = es.muscle_category
        if muscle_categories[category]
          muscle_categories[category] += es.volume
        else
          muscle_categories[category] = es.volume
        end
      end
      muscle_categories.sort_by { |key, value| value}[-1]
    end
  end

  def breakdown
    muscle_categories = {}
    self.exercise_sets.each do |es|
      category = es.muscle_category
      if muscle_categories[category]
        muscle_categories[category] += es.volume
      else
        muscle_categories[category] = es.volume
      end
    end
    muscle_categories.sort_by { |key, value| value}.map { |pair| pair << Exercise.where(muscle_category: pair[0]).first.color }
  end

  def volume_for_muscle_group muscle_group
    volume = 0
    self.exercise_sets.where(primary_muscle_group: muscle_group).each do |es|
      volume += es.volume
    end
    volume
  end

  def volume_for_muscle_category muscle_category
    volume = 0
    self.exercise_sets.where(muscle_category: muscle_category).each do |es|
      volume += es.volume
    end
    volume
  end

  def volume_for_exercise exercise
    volume = 0
    self.exercise_sets.where(name: exercise).each do |es|
      volume += es.volume
    end
    volume
  end

  def strength_of_muscle_group muscle_group
    strength = self.exercise_sets.where(primary_muscle_group: muscle_group).map(&:strength)
    if strength.length == 0
      0
    else
      strength.inject(&:+) / strength.length
    end
  end

  def strength_of_muscle_category muscle_category
    strength = self.exercise_sets.where(muscle_category: muscle_category).map(&:strength)
    if strength.length == 0
      0
    else
      strength.inject(&:+) / strength.length
    end
  end

  def strength_of_exercise exercise
    strength = self.exercise_sets.where(name: exercise).map(&:strength)
    if strength.length == 0
      0
    else
      strength.inject(&:+) / strength.length
    end
  end

end
