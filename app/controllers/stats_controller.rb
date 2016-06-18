class StatsController < ApplicationController

  respond_to :json

  before_filter :authenticate_user!

  def show_all
    user = User.find_by_id(current_user.id)
    respond_to do |format|
      format.json { render :json => { :head => "Success", :volume => user.total_volume }}
    end
  end

  def breakdown
    user = User.find_by_id(current_user.id)
    stats = user.volume_breakdown(params[:days_ago])
    respond_to do |format|
      format.json { render :json => { :head => "Success" }}
    end
  end

  def show_volume_timeline_by_workouts
    user = User.find_by_id(current_user.id)
    stats = user.volume_timeline_by_workouts(params[:days_ago].to_i)
    attributes = { :title => "Volume timeline by workout spanning back #{params[:days_ago]} days", :theme_color => "#e1d7d2", :yaxis_label => "Volume"}
    respond_to do |format|
      format.json { render :json => { :head => "Success", :stats => stats, :attributes => attributes }}
    end
  end

  def show_strength_timeline_by_workouts
    user = User.find_by_id(current_user.id)
    stats = user.strength_timeline_by_workouts(params[:days_ago].to_i)
    attributes = { :title => "Strength timeline by workout spanning back #{params[:days_ago]} days", :theme_color => "#e1d7d2", :yaxis_label => "Strength"}
    respond_to do |format|
      format.json { render :json => { :head => "Success", :stats => stats, :attributes => attributes }}
    end
  end

  def show_volume_timeline_by_muscle_group
    user = User.find_by_id(current_user.id)
    stats = user.volume_timeline_for_muscle_group(params[:muscle_group])
    attributes = { :title => "Volume timeline for #{params[:muscle_group]}", :theme_color => Exercise.where(primary_muscle_group: params[:muscle_group]).first.color, :yaxis_label => "Volume"}
    respond_to do |format|
      format.json { render :json => { :head => "Success", :stats => stats, :attributes => attributes }}
    end
  end

  def show_volume_timeline_by_muscle_category
    user = User.find_by_id(current_user.id)
    stats = user.volume_timeline_for_muscle_category(params[:muscle_category])
    attributes = { :title => "Volume timeline for #{params[:muscle_category]}", :theme_color => Exercise.where(muscle_category: params[:muscle_category]).first.color, :yaxis_label => "Volume"}
    respond_to do |format|
      format.json { render :json => { :head => "Success", :stats => stats, :attributes => attributes }}
    end
  end

  def show_volume_timeline_by_exercise
    user = User.find_by_id(current_user.id)
    stats = user.volume_timeline_for_exercise(params[:exercise])
    attributes = { :title => "Volume timeline for #{params[:exercise]}", :theme_color => Exercise.find_by_name(params[:exercise]).color, :yaxis_label => "Volume"}
    respond_to do |format|
      format.json { render :json => { :head => "Success", :stats => stats, :attributes => attributes }}
    end
  end

  def show_strength_timeline_by_muscle_group
    user = User.find_by_id(current_user.id)
    stats = user.strength_timeline_for_muscle_group(params[:muscle_group])
    attributes = { :title => "Strength timeline for #{params[:muscle_group]}", :theme_color => Exercise.where(primary_muscle_group: params[:muscle_group]).first.color, :yaxis_label => "Strength"}
    respond_to do |format|
      format.json { render :json => { :head => "Success", :stats => stats, :attributes => attributes }}
    end
  end

  def show_strength_timeline_by_muscle_category
    user = User.find_by_id(current_user.id)
    stats = user.strength_timeline_for_muscle_category(params[:muscle_category])
    attributes = { :title => "Strength timeline for #{params[:muscle_category]}", :theme_color => Exercise.where(muscle_category: params[:muscle_category]).first.color, :yaxis_label => "Strength"}
    respond_to do |format|
      format.json { render :json => { :head => "Success", :stats => stats, :attributes => attributes }}
    end
  end

  def show_strength_timeline_by_exercise
    user = User.find_by_id(current_user.id)
    stats = user.strength_timeline_for_exercise(params[:exercise])
    attributes = { :title => "Strength timeline for #{params[:exercise]}", :theme_color => Exercise.find_by_name(params[:exercise]).color, :yaxis_label => "Strength"}
    respond_to do |format|
      format.json { render :json => { :head => "Success", :stats => stats, :attributes => attributes }}
    end
  end
end
