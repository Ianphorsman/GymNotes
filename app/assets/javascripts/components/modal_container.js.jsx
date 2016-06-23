var ModalContainer = React.createClass({

    getInitialState: function() {
        return {
            show: this.props.showModal
        }

    },

    closed: function() {
        return <div />
    },

    getLoginForm: function() {
        return <LoginForm userAuth={this.props.userAuth}></LoginForm>
    },

    getRegistrationForm: function() {
        return <RegistrationForm userAuth={this.props.userAuth}></RegistrationForm>
    },

    getDatePicker: function() {
        return(
            <DatePicker
                context={this.props.datePickerContext}
                prevMonth={this.props.prevMonth}
                nextMonth={this.props.nextMonth}
                fetchDates={this.props.fetchDates}
                datePickerData={this.props.datePickerData}
                month={this.props.month}
                requestJSONForWorkout={this.props.requestJSONForWorkout}>

            </DatePicker>
        );
    },

    getExerciseSelection: function() {
        return <ExerciseSelection exercises={this.state.exerciseList} selectExercise={this.props.selectExercise} narrowSelection={this.narrowSelection}></ExerciseSelection>
    },

    getStatsForm: function() {
        return <StatsForm context={this.props.statsFormContext} changeStatsFormContext={this.props.changeStatsFormContext} exercises={this.props.exercises} requestStats={this.props.requestStats}></StatsForm>
    },

    narrowSelection: function(target) {
        var exercise = $('#' + target).val();
        this.setState({ pattern: new RegExp(exercise, 'i') }, function() {
            this.setState({ exerciseList: this.props.exercises.filter(this.matchWith) });
        });
    },

    matchWith: function(exercise) {
        if (exercise.match(this.state.pattern) == null) {
            return false;
        } else {
            return true;
        }
    },

    getInitialState: function() {
        return {
            pattern: ""
        }
    },

    componentWillMount: function() {
        this.setState({
            show: this.props.showModal,
            exerciseList: this.props.exercises
        });
    },

    close: function() {
        this.setState({ show: false })
    },

  render: function() {
      var Modal = ReactBootstrap.Modal;
    return(
        <Modal show={this.props.showModal} onHide={this.props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {this.props.modalData.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    {this[this.props.context]()}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <p>{this.props.errors}</p>
            </Modal.Footer>
        </Modal>
    );
  }
});
