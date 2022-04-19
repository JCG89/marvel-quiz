import React, { Component } from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizMarvel } from "../QuizMarvel";

class Quiz extends Component {
  state = {
    levelNames: ["debutant", "confirme", "expert"],
    levelQuiz: 0,
    maxQuestions: 10,
    storedQuestions: [],
    question: null,
    options: [],
    idQuestion: 0,
    btnDisabled: true,
    userAnswer: null,
    score: 0,
  };
  storedDataRef = React.createRef();
  loadQuestions = (quizz) => {
    const fetchedArrQuiz = QuizMarvel[0].quizz[quizz];
    if (fetchedArrQuiz.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedArrQuiz;
      console.log(this.storedDataRef.current);
      const newArrQuiz = fetchedArrQuiz.map(
        ({ answer, ...keepRest }) => keepRest
      );
      this.setState({
        storedQuestions: newArrQuiz,
      });
    } else {
      console.log("Pas assez de questions");
    }
  };

  componentDidMount() {
    this.loadQuestions(this.state.levelNames[this.state.levelQuiz]);
  }
  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      /*end*/
    } else {
      this.setState((prevState) => ({
        idQuestion: prevState.idQuestion + 1,
      }));
    }
    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
    if (this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.storedQuestions !== prevState.storedQuestions) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
      });
    }
    if (this.state.idQuestion !== prevState.idQuestion) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
        userAnswer: null,
        btnDisabled: true,
      });
    }
  }

  submitAnswer = (selectedAnswer) => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false,
    });
  };

  render() {
    const displayOtions = this.state.options.map((option, index) => {
      return (
        <p
          key={index}
          onClick={() => this.submitAnswer(option)}
          className={`answerOptions ${
            this.state.userAnswer === option ? "selected" : null
          }`}
        >
          {option}
        </p>
      );
    });
    return (
      <div>
        <Levels />
        <ProgressBar />
        <h2>{this.state.question}</h2>
        {displayOtions}

        <button
          disabled={this.state.btnDisabled}
          className="btnSubmit"
          onClick={this.nextQuestion}
        >
          Suivant
        </button>
      </div>
    );
  }
}
export default Quiz;
