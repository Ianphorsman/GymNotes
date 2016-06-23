var ExerciseSelection = React.createClass({

    listExercises: function(exercise) {
        return <li className="list-group-item" onClick={this.props.selectExercise.bind(this, exercise)}>{exercise}</li>
    },

  render: function() {
    return(
        <div>
            <div className="row">
                <div className="form-group col-xs-8">
                    <input id="exercise-name-selection" className="form-control" placeholder="Look up an exercise..." />
                </div>
                <div className="form-group col-xs-4">
                    <button type="button" className="form-control" onClick={this.props.narrowSelection.bind(this, 'exercise-name-selection')}>Search</button>
                </div>
            </div>
            <ul className="list-group">
                {this.props.exercises.map(this.listExercises)}
            </ul>
        </div>
    );
  }
});
