import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { correctAnswerClass, INITIAL_STATE, randomNumber, sorter } from '../helpers';
import { getQuestions, updateScore } from '../redux/actions';
import './Game.css';

const he = require('he');

class Game extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    const { token, questionsUpdate, settings } = this.props;
    questionsUpdate(token, settings);
    this.timerAnswer();
    this.positionMaker();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.timer === 0) {
      this.setState({
        isTimerOut: true,
        timer: 0,
        nextVisible: true,
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

  positionMaker = () => {
    const positions = {
      0: randomNumber(),
      1: randomNumber(),
      2: randomNumber(),
      3: randomNumber(),
    };
    this.setState({ positions });
  }

  answersMixer = ({
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers,
  }) => {
    const { positions } = this.state;
    const incAnsw = incorrectAnswers.map((answer, index) => ({
      answer,
      testId: `wrong-answer-${index}`,
      position: positions[index],
      className: 'wrong-answer',
    }));
    return [...incAnsw, {
      answer: correctAnswer,
      testId: correctAnswerClass,
      position: positions[3],
      className: correctAnswerClass,
    }].sort(sorter);
  }

  nextClick = () => {
    const maxQIndex = 4;
    const { qIndex } = this.state;
    const { history } = this.props;
    const wrongButtons = document.querySelectorAll('.clicked-wrong');
    if (wrongButtons.length) {
      wrongButtons.forEach((button) => {
        button.classList.remove('clicked-wrong');
      });
    }

    const correctButton = document.querySelector('.clicked-correct');
    if (correctButton) correctButton.classList.remove('clicked-correct');

    if (qIndex !== maxQIndex) {
      this.setState((prevState) => ({
        qIndex: prevState.qIndex + 1,
        timer: 30,
        nextVisible: false,
        isTimerOut: false,
        positions: {
          0: randomNumber(),
          1: randomNumber(),
          2: randomNumber(),
          3: randomNumber(),
        },
      }), this.timerAnswer);
    } else {
      const { name, gravatarEmail, score } = this.props;
      const picture = `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`;
      const prevRanking = JSON.parse(localStorage.getItem('ranking'));
      if (prevRanking) {
        localStorage
          .setItem('ranking', JSON.stringify([...prevRanking, { name, score, picture }]));
      } else {
        localStorage
          .setItem('ranking', JSON.stringify([{ name, score, picture }]));
      }
      history.push('/feedback');
    }
  }

  handleClick = ({ target: { name } }) => {
    this.setState({ nextVisible: true }, () => {
      const wrongButtons = document.getElementsByName('wrong-answer');
      wrongButtons.forEach((button) => {
        button.className = 'clicked-wrong';
      });
      const correctButton = document.getElementsByName(correctAnswerClass);
      correctButton[0].className = 'clicked-correct';

      clearInterval(this.periodAnswer);

      if (name === correctAnswerClass) {
        const { updateScoreAndAssertion, questions } = this.props;
        const { timer, qIndex } = this.state;
        const { difficulty } = questions[qIndex];
        const hard = 3;
        const medium = 2;
        const defaultPoints = 10;

        let diffPoints = 0;
        switch (difficulty) {
        case 'medium':
          diffPoints = medium;
          break;
        case 'hard':
          diffPoints = hard;
          break;
        default:
          diffPoints = 1;
        }
        const score = defaultPoints + (timer * diffPoints);
        updateScoreAndAssertion(score, 1);
      }
    });
  }

  render() {
    const { qIndex, timer, isTimerOut, nextVisible } = this.state;
    const { questions } = this.props;
    return (
      <>
        <Header />
        {(questions.length > 0)
          && (
            questions.length === 1
              ? (
                <>
                  <h1>{questions[0]}</h1>
                  <Link to="/settings" className="change-settings">Change Settings</Link>
                </>
              )
              : (
                <main>
                  <div className="question-info">
                    <p data-testid="question-category">
                      { questions[qIndex].category }
                    </p>
                    <p data-testid="question-text">
                      { he.decode(questions[qIndex].question) }
                    </p>
                    <p>{ timer }</p>
                  </div>
                  <div data-testid="answer-options" className="answers">
                    {this.answersMixer(questions[qIndex]).map((answer, index) => (
                      <button
                        type="button"
                        data-testid={ answer.testId }
                        key={ index }
                        name={ answer.className }
                        className={ answer.className }
                        onClick={ this.handleClick }
                        disabled={ isTimerOut }
                      >
                        {he.decode(answer.answer)}
                      </button>
                    ))}
                  </div>
                  {nextVisible
                  && (
                    <button
                      type="button"
                      data-testid="btn-next"
                      onClick={ this.nextClick }
                      className="btn-next"
                    >
                      Next
                    </button>
                  )}
                </main>
              )
          )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  questions: state.questions.questions,
  name: state.player.name,
  gravatarEmail: state.player.email,
  score: state.player.score,
  settings: state.questions.settings,
});

const mapDispatchToProps = (dispatch) => ({
  questionsUpdate: (token, settings) => dispatch(getQuestions(token, settings)),
  updateScoreAndAssertion: (score, assertion) => dispatch(updateScore(score, assertion)),
});

Game.propTypes = {
  token: PropTypes.string,
  questionsUpdate: PropTypes.func,
  questions: PropTypes.arrayOf(PropTypes.object),
  updateScoreAndAssertion: PropTypes.func,
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
