class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
# before_filter :configure_sign_up_params, only: [:create]
# before_filter :configure_account_update_params, only: [:update]

  skip_before_filter :verify_authenticity_token, :only => [:create]
  prepend_before_filter :require_no_authentication, :only => [:cancel]

  def new
    build_resource({})
    yield resource if block_given?
    render :json => {:success => true }
  end

  # POST /resource
  def create
    build_resource(sign_up_params)
    resource.save
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        sign_up(resource_name, resource)
        respond_to do |format|
          format.json { render :json => { :head => "success", :user => user_data_for(resource) } }
        end
      else
        expire_data_after_sign_in!
        respond_to do |format|
          format.json { render :json => { :head => "Successish" } }
        end
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_to do |format|
        format.json { render :json => { :head => "Failed", :errors => resource.errors.messages } }
      end
    end

  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.for(:sign_up) << :attribute
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.for(:account_update) << :attribute
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
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
