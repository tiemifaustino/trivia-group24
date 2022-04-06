import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const minAssertions = 3;

    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">
          {
            assertions < minAssertions ? 'Could be better...' : 'Well Done!'
          }
        </h1>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
