var Timer = React.createClass({

    time: function() {
        var elapsed = Math.round(this.props.elapsed);
        var seconds = (elapsed / 1000).toFixed(1);
        return seconds;
    },

    render: function() {
        return(
            <div className="form-control">
                <div className="row">
                    {this.props.display()}
                    <p id="duration" className="col-xs-6">{this.time()}</p>
                </div>
            </div>
        );
    }

});
