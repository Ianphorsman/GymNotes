

user = User.find_by_email("ianphorsman@gmail.com")

w = user.workouts.find_by_day(Date.today)

