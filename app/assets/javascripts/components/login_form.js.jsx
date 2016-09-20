var LoginForm = React.createClass({

    componentDidMount: function() {
        this.refs.emailField.focus();
    },

  render: function() {
    return(
        <form class="new_user" id="new_user" action="/users/sign_in" accept-charset="UTF-8" method="post">
            <input className="form-control" type="hidden" name="utf-8" value="checked" />
            <input className="form-control" ref="emailField" type="email" placeholder="Email" name="user[email]" id="user_email" />
            <input className="form-control" type="password" name="user[password]" placeholder="Password" id="user_password" />
            <input className="checkbox" type="checkbox" value="1" name="user[remember_me]" placeholder="Confirm" id="user_remember_me" />
            <button className="form-control" type="button" onClick={this.props.userAuth.bind(this, '/users/sign_in', 'new_user')}>Submit</button>
        </form>
    );
  }
});
