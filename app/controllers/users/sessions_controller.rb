class Users::SessionsController < Devise::SessionsController
  respond_to :json
# before_filter :configure_sign_in_params, only: [:create]
  # GET /resource/sign_in
  skip_before_filter :verify_authenticity_token, :only => [:destroy, :create]

  def new
    self.resource = resource_class.new(sign_in_params)
    clean_up_passwords(resource)
    yield resource if block_given?
    respond_to do |format|
      format.json do
        login_form = render_to_string(partial: 'new.html.erb')
        render :json => { title: "Log In", body: login_form }
      end
    end
  end

  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate!(auth_options)
    sign_in(resource_name, resource)
    if signed_in?
      user = User.find_by_id(current_user.id)
      respond_to do |format|
        format.json { render :json => { :head => "Success", :user => user_data_for(user) } }
      end
    else
      respond_to do |format|
        format.json { render :json => { :head => "Failed", :errors => resource.errors.messages } }
      end
    end
  end

  # DELETE /resource/sign_out
  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    if signed_out
      flash[:notice] = "You've successfully signed out!"
    end
    respond_to do |format|
      format.json { render :json => { :head => "Success" } }
    end
  end
  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.for(:sign_in) << :attribute
  # end

  private

  def user_data_for user_id
    user = User.find_by_id(user_id)
    {
        :email => user.email,
        :stats_by_muscle_category => user.stats_by_muscle_category
    }
  end

end
