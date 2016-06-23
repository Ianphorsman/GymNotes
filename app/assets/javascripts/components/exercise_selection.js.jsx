var ExerciseSelection = React.createClass({

    listExercises: function(exercise) {
        return <li className="list-group-item" onClick={this.props.selectExercise.bind(null, exercise)}>{exercise}</li>
    },

  render: function() {
    return(
        <div>
            <div className="row">
                <div className="form-group col-xs-12">
                    <input id="exercise-name-selection" className="form-control" placeholder="Look up an exercise..." onChange={this.props.narrowSelection} />
                </div>
            </div>
            <ul className="list-group">
                {this.props.exercises.map(this.listExercises)}
            </ul>
        </div>
    );
  }
});
