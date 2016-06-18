var MainMenu = React.createClass({

    getTitle: function() {
        /*if (this.props.user.email != undefined) {
            return this.props.user.email;
        } else {
            return "You";
        }*/
        
    },

  render: function() {
      var Navbar = ReactBootstrap.Navbar;
      var Nav = ReactBootstrap.Nav;
      var NavItem = ReactBootstrap.NavItem;
    return(
        <Navbar inverse fixedTop>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">Workout Tracker</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavMenu eventKey={1} title="You" user={this.props.user} id="main-menu" showDashboard={this.props.showDashboard} endSession={this.props.endSession} userAuth={this.userAuth} userAuthenticated={this.props.userAuthenticated} setModalComponent={this.props.setModalComponent} login={this.props.login} requestJSONForModal={this.props.requestJSONForModal}>
                    </NavMenu>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
  }
});