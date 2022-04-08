import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { RiGamepadFill } from 'react-icons/ri';
import { connect } from 'react-redux';
import logoTrivia from '../helpers/logoTrivia.png';
import './Header.css';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    return (
      <header>
        <div className="game-title">
          <img src={ logoTrivia } alt="Imagem jogo" width="50px" />
          <h3>TrybeTrivia</h3>
        </div>
        <div className="player-info">
          <img
            data-testid="header-profile-picture"
            title="Pessoa Jogadora"
            alt="user profile pic from Gravatar"
            src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
          />
          <p
            data-testid="header-player-name"
            className="player-name"
          >
            { name }
          </p>
          <p
            title="Pontuação"
            className="header-score"
          >
            <RiGamepadFill className="game-icon" />
            {' '}
            <span
              data-testid="header-score"
            >
              { score }
            </span>
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.email,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
