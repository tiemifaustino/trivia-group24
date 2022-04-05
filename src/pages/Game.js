// import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { updateToken } from '../redux/actions';
import apiQuestionsFetch from '../services/apiFetch';

class Game extends Component {
  state={
    questions: [],
    qIndex: 0,
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = async () => {
    const { token, tokenUpdate } = this.props;
    const { results, newToken } = await apiQuestionsFetch(token);
    tokenUpdate(newToken);
    this.setState({ questions: results });
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
    }));
    return [...incAnsw, {
      answer: correctAnswer,
      testId: 'correct-answer',
      position: this.randomNumber(),
    }].sort(this.sorter);
  }

  render() {
    const { questions, qIndex } = this.state;
    return (
      <>
        <Header />
        {!questions.length
          ? (<p>Loading</p>)
          : (
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
});

const mapDispatchToProps = (dispatch) => ({
  tokenUpdate: (token) => dispatch(updateToken(token)),
});

Game.propTypes = {
  token: PropTypes.string,
  tokenUpdate: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
