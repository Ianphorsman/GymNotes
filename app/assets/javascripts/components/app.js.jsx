var App = React.createClass({

    requestJSONForModal: function(path) {
        var handler = function() {
            this.renderToModal();
            this.openModal();
            if (this.state.requestJSONData['event']) {
                alert(this.state.requestJSONData['event']);
            }
        };
        $.getJSON(
            path,
            (data) => this.setState({ requestJSONData: data })
        ).success(handler.bind(this));
    },

    requestJSONForWorkout: function(path) {
        var handler = function() {
            this.renderWorkout();
            this.closeModal();
        };
        $.getJSON(
            path,
            (data) => this.setState({ requestJSONData: data })
        ).success(handler.bind(this));
    },

    setModalComponent: function(component) {
        this.setState({ modalComponent: component });
        this.setState({
            modalData : {
                title : this.setModalTitle(component)
            }
        });
        this.openModal();
    },

    showDashboard: function() {
        this.setState({
            showDashboard: true,
            showStats: false,
            showWorkout: false
        })
    },

    setModalTitle: function(component) {
        if (component == "getRegistrationForm") {
            return "Sign Up";
        } else if (component == "getLoginForm") {
            return "Sign In";
        } else if (component == "getDatePicker") {
            return "Pick a Date";
        } else if (component == "getStatsForm") {
            return "Statistics";
        } else if (component == "getExerciseSelection") {
            return "Select an exercise...";
        } else {
            return "Form";
        }
    },

    userAuth: function(path) {
        var handler = function(data) {
            this.setState({ userAuthenticated: true, user: data.user });
            this.closeModal();
        };

        var errorHandler = function(data) {
            this.setState({ errors: "Invalid email or password." })
        };

        var params = {
          "uft8" : "checked",
            "user" : {
                "email" : $('#user_email').val(),
                "password" : $('#user_password').val(),
                "password_confirmation" : $('#user_password_confirmation').val()
            }
        };

        $.ajax({
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            accepts: "application/json",
            url: path,
            data: JSON.stringify(params),
            success: handler.bind(this),
            error: errorHandler.bind(this)
        });
    },

    endSession: function() {
        var handler = function() {
            this.setState({ userAuthenticated: false, user: {}, showDashboard: false, showWorkout: false, showStats: false });
            $('.plot canvas').remove();
        };

        $.ajax({
            method: "DELETE",
            headers: {

            },
            dataType: "json",
            contentType: "application/json",
            accepts: "application/json",
            url: '/users/sign_out',
            success: handler.bind(this)
        })
    },

    requestStats: function(path) {
        var handler = function(data) {
            this.setState({ stats: data, showDashboard: false, showWorkout: false, showStats: true });
            this.closeModal();
        };
        $.ajax({
            method: "GET",
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "json",
            contentType: "application/json",
            accepts: "application/json",
            url: path(),
            success: handler.bind(this)
        })
    },

    addExerciseSet: function() {
        var handler = function(data) {
            var exerciseSet = data['exercise_set'];
            var copy = Object.assign({}, this.state.workoutData);
            if (exerciseSet['name'] in copy.exercise_sets) {
                copy.exercise_sets[exerciseSet['name']].push(exerciseSet);
            } else {
                copy.exercise_sets[exerciseSet['name']] = [exerciseSet];
            }
            copy['stats_for_workout'] = data['stats_for_workout'];
            console.log(data['stats_for_workout']);
            this.setState({
                workoutData: copy
            })
        };
        var params = {
            "utf8": "checked",
            "name": $('#exercise_name').text(),
            "reps": $('#reps').val(),
            "weight": $('#weight').val(),
            "duration": $('#duration').text(),
            "day": this.props.date
        };

        $.ajax({
            method: "POST",
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "json",
            data: JSON.stringify(params),
            contentType: "application/json",
            accepts: "application/json",
            url: '/exercise_sets/create',
            success: handler.bind(this)
        })

    },

    deleteSet: function(path) {
        var handler = function(data) {
            var exerciseSet = data['exercise_set'];
            var exercise = data['exercise'];
            var copy = Object.assign({}, this.state.workoutData);
            copy.exercise_sets[exercise['name']] = copy.exercise_sets[exercise['name']].filter(record => {
                return record.id !== exerciseSet['id'];
            });
            if (copy.exercise_sets[exercise['name']].length == 0) {
                delete copy.exercise_sets[exercise['name']];
            }
            copy['stats_for_workout'] = data['stats_for_workout'];

            this.setState({
                workoutData: copy
            });
        };

        $.ajax({
            method: "DELETE",
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "json",
            contentType: "application/json",
            accepts: "application/json",
            url: path,
            success: handler.bind(this)
        })
    },

    renderWorkout: function() {
        this.setState({ workoutData: this.state.requestJSONData, showDashboard: false, showStats: false, showWorkout: true })
    },

    fillable: function() {
        return 'head' in this.state.workoutData;
    },

    presentable: function() {
        return (this.fillable() && this.state.workoutData['head'] == "Success");
    },

    editable: function() {
        return (this.presentable() && (this.props.date == this.state.workoutData['workout']['day']));
    },

    selectExercise: function(exercise) {
        this.closeModal();
        $('#exercise_name').text(exercise);
    },

    renderToModal: function() {
        this.setState({ modalData: this.state.requestJSONData })
    },

    closeModal: function() {
        this.setState({ showModal: false })
    },

    openModal: function() {
        this.setState({ showModal: true })
    },

    prevMonth: function() {
        this.setState({
            datePickerContext: this.state.datePickerContext + 1
        }, function() {
            this.fetchDates();
        });
    },

    nextMonth: function() {
        this.setState({
            datePickerContext: this.state.datePickerContext - 1
        }, function() {
            this.fetchDates();
        });
    },

    fetchDates: function() {
        $.getJSON(
            '/home/date_picker/' + this.state.datePickerContext,
            (data) => this.setState({
                datePickerData: {
                    dates: data['dates'],
                    prevMonth: data['prevMonth'],
                    month: data['month'],
                    nextMonth: data['nextMonth']
                }
            })
        );
    },

    changeStatsFormContext: function(context) {
        this.setState({
            statsFormContext: context
        })
    },

    getTitle: function() {
        if (this.props.user == null) {
            return "You";
        } else {
            return this.props.user.email;
        }
    },

    getInitialState: function() {
        return {
            userAuthenticated: false,
            requestJSONData: {},
            showModal: false,
            modalData: {},
            workoutData: {},
            stats: null,
            statsFormContext: "decide",
            statsContext: "doNothing",
            datePickerContext: 0,
            datePickerData: this.props.datePickerData,
            modalComponent: "closed",
            showDashboard: false,
            showWorkout: false,
            showStats: false,
            user: {},
            errors: ""
        }
    },

    componentWillMount: function() {
        this.setState({
            userAuthenticated: this.props.userSession,
            month: this.props.month,
            mobileView: this.props.forMobile,
            user: this.props.user
        });
    },

  render: function() {
    return(
        <div>
            <header>
                <MainMenu
                    requestJSONForModal={this.requestJSONForModal}
                    requestJSONForWorkout={this.requestJSONForWorkout}
                    endSession={this.endSession}
                    userAuth={this.userAuth}
                    user={this.state.user}
                    userAuthenticated={this.state.userAuthenticated}
                    showDashboard={this.showDashboard}
                    setModalComponent={this.setModalComponent}>

                </MainMenu>
            </header>
            <main>
                <ModalContainer
                    context={this.state.modalComponent}
                    statsFormContext={this.state.statsFormContext}
                    changeStatsFormContext={this.changeStatsFormContext}
                    exercises={this.props.exercises}
                    datePickerContext={this.state.datePickerContext}
                    prevMonth={this.prevMonth}
                    nextMonth={this.nextMonth}
                    fetchDates={this.fetchDates}
                    datePickerData={this.state.datePickerData}
                    ref="main-modal"
                    month={this.state.month}
                    requestStats={this.requestStats}
                    requestJSONForWorkout={this.requestJSONForWorkout}
                    userAuth={this.userAuth}
                    modalData={this.state.modalData}
                    showModal={this.state.showModal}
                    errors={this.state.errors}
                    selectExercise={this.selectExercise}
                    handleClose={this.closeModal}>

                </ModalContainer>
                <Dashboard
                    forMobile={this.props.forMobile}
                    user={this.state.user}
                    show={this.state.showDashboard}
                    userAuthenticated={this.state.userAuthenticated}>
                </Dashboard>
                <WorkoutContainer
                    exercises={this.props.exercises}
                    addExerciseSet={this.addExerciseSet}
                    show={this.state.showWorkout}
                    forMobile={this.props.forMobile}
                    deleteSet={this.deleteSet}
                    date={this.props.date}
                    fillable={this.fillable}
                    presentable={this.presentable}
                    editable={this.editable}
                    setModalComponent={this.setModalComponent}
                    workoutData={this.state.workoutData}>
                </WorkoutContainer>
                <StatsContainer
                    stats={this.state.stats}
                    show={this.state.showStats}
                    formContext={this.state.statsFormContext}
                    context={this.state.statsContext}>
                </StatsContainer>
            </main>
        </div>
    );
  }
});
