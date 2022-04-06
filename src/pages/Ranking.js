import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  handlePlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handlePlayAgain }
        >
          Play Again
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default Ranking;
