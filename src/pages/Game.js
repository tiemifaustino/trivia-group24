import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getQuestions, updateScore } from '../redux/actions';
import './Game.css';

class Game extends Component {
  state={
    qIndex: 0,
    timer: 30,
    isTimerOut: false,
    positions: {},
    nextVisible: false,
  }

  correctAnswerClass = 'correct-answer';

  componentDidMount() {
    const { token, questionsUpdate, configs } = this.props;
    questionsUpdate(token, configs);
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

  randomNumber = () => {
    const possibilities = 100000000000;
    return Math.random() * possibilities;
  }

  positionMaker = () => {
    const positions = {
      0: this.randomNumber(),
      1: this.randomNumber(),
      2: this.randomNumber(),
      3: this.randomNumber(),
    };
    this.setState({ positions });
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
    const { positions } = this.state;
    const incAnsw = incorrectAnswers.map((answer, index) => ({
      answer,
      testId: `wrong-answer-${index}`,
      position: positions[index],
      className: 'wrong-answer',
    }));
    return [...incAnsw, {
      answer: correctAnswer,
      testId: this.correctAnswerClass,
      position: positions[3],
      className: this.correctAnswerClass,
    }].sort(this.sorter);
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
          0: this.randomNumber(),
          1: this.randomNumber(),
          2: this.randomNumber(),
          3: this.randomNumber(),
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

      const correctButton = document.getElementsByName(this.correctAnswerClass);
      correctButton[0].className = 'clicked-correct';

      clearInterval(this.periodAnswer);

      if (name === this.correctAnswerClass) {
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
                    name={ answer.className }
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
        {nextVisible
        && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextClick }
          >
            Próximo
          </button>
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
  configs: state.questions.configs,
});

const mapDispatchToProps = (dispatch) => ({
  questionsUpdate: (token, configs) => dispatch(getQuestions(token, configs)),
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
