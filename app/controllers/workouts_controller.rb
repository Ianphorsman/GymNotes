class WorkoutsController < ApplicationController

  before_filter :authenticate_user!
  respond_to :json

  def day
    user = User.find_by_id(current_user.id)
    workout = user.workouts.find_by_day(params[:day])
    if workout.nil?
      p "workout is nil"
      workout = user.workouts.new({
          :day => params[:day]
                                                              })
      if workout.save
        render :json => { :head => "Success", :message => "Created a new workout for #{params[:day].to_date}", :date => params[:day].to_date.inspect, :workout => workout, :exercise_sets => [], :stats_for_workout => {}, :breakdown => workout.breakdown }
      else
        render :json => { :head => "Failed", :error => "Could not create the workout." }
      end
    else
      p "workout found"
      render :json => { :head => "Success", :message => "Obtained workout for #{params[:day].to_date}", :date => params[:day].to_date.inspect, :workout => workout, :exercise_sets => workout.sets_by_exercise, :stats_for_workout => user.compare_with_previous_workout(workout), :breakdown => workout.breakdown }
    end
  end

end
