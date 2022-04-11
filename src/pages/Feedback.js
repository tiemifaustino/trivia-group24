import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { GiPodium } from 'react-icons/gi';
import { MdReplay } from 'react-icons/md';
import { RiGamepadFill } from 'react-icons/ri';
import { connect } from 'react-redux';
import Header from '../components/Header';
import celebration from '../helpers/celebration.gif';
import sad from '../helpers/sad.gif';
import './Feedback.css';

class Feedback extends Component {
  handlePlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  handleRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions, score } = this.props;
    const minAssertions = 3;

    return (
      <>
        <Header />
        <div className="feedback-page">
          <h1 data-testid="feedback-text">
            {
              assertions < minAssertions ? 'Could be better...' : 'Well Done!'
            }
          </h1>
          {assertions < minAssertions
            ? <img src={ sad } alt="sad minions gif" />
            : <img src={ celebration } alt="happy minions gif" />}
          <p className="total-score">
            <RiGamepadFill className="total-score-icon" />
            Total Score:
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
          </p>
          <p className="total-assertions">
            <BsFillCheckCircleFill className="total-assert-icon" />
            Assertions:
            {' '}
            <span data-testid="feedback-total-question">{assertions}</span>
          </p>
          <div className="feedback-btns">
            <button
              type="button"
              data-testid="btn-play-again"
              onClick={ this.handlePlayAgain }
              className="btn-play-again"
            >
              <MdReplay className="replay-icon" />
              Play Again
            </button>
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ this.handleRanking }
              className="btn-ranking"
            >
              <GiPodium />
              Ranking
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  history: PropTypes.shape(),
}.isRequired;

export default connect(mapStateToProps)(Feedback);
