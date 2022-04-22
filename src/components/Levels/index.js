import React, { useEffect, useState } from "react";
import Stepper from "react-stepper-horizontal";

const Levels = ({ levelNames, levelQuiz }) => {
  const [levels, setLevels] = useState([]);
  useEffect(() => {
    const quizStep = levelNames.map((level) => ({
      title: level.toUpperCase(),
    }));

    setLevels(quizStep);
  }, [levelNames]);

  return (
    <div className="levelsContainer" style={{ background: "transparent" }}>
      <Stepper
        steps={levels}
        activeStep={levelQuiz}
        circleTop={0}
        activeTitleColor={"#d31017"}
        activeColor={"#d31017"}
        completeTitleColor={"green"}
        completeColor={"green"}
        completeBarColor={"green"}
      />
    </div>
  );
};
export default React.memo(Levels);
