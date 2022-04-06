import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    const minAssertions = 3;

    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">
          {
            assertions < minAssertions ? 'Could be better...' : 'Well Done!'
          }
        </h1>
        <p>
          Pontuação total:
          {' '}
          <span data-testid="feedback-total-score">{score}</span>
        </p>
        <p>
          Número de acertos:
          {' '}
          <span data-testid="feedback-total-question">{assertions}</span>
        </p>
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
}.isRequired;

export default connect(mapStateToProps)(Feedback);
