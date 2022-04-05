import React, { Component } from 'react';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isBtnDisabled: true,
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validateForm);
  }

  handleClick = () => {
    console.log('cheguei aqui');
  }

  validateForm = () => {
    const { name, email } = this.state;

    if (name.length && email.length) {
      this.setState({ isBtnDisabled: false });
    } else {
      this.setState({ isBtnDisabled: true });
    }
  }

  render() {
    const { name, email, isBtnDisabled } = this.state;
    return (
      <>
        <input
          type="text"
          value={ name }
          name="name"
          data-testid="input-player-name"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          value={ email }
          name="email"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClick }
          disabled={ isBtnDisabled }
        >
          Play
        </button>
      </>
    );
  }
}

export default Login;
