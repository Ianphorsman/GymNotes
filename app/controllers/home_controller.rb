class HomeController < ApplicationController

  before_filter :authenticate_user!, :except => [:index, :date_picker, :helloworld]

  def index
    @exercises = Exercise.list
    @workout = {
        :head => "Success",
        :workout => {},
        :exercise_sets => []
    }
    if signed_in?
      user = User.find_by_id(current_user.id)
      @dates = { :dates => user.activity_this_month(0), :prevMonth => Date.today.months_ago(1).strftime("%B"), :month => Date.today.strftime("%B"), :nextMonth => Date.today.months_ago(-1).strftime("%B") }
      @workout[:workout] = user.workouts.find_by_day(Date.today) || nil
      if @workout[:workout].nil?
        @workout[:workout]= user.workouts.create({ :day => Date.today })
      else
        @workout[:exercise_sets] = @workout[:workout].exercise_sets
      end
      @user_data = user_data_for(current_user.id)
    else
      @workout[:head] = "Error"
      @dates = { :dates => User.activity_this_month(0), :prevMonth => Date.today.months_ago(1).strftime("%B"), :month => Date.today.strftime("%B"), :nextMonth => Date.today.months_ago(-1).strftime("%B") }
    end
  end

  def date_picker
    days = User.find_by_email("ianphorsman@gmail.com").activity_this_month params[:date]
    date = Date.today.months_ago(params[:date].to_i)
    respond_to do |format|
      format.json do
        render :json => {
            :dates => days,
            :prevMonth => date.prev_month.strftime("%B"),
            :month => date.strftime("%B"),
            :nextMonth => date.next_month.strftime("%B")
        }
      end
    end
  end

  private

  def user_data_for user_id
    user = User.find_by_id(user_id)
    {
        :email => user.email,
        :stats_by_muscle_category => user.stats_by_muscle_category
    }
  end

end
