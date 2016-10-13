class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :workouts
  has_many :exercise_sets

  def activity_this_month month
    date = Date.today.months_ago(month.to_i).to_date
    start_date = date.at_beginning_of_month.beginning_of_week
    end_date = date.at_end_of_month.end_of_week
    dates = []
    until start_date > end_date do
      dates << {
          :date => start_date.to_s,
          :day => start_date.day,
          :focus => focus_of_day(start_date),
          :context => context_of_day(start_date)
      }
      start_date = start_date.tomorrow
    end
    dates.in_groups_of(7)
  end

  def context_of_day day
    if Date.today == day
      "today"
    elsif Date.today > day
      "past"
    elsif Date.today < day
      "future"
    end
  end

  def focus_of_day day
    w = self.workouts.find_by_day(day)
    if w
      w.focus[0]
    else
      ""
    end
  end

  def self.activity_this_month month
    date = Date.today.months_ago(month.to_i).to_date
    start_date = date.at_beginning_of_month.beginning_of_week
    end_date = date.at_end_of_month.end_of_week
    dates = []
    until start_date > end_date do
      dates << {
          :date => start_date.to_s,
          :day => start_date.day
      }
      start_date = start_date.tomorrow
    end
    dates.in_groups_of(7)
  end

  def compare_with_previous_workout workout
    previous_workout = self.previous_workout workout
    focus_volume = workout.focus
    prev_focus_volume = previous_workout.focus
    total_volume = workout.total_volume
    prev_total_volume = previous_workout.total_volume
    stats = {
        :focus => focus_volume[0],
        :focus_volume => focus_volume[1],
        :total_volume => total_volume,
        :previous_focus => prev_focus_volume[0],
        :previous_focus_volume => prev_focus_volume[1],
        :previous_total_volume => prev_total_volume,
        :relative_focus_progress => [((focus_volume[1] / (prev_focus_volume[1]+0.1)) * 100).to_i, 140].min,
        :relative_progress => [((total_volume / (prev_total_volume+0.1)) * 100).to_i, 140].min
    }
    stats
  end

  def previous_workout workout
    focus = workout.focus[0]
    workouts = self.workouts.select { |w| w.focus[0] == focus && w.day <= workout.day }
    if workouts.length > 1
      workouts[-2]
    else
      workout
    end
  end

  def total_workouts
    self.workouts.count
  end

  def total_workouts_by_muscle_category
    self.workouts.map(&:focus).group_by { |pair| pair[0] }.map { |arr| [arr[0], arr[1].count] }
  end

  def total_sets
    self.exercise_sets.count
  end

  def total_volume
    self.exercise_sets.map(&:volume).inject(&:+)
  end

  def total_reps
    self.exercise_sets.map(&:reps).inject(&:+)
  end

  def stats_by_muscle_category
    self.exercise_sets.group_by(&:muscle_category).map do |pair|
      {
          :muscle_category => pair[0],
          :total_sets => pair[1].count,
          :total_volume => pair[1].map(&:volume).inject(&:+),
          :total_reps => pair[1].map(&:reps).inject(&:+),
          :average_strength => (pair[1].map(&:volume).inject(&:+) / (pair[1].map(&:reps).inject(&:+)+0.1)).round,
          :color => Exercise.where(muscle_category: pair[0]).first.color
      }
    end
  end

  def average_work exercise
    exercise_sets = self.exercise_sets.select { |es| Exercise.find_by_id(es.exercise_id).name == exercise.name }
    exercise_sets.map { |es| es.volume }.inject(&:+) / exercise_sets.length
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
    muscle_categories.sort_by { |key, value| value}
  end

  def volume_breakdown days_ago
    muscle_categories = {}
    self.exercise_sets.where("day > ?", Date.today.days_ago(days_ago)).each do |es|
      category = es.muscle_category
      if muscle_categories[category]
        muscle_categories[category] += es.volume
      else
        muscle_categories[category] = es.volume
      end
    end
    muscle_categories.sort_by { |key, value| value}.map { |pair| pair << Exercise.where(muscle_category: pair[0]).first.color }
  end

  def strength_breakdown days_ago
    muscle_categories = {}
    self.exercise_sets.where("day > ?", Date.today.days_ago(days_ago)).each do |es|
      category = es.muscle_category
      if muscle_categories[category]
        muscle_categories[category] << es.strength
      else
        muscle_categories[category] = [es.strength]
      end
    end
    muscle_categories.each { |key, value| value = value.inject(&:+) / value.length }
    muscle_categories.sort_by { |key, value| value}.map { |pair| pair << Exercise.where(muscle_category: pair[0]).first.color }
  end

  def strength_timeline_for_muscle_group muscle_group
    self.workouts.map do |w|
      {
          :date => w.day,
          :strength => w.strength_of_muscle_group(muscle_group)
      }
    end.sort_by { |v| v[:date] }
  end

  def strength_timeline_for_muscle_category muscle_category
    self.workouts.map do |w|
      {
          :date => w.day,
          :strength => w.strength_of_muscle_category(muscle_category)
      }
    end
  end

  def strength_timeline_for_exercise exercise
    self.workouts.map do |w|
      {
          :date => w.day,
          :strength => w.strength_of_exercise(exercise)
      }
    end.sort_by { |v| v[:date] }
  end

  def strength_timeline_by_workouts days_ago
    self.workouts.where("day > ?", Date.today.days_ago(days_ago)).map do |w|
      {
          :date => w.day,
          :strength => w.average_strength
      }
    end.sort_by { |v| v[:date] }
  end

  def volume_timeline_by_workouts days_ago
    self.workouts.where("day > ?", Date.today.days_ago(days_ago)).map do |w|
      {
          :date => w.day,
          :volume => w.total_volume
      }
    end.sort_by { |v| v[:date] }
  end

  def volume_timeline_for_muscle_group muscle_group
    self.workouts.map do |w|
      {
          :date => w.day,
          :volume => w.volume_for_muscle_group(muscle_group)
      }
    end.sort_by { |v| v[:date] }
  end

  def volume_timeline_for_muscle_category muscle_category
    self.workouts.map do |w|
      {
          :date => w.day,
          :volume => w.volume_for_muscle_category(muscle_category)
      }
    end.sort_by { |v| v[:date] }
  end

  def volume_timeline_for_exercise exercise
    self.workouts.map do |w|
      {
          :date => w.day,
          :volume => w.volume_for_exercise(exercise)
      }
    end.sort_by { |v| v[:date] }
  end

end
