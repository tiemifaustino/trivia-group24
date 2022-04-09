import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { GiPodium } from 'react-icons/gi';
import { MdReplay } from 'react-icons/md';
import logoTrivia from '../helpers/logoTrivia.png';
import './Ranking.css';

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
        <header className="header-game">
          <div className="game-title">
            <img src={ logoTrivia } alt="Imagem jogo" width="50px" />
            <h3>TrybeTrivia</h3>
          </div>
          <div className="game-title">
            <h3
              data-testid="ranking-title"
              className="ranking-title"
            >
              Ranking
              {'  '}
              <GiPodium className="podium-icon" />
            </h3>
          </div>
        </header>
        <div className="ranking-page">
          <div className="ranking-table">
            <div className="table-header">
              <p>Player</p>
              <p>Score</p>
            </div>
            <hr />
            {ranking.map((player, index) => (
              <div className="ranked-player" key={ index }>
                <div>
                  <img
                    alt="icone gravatar"
                    src={ player.picture }
                  />
                  <p data-testid={ `player-name-${index}` }>
                    {player.name}
                  </p>
                </div>
                <p data-testid={ `player-score-${index}` }>
                  {player.score}
                </p>
              </div>
            ))}
          </div>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.handlePlayAgain }
            className="btn-play-again ranking-btn"
          >
            <MdReplay className="replay-icon" />
            Play Again
          </button>
        </div>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default Ranking;
