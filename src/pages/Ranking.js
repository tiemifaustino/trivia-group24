import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  handlePlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  sorter = (a, b) => {
    const minusOne = -1;
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return minusOne;
    }
    return 0;
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort(this.sorter);

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
        {ranking.map((player, index) => (
          <div className="ranked-player" key={ index }>
            <img
              alt="icone gravatar"
              src={ player.picture }
            />
            <p data-testid={ `player-name-${index}` }>{player.name}</p>
            <p data-testid={ `player-score-${index}` }>{player.score}</p>
          </div>
        ))}
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default Ranking;
