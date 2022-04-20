import React, { Component } from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizMarvel } from "../QuizMarvel";
import QuizOver from "../QuizOver";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
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
    showWelcomeMsg: false,
    quizEnd: false,
  };
  storedDataRef = React.createRef();
  loadQuestions = (quizz) => {
    const fetchedArrQuiz = QuizMarvel[0].quizz[quizz];
    if (fetchedArrQuiz.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedArrQuiz;

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
  showWelcomeMsg = (pseudo) => {
    if (!this.state.showWelcomeMsg) {
      this.setState({
        showWelcomeMsg: true,
      });
      toast(`Bienvenu ${pseudo}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  };

  componentDidMount() {
    this.loadQuestions(this.state.levelNames[this.state.levelQuiz]);
  }
  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      this.gameOver();
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
      toast.success(`Bravo +1 points !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Réponse fausse!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
    if (this.props.userData.pseudo) {
      this.showWelcomeMsg(this.props.userData.pseudo);
    }
  }

  submitAnswer = (selectedAnswer) => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false,
    });
  };
  gameOver = () => {
    this.setState({
      quizEnd: true,
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
    return this.state.quizEnd ? (
      <QuizOver />
    ) : (
      <>
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
      </>
    );
  }
}
export default Quiz;
