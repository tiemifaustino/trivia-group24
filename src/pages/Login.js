import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FiSettings } from 'react-icons/fi';
import { connect } from 'react-redux';
import logoTrivia from '../helpers/logoTrivia.png';
import { getSaveToken, newGame, savePlayer } from '../redux/actions';
import './Login.css';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isBtnDisabled: true,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(newGame());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validateForm);
  }

  handleClick = () => {
    const {
      history,
      dispatch,
    } = this.props;
    dispatch(savePlayer(this.state));
    dispatch(getSaveToken());
    history.push('/game');
  }

  handleConfigClick = () => {
    const {
      history,
    } = this.props;
    history.push('/config');
  }

  validateForm = () => {
    const { name, email } = this.state;
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (name.length && email.match(validEmail)) {
      this.setState({ isBtnDisabled: false });
    } else {
      this.setState({ isBtnDisabled: true });
    }
  }

  render() {
    const { name, email, isBtnDisabled } = this.state;
    return (
      <div className="login-page">
        <button
          className="config-btn"
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleConfigClick }
          title="Configurações"
        >
          <FiSettings />
        </button>
        <div className="lgn-pg-title">
          <img src={ logoTrivia } alt="Imagem jogo" width="50px" />
          <h1>TrybeTrivia</h1>
        </div>

        <div className="login-block">
          <h2>Login</h2>
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
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
