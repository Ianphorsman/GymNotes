var NavMenu = React.createClass({


  render: function() {
      var NavDropdown = ReactBootstrap.NavDropdown;
      if (this.props.userAuthenticated) {
          return(
              <NavDropdown eventKey={this.props.eventKey} title={this.props.user.email} id={this.props.id}>
                  <li role="presentation">
                      <a onClick={this.props.showDashboard.bind(this)}>Dashboard</a>
                  </li>
                  <li role="presentation">
                      <a onClick={this.props.setModalComponent.bind(this, 'getDatePicker')}>Workout Calendar</a>
                  </li>
                  <li role="presentation">
                      <a onClick={this.props.setModalComponent.bind(this, 'getStatsForm')}>Stats</a>
                  </li>
                  <li role="presentation">
                      <a onClick={this.props.endSession.bind(this)}>Sign Out</a>
                  </li>
              </NavDropdown>
          );
      } else {
          return (
              <NavDropdown eventKey={this.props.eventKey} title="You" id={this.props.id}>
                  <li role="presentation">
                      <a onClick={this.props.setModalComponent.bind(this, 'getRegistrationForm')}>Sign Up</a>
                  </li>
                  <li role="presentation">
                      <a onClick={this.props.setModalComponent.bind(this, 'getLoginForm')}>Sign In</a>
                  </li>
              </NavDropdown>
          );
      }
  }
});
