var StatsContainer = React.createClass({

    lightenDarkenColor: function(col, amt) {
        var usePound = false;

        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }

        var num = parseInt(col,16);

        var r = (num >> 16) + amt;

        if (r > 255) r = 255;
        else if  (r < 0) r = 0;

        var b = ((num >> 8) & 0x00FF) + amt;

        if (b > 255) b = 255;
        else if  (b < 0) b = 0;

        var g = (num & 0x0000FF) + amt;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
    },

    dates: function(day) {
        return <li className="list-group-item">{day.date}<span className="badge">{day.volume}</span></li>
    },

    makeList: function() {
        return(
            <ul className="list-group">
                {this.props.stats.stats.map(dates)}
            </ul>
        );
    },

  render: function() {
      if (this.props.stats == null || this.props.show == false) {
          return null;
      } else {

          var dataPoints = (dataPoint) => {
              return {
                  x: dataPoint.date,
                  y: dataPoint[Object.keys(dataPoint)[1]]
              };
          };

          var labels = (dataPoint) => {
              return dataPoint[Object.keys(dataPoint)[0]]
          };

          var yValues = (dataPoint) => {
              return parseFloat(dataPoint[Object.keys(dataPoint)[1]])
          };

          var data = this.props.stats.stats;
          $('.plot canvas').remove();
          $('.plot').append("<canvas id='plot-container' width='' height=''></canvas>");
          var plotLocation = $('#plot-container').get(0).getContext('2d');

          var dataForChart = {
              labels: data.map(labels),
              datasets: [
                  {
                      fill: true,
                      label: this.props.stats.attributes.best_fit,
                      backgroundColor: this.lightenDarkenColor(this.props.stats.attributes.theme_color, 10),
                      pointBackgroundColor: this.lightenDarkenColor(this.props.stats.attributes.theme_color, -30),
                      borderWidth: 3,
                      borderColor: this.lightenDarkenColor(this.props.stats.attributes.theme_color, -30),
                      pointBorderColor: this.lightenDarkenColor(this.props.stats.attributes.theme_color, -30),
                      data: data.map(yValues)
                  }
              ]
          };

          var options = {
              title: {
                  display: true,
                  text: this.props.stats.attributes.title
              },
              scales: {
                  xAxes: [{
                      type: 'time',
                      time: {
                          displayFormats: {
                              quarter: "YYYY-MM-DD"
                          }
                      },
                      gridLines: {
                          display: false
                      }
                  }],
                  yAxes: [{
                      gridLines: {
                          display: false
                      },
                      scaleLabel: {
                          display: true,
                          text: this.props.stats.attributes.yaxis_label
                      }
                  }]
              }
          };

          Chart.defaults.global.defaultFontColor = this.props.stats.attributes.theme_color;

          var lineChart = new Chart(plotLocation, {
              type: 'line',
              data: dataForChart,
              options: options
          });

          return <div/>;
      }
  }
});
