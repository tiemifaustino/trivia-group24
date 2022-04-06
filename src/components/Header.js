import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          alt="user profile pic from Gravatar"
          src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>

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
