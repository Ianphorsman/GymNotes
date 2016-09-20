var Dashboard = React.createClass({

    breakdown: function() {
        $('.plot canvas').remove();
        $('.plot').append("<canvas id='plot-container' width='' height=''></canvas>");
        var plotLocation = $('#plot-container').get(0).getContext('2d');
        var labels = (muscleCategory) => { return muscleCategory.muscle_category };
        var yValues = (muscleCategory) => { return muscleCategory.total_volume };
        var colors = (muscleCategory) => { return muscleCategory.color };
        var data = {
            labels: this.props.user.stats_by_muscle_category.map(labels),
            datasets: [{
                data: this.props.user.stats_by_muscle_category.map(yValues),
                backgroundColor: this.props.user.stats_by_muscle_category.map(colors),
                borderColor: "rgb(26, 26, 26)"
            }]
        };
        var options = {
            animation: false,
            legend: {
                display: false
            }
        };
        var pieChart = new Chart(plotLocation, {
            type: 'doughnut',
            data: data,
            options: options
        });
    },

    panel: function(muscleCategory) {
        return (
            <div data-muscle-group={muscleCategory.muscle_category} className="panel panel-default col-xs-12 col-sm-6 col-sm-offset-3">
                <section className="panel-heading" role="tab" id={"heading-" + muscleCategory.muscle_category}>
                    <h4 className="panel-title">
                        <a role="button" className="collapsed" data-toggle="collapse" data-parent="#dashboard-accordion" href={"#" + muscleCategory.muscle_category} aria-expanded="false" aria-controls={muscleCategory.muscle_category}>
                            {muscleCategory.muscle_category}
                        </a>
                    </h4>
                </section>
                <div id={muscleCategory.muscle_category} className="panel-collapse collapse" role="tabpanel" aria-labelledby={"heading-" + muscleCategory.muscle_category}>
                    <section className="panel-body">
                        <ul className="list-group">
                            <li className="list-group-item">
                                Total Sets
                                <span data-muscle-group={muscleCategory.muscle_category} className="badge">{muscleCategory.total_sets}</span>
                            </li>
                            <li className="list-group-item">
                                Total Volume
                                <span data-muscle-group={muscleCategory.muscle_category} className="badge">{muscleCategory.total_volume}</span>
                            </li>
                            <li className="list-group-item">
                                Total Reps
                                <span data-muscle-group={muscleCategory.muscle_category} className="badge">{muscleCategory.total_reps}</span>
                            </li>
                            <li className="list-group-item">
                                Average Strength
                                <span data-muscle-group={muscleCategory.muscle_category} className="badge">{muscleCategory.average_strength}</span>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        );
    },

  render: function() {
      if (this.props.userAuthenticated && this.props.user != null && this.props.show) {
          this.breakdown();
          return(
              <section id="dashboard-accordion" className="panel-group row" role="tablist" aria-multiselectable="true">
                  <h4 className="col-xs-12 col-sm-6 col-sm-offset-3">Overall Breakdown</h4>
                {this.props.user.stats_by_muscle_category.map(this.panel)}
              </section>
          );
      }
       else {
          return null;
      }
  }
});
/* do a collapsable panel setup
    email
    total number of workouts
        total number of workouts by muscle category
    total volume
        breakdown embedded pie chart by primary muscle group

    number of sets
        breakdown embedded pie chart by primary muscle group

    number of reps
        breakdown embedded pie chart by primary muscle group

    Strength
        breakdown by muscle group

    Progressive Overload
        by increase in volume per week
        by increase in strength per week
 */