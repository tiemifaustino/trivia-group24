import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getToken from '../services/fetchToken';
import saveToken from '../redux/actions';

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

  handleClick = async () => {
    const {
      history,
      dispatch,
    } = this.props;
    const response = await getToken();
    dispatch(saveToken(response.token));
    history.push('/game');
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
          placeholder="Nome"
        />
        <input
          type="email"
          value={ email }
          name="email"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
          placeholder="E-mail"
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

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
