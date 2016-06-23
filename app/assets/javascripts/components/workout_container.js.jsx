var WorkoutContainer = React.createClass({
    
    progressBar: function() {
        if ('stats_for_workout' in this.props.workoutData) {
            var relativeProgress = "" + this.props.workoutData['stats_for_workout']['relative_focus_progress'] + " %";
            var barWidth = "" + Math.round(this.props.workoutData['stats_for_workout']['relative_focus_progress'] / 1.4) + "%";
            var barWidthProp = {width: barWidth};
            var maxWidth = Math.round(this.props.workoutData['stats_for_workout']['previous_focus_volume'] * 1.4);
            var work = this.props.workoutData['stats_for_workout']['focus_volume'];
            if (this.props.forMobile) {
                return(
                    <div className="progress col-xs-12">
                        <h5 data-workout-focus>{this.props.workoutData['stats_for_workout']['focus']} Workout</h5>
                        <div className="progress-bar" data-workout-progress
                             data-muscle-group={this.props.workoutData['stats_for_workout']['focus']} role="progressbar"
                             aria-valuenow={work} aria-valuemin="0" aria-valuemax={maxWidth} style={barWidthProp}></div>
                        <div className="divider"></div>
                        <span className="date">{this.props.workoutData['date']}</span>
                        <span className="badge" data-percent-progress>{relativeProgress}</span>
                    </div>
                );
            } else {
                return (
                    <div className="progress col-xs-8 col-xs-offset-2">
                        <h5 data-workout-focus>{this.props.workoutData['stats_for_workout']['focus']} Workout</h5>
                        <div className="progress-bar" data-workout-progress
                             data-muscle-group={this.props.workoutData['stats_for_workout']['focus']} role="progressbar"
                             aria-valuenow={work} aria-valuemin="0" aria-valuemax={maxWidth} style={barWidthProp}></div>
                        <div className="divider"></div>
                        <span className="date">{this.props.workoutData['date']}</span>
                        <span className="badge" data-percent-progress>{relativeProgress}</span>
                    </div>
                );
            }
        } else {
            return null;
        }
    },

    breakdown: function() {
        $('.plot canvas').remove();
        $('.plot').append("<canvas id='plot-container' width='' height=''></canvas>");
        var plotLocation = $('#plot-container').get(0).getContext('2d');
        var labels = (dataPoint) => { return dataPoint[Object.keys(dataPoint)[0]] };
        var yValues = (dataPoint) => { return dataPoint[Object.keys(dataPoint)[1]] };
        var colors = (dataPoint) => { return dataPoint[Object.keys(dataPoint)[2]] };
        var data = {
            labels: this.props.workoutData.breakdown.map(labels),
            datasets: [{
                data: this.props.workoutData.breakdown.map(yValues),
                backgroundColor: this.props.workoutData.breakdown.map(colors),
                borderColor: "rgb(26, 26, 26)"
            }]
        };

        var options = {
            segmentShowStroke: false,
            animateScale: true
        };

        var pieChart = new Chart(plotLocation, {
            type: 'doughnut',
            data: data,
            options: options
        });
    },

    newSet: function() {
        return <ExerciseList forMobile={this.props.forMobile} editable={this.props.editable} exercises={this.props.exercises} setModalComponent={this.props.setModalComponent} addExerciseSet={this.props.addExerciseSet}></ExerciseList>
    },

  render: function() {
      if (this.props.presentable() && this.props.show) {
          var exerciseSet = (exSet) => {
              return(
                  <ExerciseSet forMobile={this.props.forMobile} editable={this.props.editable} selectExercise={this.props.selectExercise} es={exSet} deleteSet={this.props.deleteSet}>

                  </ExerciseSet>
              );
          };
          var panel = (exercise) => {
              var link = exercise.split(' ').join('-');
              var heading = "heading" + link;
              var collapse = "collapse" + link;
              var muscleGroup = this.props.workoutData['exercise_sets'][exercise][0]['muscle_category'];
              if (this.props.forMobile) {
                  return(
                      <div className="panel panel-default col-xs-12" data-muscle-group={muscleGroup}>
                          <section className="panel-heading" role="tab" id={heading}>
                              <h4 className="panel-title">
                                  <a role="button" className="collapsed" data-toggle="collapse" data-parent="#accordion" data-muscle-group={muscleGroup} href={"#" + collapse} aria-expanded="false" aria-controls={collapse}>
                                      {exercise}
                                  </a>
                                  <span data-muscle-group={muscleGroup} className="badge set-count">{this.props.workoutData['exercise_sets'][exercise].length}</span>
                              </h4>
                          </section>
                          <div id={collapse} className="panel-collapse collapse" role="tabpanel" aria-labelledby={heading}>
                              <section className="panel-body">
                                  <ul className="list-group">
                                      {this.props.workoutData['exercise_sets'][exercise].map(exerciseSet)}
                                  </ul>
                              </section>
                          </div>
                      </div>
                  );
              } else {
                  return (
                      <div className="panel panel-default col-xs-offset-2 col-xs-8" data-muscle-group={muscleGroup}>
                          <section className="panel-heading" role="tab" id={heading}>
                              <h4 className="panel-title">
                                  <a role="button" className="collapsed" data-toggle="collapse" data-parent="#accordion"
                                     data-muscle-group={muscleGroup} href={"#" + collapse} aria-expanded="false"
                                     aria-controls={collapse}>
                                      {exercise}
                                  </a>
                                  <span data-muscle-group={muscleGroup}
                                        className="badge set-count">{this.props.workoutData['exercise_sets'][exercise].length}</span>
                              </h4>
                          </section>
                          <div id={collapse} className="panel-collapse collapse" role="tabpanel"
                               aria-labelledby={heading}>
                              <section className="panel-body">
                                  <ul className="list-group">
                                      {this.props.workoutData['exercise_sets'][exercise].map(exerciseSet)}
                                  </ul>
                              </section>
                          </div>
                      </div>
                  );
              }
          };

          return (
              <div className="workout-container">
                  <section className="workout-component row">{this.progressBar()}</section>
                  <section className="workout-component row">{this.newSet()}</section>
                  <section id="accordion" className="workout-component panel-group row" role="tablist" aria-multiselectable="true">
                      {Object.keys(this.props.workoutData['exercise_sets']).map(panel)}
                  </section>
                  <section className="workout-component row">
                      {this.breakdown()}
                  </section>
              </div>
          );
      } else {
          return <div />;
      }
  }
});
