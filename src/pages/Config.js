import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveConfigs } from '../redux/actions';

class Config extends Component {
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
      <>
        <h1 data-testid="settings-title">CONFIGURAÇÕES</h1>
        <form>
          <label htmlFor="category">
            Selecione a categoria
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
            Selecione a dificuldade
            <select id="difficulty" name="difficulty" onChange={ this.handleChange }>
              <option>Qualquer dificuldade</option>
              <option>Fácil</option>
              <option>Médio</option>
              <option>Difícil</option>
            </select>
          </label>
          <label htmlFor="type">
            Selecione o tipo
            <select id="type" name="type" onChange={ this.handleChange }>
              <option>Qualquer tipo</option>
              <option>Múltipla escolha</option>
              <option>verdadeiro/falso</option>
            </select>
          </label>
        </form>
        <button type="button" onClick={ this.handleSaveConfig }>Voltar</button>
      </>
    );
  }
}

Config.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default connect()(Config);
