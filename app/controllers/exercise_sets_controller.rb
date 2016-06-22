class ExerciseSetsController < ApplicationController

  respond_to :json

  before_filter :authenticate_user!

  def new

  end

  def edit

  end

  def create
    user = User.find_by_id(current_user.id)
    exercise = Exercise.find_by_name(params[:name])
    workout = user.workouts.find_by_day(Date.today)
    exercise_set = workout.exercise_sets.new({
        :reps => params[:reps].to_f.round.to_i,
        :weight => params[:weight].to_f.round.to_i,
        :duration => params[:duration].to_f.round.to_i,
        :name => params[:name],
        :user_id => user.id,
        :exercise_id => exercise.id,
        :primary_muscle_group => exercise.primary_muscle_group,
        :muscle_category => exercise.muscle_category,
        :secondary_muscles => exercise.secondary_muscles,
        :day => Date.today
                                                                                                       })
    if exercise_set.save
      respond_to do |format|
        format.json { render :json => { :head => "Success", :exercise_set => exercise_set, :stats_for_workout => user.compare_with_previous_workout(workout) } }
      end
    else
      respond_to do |format|
        format.json { render :json => { :head => "Error", :message => "Failed to create exercise set." } }
      end
    end
  end

  def update

  end


  def destroy
    user = User.find_by_id(current_user.id)
    exercise_set = user.exercise_sets.find_by_id(params[:id])
    workout = user.workouts.find_by_day(Date.today)
    exercise = Exercise.find_by_id(exercise_set.exercise_id)
      unless exercise_set.nil?
        if exercise_set.day == Date.today
          exercise_set.destroy
          respond_to do |format|
            format.json { render :json => { :head => "Success", :exercise_set => exercise_set, :exercise => exercise, :stats_for_workout => user.compare_with_previous_workout(workout) }}
          end
        else
          respond_to do |format|
            format.json { render :json => { :head => "Error", :message => "You can only make changes during the workout."}}
          end
        end
      else
        respond_to do |format|
          format.json { render :json => { :head => "Error", :message => "You are not allowed to destroy a set that does not belong to you. Please make sure you are signed in."}}
        end
    end
  end

end
