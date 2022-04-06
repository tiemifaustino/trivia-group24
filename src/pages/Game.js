import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getQuestions } from '../redux/actions';
import './Game.css';

class Game extends Component {
  state={
    qIndex: 0,
    timer: 30,
    isTimerOut: false,
  }

  componentDidMount() {
    const { token, questionsUpdate } = this.props;
    questionsUpdate(token);
    this.timerAnswer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.timer === 0) {
      this.setState({
        isTimerOut: true,
        timer: 0,
      });
      clearInterval(this.periodAnswer);
    }
  }

  timerAnswer = () => {
    const ONE_SECOND = 1000;
    this.periodAnswer = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, ONE_SECOND);
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
    const { qIndex, timer, isTimerOut } = this.state;
    const { questions } = this.props;
    return (
      <>
        <Header />
        {(questions.length > 0)
          && (
            <main>
              <div className="question-info">
                <p data-testid="question-category">
                  { questions[qIndex].category }
                </p>
                <p data-testid="question-text">
                  { questions[qIndex].question
                    .replace(/&quot;/g, '"')
                    .replace(/&#039;/g, '\'')
                    .replace(/&eacute;/g, 'é')}
                </p>
                <span>Timer</span>
                <span>{ timer }</span>
              </div>
              <div data-testid="answer-options" className="answers">
                {this.answersMixer(questions[qIndex]).map((answer, index) => (
                  <button
                    type="button"
                    data-testid={ answer.testId }
                    key={ index }
                    className={ answer.className }
                    onClick={ this.handleClick }
                    disabled={ isTimerOut }
                  >
                    {answer.answer.replace(/&quot;/g, '"')
                      .replace(/&#039;/g, '\'')
                      .replace(/&ouml;/, 'ö')}
                  </button>
                ))}
              </div>
            </main>
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
