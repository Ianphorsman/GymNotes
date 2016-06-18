var ExerciseList = React.createClass({

  render: function() {
      var listExercises = (exercise) => {
          return <option value={exercise}>{exercise}</option>
      };

      var listMuscleGroups = (muscleGroup) => {
          return (
              <optgroup label={muscleGroup}>
                  {this.props.exercises[muscleGroup].map(listExercises)}
              </optgroup>
          );
      };

      if (this.props.editable()) {
          if (this.props.forMobile) {
              return(
                  <form className="form-horizontal new_exercise_set" id="new_exercise_set"
                        action="/exercise_sets/create" method="POST">
                      <div className="form-group col-xs-12">
                          <select id="exercise_name" name="exercise_name" className="form-control">
                              <option value>Select An Exercise...</option>
                              {Object.keys(this.props.exercises).map(listMuscleGroups)}
                          </select>
                      </div>
                      <div className="form-group col-xs-5">
                          <input className="form-control" id="reps" type="text" name="reps" placeholder="reps"/>
                      </div>
                      <div className="form-group col-xs-5">
                          <input className="form-control" id="weight" type="text" name="weight" placeholder="weight"/>
                      </div>
                      <div className="form-group col-xs-2">
                          <button className="form-control" type="button" onClick={this.props.addExerciseSet.bind(this)}><i className="fa fa-plus"></i></button>
                      </div>
                  </form>
              );
          } else {
              return (
                  <form className="form-horizontal new_exercise_set" id="new_exercise_set"
                        action="/exercise_sets/create" method="POST">
                      <div className="form-group col-sm-2"></div>
                      <div className="form-group col-sm-5">
                          <select id="exercise_name" name="exercise_name" className="form-control">
                              <option value>Select An Exercise...</option>
                              {Object.keys(this.props.exercises).map(listMuscleGroups)}
                          </select>
                      </div>
                      <div className="form-group col-sm-1">
                          <input className="form-control" id="reps" type="text" name="reps" placeholder="reps"/>
                      </div>
                      <div className="form-group col-sm-1">
                          <input className="form-control" id="weight" type="text" name="weight" placeholder="weight"/>
                      </div>
                      <div className="form-group col-sm-1">
                          <button className="form-control" type="button" onClick={this.props.addExerciseSet.bind(this)}>
                              <i className="fa fa-plus"></i></button>
                      </div>
                  </form>
              );
          }
      } else {
          return null;
      }
  }
});
