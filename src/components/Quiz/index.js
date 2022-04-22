import React, { Component } from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizMarvel } from "../QuizMarvel";
import QuizOver from "../QuizOver";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiChevronRightCircle } from "react-icons/bi";

toast.configure();

const initialState = {
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
  percent: null,
};
const levelNames = ["debutant", "confirme", "expert"];

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.storedDataRef = React.createRef();
  }

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
  showToastMsg = (pseudo) => {
    if (!this.state.showWelcomeMsg) {
      this.setState({
        showWelcomeMsg: true,
      });
      toast(`Bienvenu ${pseudo}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  };

  componentDidMount() {
    this.loadQuestions(levelNames[this.state.levelQuiz]);
  }
  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      /*this.gameOver();*/
      this.setState({ quizEnd: true });
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
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Réponse fausse!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      maxQuestions,
      storedQuestions,
      question,
      options,
      idQuestion,
      btnDisabled,
      userAnswer,
      score,
      showWelcomeMsg,
      quizEnd,
      percent,
    } = this.state;
    if (
      storedQuestions !== prevState.storedQuestions &&
      storedQuestions.length
    ) {
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
      });
    }
    if (idQuestion !== prevState.idQuestion && storedQuestions.length) {
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
        userAnswer: null,
        btnDisabled: true,
      });
    }
    if (quizEnd !== prevState.quizEnd) {
      const gradePercent = this.getPercentage(maxQuestions, score);
      this.gameOver(gradePercent);
    }

    if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
      this.showToastMsg(this.props.userData.pseudo);
    }
  }

  submitAnswer = (selectedAnswer) => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false,
    });
  };
  getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

  gameOver = (percent) => {
    if (percent >= 50) {
      this.setState({
        levelQuiz: this.state.levelQuiz + 1,
        percent,
      });
    } else {
      this.setState({
        percent,
      });
    }
  };
  loadLevelQuestions = (param) => {
    this.setState({ ...initialState, levelQuiz: param });
    this.loadQuestions(levelNames[param]);
  };

  render() {
    const {
      levelQuiz,
      maxQuestions,
      storedQuestions,
      question,
      options,
      idQuestion,
      btnDisabled,
      userAnswer,
      score,
      showWelcomeMsg,
      quizEnd,
      percent,
    } = this.state;
    const displayOtions = options.map((option, index) => {
      return (
        <p
          key={index}
          onClick={() => this.submitAnswer(option)}
          className={`answerOptions ${
            userAnswer === option ? "selected" : null
          }`}
        >
          <BiChevronRightCircle />
          {option}
        </p>
      );
    });
    return quizEnd ? (
      <QuizOver
        ref={this.storedDataRef}
        levelNames={levelNames}
        score={score}
        maxQuestions={maxQuestions}
        levelQuiz={levelQuiz}
        percent={percent}
        loadLevelQuestions={this.loadLevelQuestions}
      />
    ) : (
      <>
        <Levels levelNames={levelNames} levelQuiz={levelQuiz} />
        <ProgressBar idQuestion={idQuestion} maxQuestions={maxQuestions} />
        <h2>{question}</h2>
        {displayOtions}

        <button
          disabled={btnDisabled}
          className="btnSubmit"
          onClick={this.nextQuestion}
        >
          {idQuestion < maxQuestions - 1 ? "Suivant" : "Terminer"}
        </button>
      </>
    );
  }
}
export default Quiz;
