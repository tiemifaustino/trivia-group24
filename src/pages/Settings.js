import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FiSettings } from 'react-icons/fi';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import logoTrivia from '../helpers/logoTrivia.png';
import { saveSettings } from '../redux/actions';
import './Settings.css';

class Settings extends Component {
  state = {
    category: 'any',
    difficulty: 'any',
    questionType: 'any',
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleSaveSettings = () => {
    const {
      dispatch,
      history,
    } = this.props;
    dispatch(saveSettings(this.state));
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
              <option value="any">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals &amp; Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science &amp; Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
              <option value="32">Entertainment: Cartoon &amp; Animations</option>
            </select>
          </label>
          <label htmlFor="difficulty">
            Difficulty
            <select id="difficulty" name="difficulty" onChange={ this.handleChange }>
              <option value="any">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label htmlFor="questionType">
            Question Type
            <select id="questionType" name="questionType" onChange={ this.handleChange }>
              <option value="any">Any Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
          </label>
        </form>
        <button type="button" onClick={ this.handleSaveSettings }>Save</button>
        <Footer />
      </div>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default connect()(Settings);
