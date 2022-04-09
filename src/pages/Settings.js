import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FiSettings } from 'react-icons/fi';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logoTrivia from '../helpers/logoTrivia.png';
import { saveConfigs } from '../redux/actions';
import './Settings.css';

class Settings extends Component {
  state = {
    category: '',
    difficulty: '',
    type: '',
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleSaveConfig = () => {
    const {
      dispatch,
      history,
    } = this.props;
    dispatch(saveConfigs(this.state));
    history.push('/');
  };

  render() {
    return (
      <div className="settings-page">
        <header className="header-game">
          <div className="game-title">
            <Link to="/">
              <img src={ logoTrivia } alt="Imagem jogo" width="50px" title="Home" />
            </Link>
            <h3>TrybeTrivia</h3>
          </div>
          <div className="game-title settings-header">
            <h3
              data-testid="settings-title"
              className="settings-title"
            >
              Settings
              {'   '}
              <FiSettings
                className="settings-icon"
              />
            </h3>
          </div>
        </header>

        <form className="settings-form">
          <label htmlFor="category">
            Category
            <select id="category" name="category" onChange={ this.handleChange }>
              <option>Qualquer categoria</option>
              <option>Conhecimentos gerais</option>
              <option>Entretenimento: livros</option>
              <option>Entretenimento: filmes</option>
              <option>Entretenimento: musicas</option>
              <option
                value="Entretenimento: musicais e teatro"
              >
                Entretenimento: musicais e teatro
              </option>
            </select>
          </label>
          <label htmlFor="difficulty">
            Difficulty
            <select id="difficulty" name="difficulty" onChange={ this.handleChange }>
              <option>Any difficulty</option>
              <option>Fácil</option>
              <option>Médio</option>
              <option>Difícil</option>
            </select>
          </label>
          <label htmlFor="type">
            Question Type
            <select id="type" name="type" onChange={ this.handleChange }>
              <option>All</option>
              <option>Multiple Choice</option>
              <option>True / False</option>
            </select>
          </label>
        </form>
        <button type="button" onClick={ this.handleSaveConfig }>Save</button>
      </div>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default connect()(Settings);
