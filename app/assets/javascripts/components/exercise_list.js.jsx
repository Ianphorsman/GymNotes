var ExerciseList = React.createClass({

  render: function() {

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
                      <div className="form-group col-xs-6">
                          <input className="form-control" id="reps" type="text" name="reps" placeholder="Reps"/>
                      </div>
                      <div className="form-group col-xs-6">
                          <input className="form-control" id="weight" type="text" name="weight" placeholder="Weight"/>
                      </div>
                      <div className="form-group col-xs-8">
                          <TimerContainer></TimerContainer>
                      </div>
                      <div className="form-group col-xs-4">
                          <button className="form-control" type="button" onClick={this.props.addExerciseSet.bind(this)}><i className="fa fa-plus"></i></button>
                      </div>
                  </form>
              );
          } else {
              return (
                  <form className="form-horizontal new_exercise_set" id="new_exercise_set"
                        action="/exercise_sets/create" method="POST">
                      <div className="col-xs-1 col-xs-offset-1"></div>
                      <div className="form-group col-xs-4">
                          <button id="exercise_name" type="button" className="form-control" onClick={this.props.setModalComponent.bind(this, 'getExerciseSelection')}>Select an exercise...</button>
                      </div>
                      <div className="form-group col-xs-1">
                          <input className="form-control" id="reps" type="text" name="reps" placeholder="Reps"/>
                      </div>
                      <div className="form-group col-xs-1">
                          <input className="form-control" id="weight" type="text" name="weight" placeholder="Weight"/>
                      </div>
                      <div className="form-group col-xs-1">
                          <TimerContainer></TimerContainer>
                      </div>
                      <div className="form-group col-xs-1">
                          <button className="form-control" type="button" onClick={this.props.addExerciseSet.bind(this)}>
                              <i className="fa fa-plus"></i>
                          </button>
                      </div>
                  </form>
              );
          }
      } else {
          return null;
      }
  }
});
