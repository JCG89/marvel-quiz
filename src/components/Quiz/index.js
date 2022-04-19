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
  };
  loadQuestions = (quizz) => {
    const fetchedArrQuiz = QuizMarvel[0].quizz[quizz];
    if (fetchedArrQuiz.length >= this.state.maxQuestions) {
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
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.storedQuestions !== prevState.storedQuestions) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
      });
    }
  }

  render() {
    const { pseudo } = this.props.userData;

    const displayOtions = this.state.options.map((option, index) => {
      return <p className="answerOptions">{option}</p>;
    });
    return (
      <div>
        <Levels />
        <ProgressBar />
        <h2>{this.state.question}</h2>
        {displayOtions}

        <button className="btnSubmit">Suivant</button>
      </div>
    );
  }
}
export default Quiz;
