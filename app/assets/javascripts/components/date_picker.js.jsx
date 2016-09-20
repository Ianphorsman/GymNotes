var DatePicker = React.createClass({
    

    render: function() {
        var addDay = (day) => <td data-muscle-group={day["focus"]} className={day["context"]} onClick={this.props.requestJSONForWorkout.bind(this, "/workouts/" + day["date"])}>{day["day"]}</td>;
        var addWeek = (week) => <tr>{week.map(addDay)}</tr>;
        return(
            <table>
                <thead>
                    <tr>
                        <th className="month-selector" onClick={this.props.prevMonth.bind(this)}>{this.props.datePickerData['prevMonth']}</th>
                        <th></th>
                        <th></th>
                        <th className="month-selected">{this.props.datePickerData['month']}</th>
                        <th></th>
                        <th></th>
                        <th className="month-selector" onClick={this.props.nextMonth.bind(this)}>{this.props.datePickerData['nextMonth']}</th>
                    </tr>
                    <tr>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                        <th>Sun</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.datePickerData['dates'].map(addWeek)}
                </tbody>
            </table>
        );
    }

});
