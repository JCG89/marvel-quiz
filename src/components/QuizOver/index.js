import React, { useState, useEffect } from "react";
import { BsTrophy } from "react-icons/bs";
import axios from "axios";
import Loader from "../Loader";
import Modal from "../Modal";

const QuizOver = React.forwardRef((props, ref) => {
  const [asked, setAsked] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [characterInfo, setCharacterInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    levelNames,
    score,
    maxQuestions,
    levelQuiz,
    percent,
    loadLevelQuestions,
  } = props;

  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;

  const hash = "f9f7cb83f4a704b9e45f028b3e1b7b7f";
  useEffect(() => {
    if (localStorage.getItem("marvelStorageDate")) {
      const date = localStorage.getItem("marvelStorageDate");
      checkDataAge(date);
    }
    setAsked(ref.current);
  }, [ref]);

  const checkDataAge = (date) => {
    const today = Date.now();
    const timeDifference = today - date;
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    if (daysDifference >= 15) {
      localStorage.clear();
      localStorage.setItem("marvelStorageDate", Date.now());
    }
  };

  const showModal = (id) => {
    setOpenModal(true);

    if (localStorage.getItem(id)) {
      setCharacterInfo(JSON.parse(localStorage.getItem(id)));
      setLoading(false);
    } else {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`
        )
        .then((response) => {
          setCharacterInfo(response.data);
          setLoading(false);

          localStorage.setItem(id, JSON.stringify(response.data));

          if (!localStorage.getItem("marvelStorageDate")) {
            localStorage.setItem("marvelStorageDate", Date.now());
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const hideModal = () => {
    setOpenModal(false);
    setLoading(true);
  };
  const averageGrade = maxQuestions / 2;

  const decision =
    score >= averageGrade ? (
      <>
        <div className="stepsBtnContainer">
          {levelQuiz < levelNames.length ? (
            <>
              <p className="successMsg">Bravo, passez au niveau suivant!</p>
              <button
                className="btnResult success"
                onClick={() => loadLevelQuestions(levelQuiz)}
              >
                Niveau suivant
              </button>
            </>
          ) : (
            <>
              <p className="successMsg">
                <BsTrophy />
                Bravo vous êtes un expert!
              </p>
              <button
                className="btnResult gameOver"
                onClick={() => loadLevelQuestions(0)}
              >
                Accueil
              </button>
            </>
          )}
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite:{percent}%</div>
          <div className="progressPercent">
            Notes:{score}/{maxQuestions}{" "}
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="stepsBtnContainer">
          <p className="failureMsg">Vous avez échoué!</p>
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite: {percent}%</div>
          <div className="progressPercent">
            Notes: {score}/{maxQuestions}
          </div>
        </div>
      </>
    );

  const questionAnswer =
    score >= averageGrade ? (
      asked.map((question) => {
        return (
          <tr key={question.id}>
            <td>{question.question}</td>
            <td>{question.answer}</td>

            <td>
              <button
                onClick={() => showModal(question.heroId)}
                className="btnInfo"
              >
                Infos
              </button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="3">
          <Loader
            loadingMsg={
              "Les réponses ne sont chargé que si vous avez la moyenne"
            }
            styling={{ textAlign: "center", color: "red" }}
          />
        </td>
      </tr>
    );
  const resultInModal = !loading ? (
    <>
      <div className="modalHeader">
        <h2>{characterInfo.data.results[0].name}</h2>
      </div>
      <div className="modalBody">
        <h4>Titre 2</h4>
      </div>
      <div className="modalFooter">
        <button className="modalBtn">X</button>
      </div>
    </>
  ) : (
    <>
      <div className="modalHeader">
        <h2>Chargement en cours....</h2>
      </div>
      <div className="modalBody">
        <Loader />
      </div>
    </>
  );
  return (
    <>
      {decision}
      <hr />
      <p>Les réponses aux questions posées!</p>

      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponses</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>{questionAnswer}</tbody>
        </table>
        <Modal showModal={openModal} hideModal={hideModal}>
          {resultInModal}
        </Modal>
      </div>
    </>
  );
});
export default React.memo(QuizOver);
