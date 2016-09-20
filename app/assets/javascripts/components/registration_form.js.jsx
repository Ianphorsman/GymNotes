var RegistrationForm = React.createClass({

    componentDidMount: function() {
        this.refs.emailField.focus();
    },

  render: function() {
    return(
        <form class="new_user" id="new_user" action="/users.js" accept-charset="UTF-8" method="post">
            <input className="form-control" type="hidden" name="utf8" value="checked" />
            <input className="form-control" ref="emailField" type="email" placeholder="Email" name="user[email]" id="user_email" />
            <input className="form-control" autocomplete="off" type="password" placeholder="Password" name="user[password]" id="user_password" />
            <input className="form-control" autocomplete="off" type="password" placeholder="Confirm" name="user[password_confirmation]" id="user_password_confirmation" />
            <button
                className="form-control"
                type="button"
                onClick={this.props.userAuth.bind(this, '/users', 'new_user')}
            >Sign Up</button>
        </form>
    );
  }
});
