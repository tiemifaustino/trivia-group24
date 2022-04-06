import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getQuestions } from '../redux/actions';
import './Game.css';

class Game extends Component {
  state={
    qIndex: 0,
  }

  componentDidMount() {
    const { token, questionsUpdate } = this.props;
    questionsUpdate(token);
  }

  randomNumber = () => {
    const possibilities = 100000000000;
    return Math.random() * possibilities;
  }

  sorter = (a, b) => {
    const minusOne = -1;
    if (a.position > b.position) {
      return 1;
    }
    if (a.position < b.position) {
      return minusOne;
    }
    return 0;
  }

  answersMixer = ({
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers,
  }) => {
    const incAnsw = incorrectAnswers.map((answer, index) => ({
      answer,
      testId: `wrong-answer-${index}`,
      position: this.randomNumber(),
      className: 'wrong-answer',
    }));
    return [...incAnsw, {
      answer: correctAnswer,
      testId: 'correct-answer',
      position: this.randomNumber(),
      className: 'correct-answer',
    }].sort(this.sorter);
  }

  handleClick = () => {
    const wrongButtons = document.querySelectorAll('.wrong-answer');
    wrongButtons.forEach((button) => {
      button.className = 'clicked-wrong';
    });
    const correctButton = document.querySelector('.correct-answer');
    correctButton.className = 'clicked-correct';
  }

  render() {
    const { qIndex } = this.state;
    const { questions } = this.props;
    return (
      <>
        <Header />
        {(questions.length > 0)
          && (
            <>
              <div>
                <p data-testid="question-category">{ questions[qIndex].category }</p>
                <p data-testid="question-text">{ questions[qIndex].question }</p>
              </div>
              <div data-testid="answer-options">
                {this.answersMixer(questions[qIndex]).map((answer, index) => (
                  <button
                    type="button"
                    data-testid={ answer.testId }
                    key={ index }
                    className={ answer.className }
                    onClick={ this.handleClick }
                  >
                    {answer.answer}
                  </button>
                ))}
              </div>
            </>
          )}

      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  questions: state.questions.questions,
});

const mapDispatchToProps = (dispatch) => ({
  questionsUpdate: (token) => dispatch(getQuestions(token)),
});

Game.propTypes = {
  token: PropTypes.string,
  questionsUpdate: PropTypes.func,
  questions: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
