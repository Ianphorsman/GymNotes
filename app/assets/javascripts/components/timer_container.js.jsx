var TimerContainer = React.createClass({

    getInitialState: function() {
        return { elapsed: 0, startTime: new Date(), context: 'stopped' }
    },

    tick: function() {
        this.setState({ elapsed: new Date() - this.state.startTime });
    },

    startTimer: function() {
        this.setState({ startTime: new Date(), context: 'timing' });
        this.timer = setInterval(this.tick, 100);
    },

    stopTimer: function() {
        this.setState({ context: 'stopped' });
        clearInterval(this.timer);
    },

    display: function() {
        if (this.state.context == 'timing') {
            return <button type="button" id="timer-toggle" className="col-xs-6" onClick={this.stopTimer.bind(this)}>Stop</button>;
        } else if (this.state.context == 'stopped') {
            return <button type="button" id="timer-toggle" className="col-xs-6" onClick={this.startTimer.bind(this)}>Start</button>;
        }
    },

    render: function() {
        return(
            <Timer
                startTimer={this.startTimer}
                stopTimer={this.stopTimer}
                tick={this.tick}
                elapsed={this.state.elapsed}
                startTime={this.state.startTime}
                context={this.state.context}
                display={this.display}>

            </Timer>
        );
    }
});
