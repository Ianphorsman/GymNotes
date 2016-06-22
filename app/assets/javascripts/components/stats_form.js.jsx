var StatsForm = React.createClass({

    decide: function() {
        return null;
    },

    getRoute: function() {
        var volumeStrength = $('#volume_strength').val();
        var contextValue = $("#" + this.props.context).val();
        return "/stats/show_" + volumeStrength + "_timeline_by_" + this.props.context + "/" + contextValue;
    },

    changeFormContext: function(newContext) {
        this.props.changeStatsFormContext(newContext.target.value);
    },

    workouts: function() {
        return(
            <div className="row">
                <label className="form-group col-xs-6"><span className="form-control">How many days back to analyze?</span></label>
                <div className="form-group col-xs-2">
                    <input className="form-control" id="workouts" type="text" name="workouts" placeholder="7" defaultValue="7" />
                </div>
                <div className="form-group col-xs-2">
                    <select id="volume_strength" className="form-control">
                        <option value="volume">Volume</option>
                        <option value="strength">Strength</option>
                    </select>
                </div>
                <div className="form-group col-xs-2">
                    <button className="form-control" type="button" onClick={this.props.requestStats.bind(this, this.getRoute.bind(this))}>Analyze</button>
                </div>
            </div>
        );
    },

    muscle_group: function() {
        return(
            <div className="row">
                <div className="form-group col-xs-8">
                    <select className="form-control" id="muscle_group" name="muscle_group">
                        <option value>Select a Muscle Group...</option>
                        <option value="Abdominals">Abs</option>
                        <option value="Abductors">Abductors</option>
                        <option value="Adductors">Adductors</option>
                        <option value="Biceps">Biceps</option>
                        <option value="Calves">Calves</option>
                        <option value="Chest">Chest</option>
                        <option value="Forearms">Forearms</option>
                        <option value="Glutes">Glutes</option>
                        <option value="Hamstrings">Hamstrings</option>
                        <option value="Lats">Lats</option>
                        <option value="Lower-Back">Lower Back</option>
                        <option value="Middle-Back">Middle Back</option>
                        <option value="Neck">Neck</option>
                        <option value="Quads">Quads</option>
                        <option value="Shoulders">Shoulders</option>
                        <option value="Traps">Traps</option>
                        <option value="Triceps">Triceps</option>
                    </select>
                </div>
                <div className="form-group col-xs-2">
                    <select className="form-control" id="volume_strength" name="volume_strength">
                        <option value="volume">Volume</option>
                        <option value="strength">Strength</option>
                    </select>
                </div>
                <div className="form-group col-xs-2">
                    <button className="form-control" type="button" onClick={this.props.requestStats.bind(this, this.getRoute.bind(this))}>Analyze</button>
                </div>
            </div>
        );
    },
    
    muscle_category: function() {
        return(
            <div className="row">
                <div className="form-group col-xs-8">
                    <select className="form-control" id="muscle_category" name="muscle_category">
                        <option value>Select a Muscle Category...</option>
                        <option value="Abs">Abs</option>
                        <option value="Arms">Arms</option>
                        <option value="Back">Back</option>
                        <option value="Chest">Chest</option>
                        <option value="Glutes">Glutes</option>
                        <option value="Legs">Legs</option>
                        <option value="Shoulders">Shoulders</option>
                    </select>
                </div>
                <div className="form-group col-xs-2">
                    <select className="form-control" name="volume_strength" id="volume_strength">
                        <option value="volume">Volume</option>
                        <option value="strength">Strength</option>
                    </select>
                </div>
                <div className="form-group col-xs-2">
                    <button className="form-control" type="button" onClick={this.props.requestStats.bind(this, this.getRoute.bind(this))}>Analyze</button>
                </div>
            </div>
        );
    },

    exercise: function() {
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
        return(
            <div className="row">
                <div className="form-group col-xs-8">
                    <select className="form-control" id="exercise" name="exercise" className="form-control">
                        <option value>Select an Exercise...</option>
                        {Object.keys(this.props.exercises).map(listMuscleGroups)}
                    </select>
                </div>
                <div className="form-group col-xs-2">
                    <select className="form-control" name="volume_strength" id="volume_strength">
                        <option value="volume">Volume</option>
                        <option value="strength">Strength</option>
                    </select>
                </div>
                <div className="form-group col-xs-2">
                    <button className="form-control" type="button" onClick={this.props.requestStats.bind(this, this.getRoute.bind(this))}>Analyze</button>
                </div>
            </div>
        );
    },



  render: function() {
    return(
        <form id="get_stats">
            <div className="row">
                <div className="form-group col-xs-12">
                    <select className="form-control" id="stats_category" name="stats_category" defaultValue={this.props.context} onChange={this.changeFormContext.bind(this)}>
                        <option value="decide">Analyze by...</option>
                        <option value="workouts">Workouts</option>
                        <option value="muscle_group">Muscle Group</option>
                        <option value="muscle_category">Muscle Category</option>
                        <option value="exercise">Exercise</option>
                    </select>
                </div>
            </div>
            {this[this.props.context]()}
        </form>
      );
  }
});
