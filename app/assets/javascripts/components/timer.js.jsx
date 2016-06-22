var Timer = React.createClass({

    time: function() {
        var elapsed = Math.round(this.props.elapsed);
        var seconds = (elapsed / 1000).toFixed(1);
        return seconds;
    },

    render: function() {
        return(
            <p className="form-control">
                {this.props.display()}
                <span id="duration">{this.time()}</span>
            </p>
        );
    }

});
