var ExerciseSet = React.createClass({

    actions: function() {
        if (this.props.editable()) {
            if (this.props.forMobile) {
                return (
                    <span data-set-mobile-action>
                        <button type="button"
                                onClick={this.props.deleteSet.bind(this, '/exercise_sets/' + this.props.es['id'])}><i
                            data-muscle-group={this.props.es['muscle_category']} className="fa fa-remove"></i></button>
                    </span>
                );
            } else {
                return (
                    <span data-set-action>
                        <button type="button"
                                onClick={this.props.deleteSet.bind(this, '/exercise_sets/' + this.props.es['id'])}><i
                            data-muscle-group={this.props.es['muscle_category']} className="fa fa-remove"></i></button>
                    </span>
                );
            }
        }
    },

    showDuration: function(duration) {
        if (duration == undefined) {
            return "--";
        } else {
            return duration;
        }
    },

  render: function() {
      if (this.props.forMobile) {
          return (
              <li className="list-group-item row" data-muscle-group={this.props.es['muscle_category']}>
                  <p className="col-xs-2 col-xs-offset-2 set">
                      <span data-reps>{this.props.es['reps']}</span>
                      <span className="grey"> reps</span>
                  </p>
                  <p className="col-xs-2 col-xs-offset-1 set">
                      <span data-weight>{this.props.es['weight']}</span>
                      <span className="grey"> lbs</span>
                  </p>
                  <p className="col-xs-2 col-xs-offset-1 set">
                      <span data-duration>{this.showDuration(this.props.es['duration'])}</span>
                      <span className="grey"> s.</span>
                  </p>
                  <p className="col-xs-2 set">
                      {this.actions()}
                  </p>
              </li>
          );
      } else {
          return (
              <li className="list-group-item row" data-muscle-group={this.props.es['muscle_category']}>
                  <p className="col-xs-1 col-xs-offset-6 set">
                      <span data-reps>{this.props.es['reps']}</span>
                      <span className="grey"> reps</span>
                  </p>
                  <p className="col-xs-1 col-xs-offset-1 set">
                      <span data-weight>{this.props.es['weight']}</span>
                      <span className="grey"> lbs</span>
                  </p>
                  <p className="col-xs-1 col-xs-offset-1 set">
                      <span data-duration>{this.showDuration(this.props.es['duration'])}</span>
                      <span className="grey"> s.</span>
                  </p>
                  <p className="col-xs-1 set">
                      {this.actions()}
                  </p>
              </li>
          );
      }
  }

});
