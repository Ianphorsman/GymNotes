Rails.application.routes.draw do
  devise_for :users, :controllers => {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  root 'home#index'

  get '/home/date_picker/:date' => 'home#date_picker', as: 'date_picker'
  get '/home/helloworld' => 'home#helloworld'
  get '/workouts/:day' => 'workouts#day'

  get '/dashboard' => 'home#dashboard'

  delete '/exercise_sets/:id' => 'exercise_sets#destroy'
  get '/exercise_sets/:id' => 'exercise_sets#show'
  post '/exercise_sets/create' => 'exercise_sets#create'

  get '/stats/show_all' => 'stats#show_all'
  get '/stats/show_volume_timeline_by_breakdown/:days_ago' => 'stats#breakdown'
  get '/stats/show_volume_timeline_by_workouts/:days_ago' => 'stats#show_volume_timeline_by_workouts'
  get '/stats/show_strength_timeline_by_workouts/:days_ago' => 'stats#show_strength_timeline_by_workouts'
  get '/stats/show_volume_timeline_by_muscle_group/:muscle_group' => 'stats#show_volume_timeline_by_muscle_group'
  get '/stats/show_volume_timeline_by_muscle_category/:muscle_category' => 'stats#show_volume_timeline_by_muscle_category'
  get '/stats/show_volume_timeline_by_exercise/:exercise' => 'stats#show_volume_timeline_by_exercise'

  get '/stats/show_strength_timeline_by_muscle_group/:muscle_group' => 'stats#show_strength_timeline_by_muscle_group'
  get '/stats/show_strength_timeline_by_muscle_category/:muscle_category' => 'stats#show_strength_timeline_by_muscle_category'
  get '/stats/show_strength_timeline_by_exercise/:exercise' => 'stats#show_strength_timeline_by_exercise'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
