import type { NextPage } from "next";
import React, { useState } from "react";
import axios from "axios";
import NavigationBar from "../navbar/navbar";
import styles from "../../styles/funcs/reading.module.css";

interface Output {
  output: number
}

const Reading: NextPage = () => {
  const [output, setOutput] = useState(""); //state de show ket qua
  const [passage, setPassage] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState({
    answerA: "",
    answerB: "",
    answerC: "",
    answerD: "",
  });
  // const [ correctAns, setCorrectAns ]
  const handleAnswer = (trueAnswer: React.SetStateAction<string>): void => {
    setOutput(trueAnswer);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios.post("/api/qa", {
      passage: passage,
      question: question,
      answerA: answer.answerA,
      answerB: answer.answerB,
      answerC: answer.answerC,
      answerD: answer.answerD,
    })
    .then(response => response.data as Output)
    .then(response => handleAnswer(String.fromCharCode(response.output - 1 + 'A'.charCodeAt(0))))
    .catch(err => {console.log(err); handleAnswer(String(err))});
  };

  // check if "answer"+state === "answer..." -> bg special : bg normal

  return (
    <div className={styles.container}>
      <NavigationBar />
      <form onSubmit={handleSubmit} method={"POST"} className={styles.content}>
        <div className={styles.passage}>
          <label className={styles.instruction}>Passage </label>
          <br />
          <label className={styles.via}>Via picture </label>
          <input
            type="text"
            autoComplete="off"
            name="src"
            onChange={(e) => e.target.value}
            className={styles.imageSrc}
          />
          <button className={styles.uploadBtn}>Upload!</button>
          <br />
          <label className={styles.via}>Via text </label>
          <textarea
            rows={5}
            name="passage"
            value={passage}
            onChange={(e) => setPassage(e.target.value)}
            className= {styles.passageContent}
          >
          </textarea>
        </div>
        {/* onChange= {e => setDetails({...details, username: e.target.value})} */}
        <div className={styles.questionContainer}>
          <label className={styles.instruction}>
            Please fill in the question{" "}
          </label>
          <br />
          <input
            type="text"
            autoComplete="off"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className={styles.questionInput}
          />
        </div>
        <div className={styles.answerContainer}>
          <label className={styles.instruction}>
            Please fill in the answers{" "}
          </label>
          <br />
          <div className={styles.answer}>
            <p>
              A{" "}
              <input
                className={"answer" + output !== "answerA"?  styles.answerInput : styles.correctAnswer}
                value={answer.answerA}
                onChange={(e) =>
                  setAnswer({ ...answer, answerA: e.target.value })
                }
                autoComplete="off"
                name="answerA"
              />
            </p>
            <p>
              B{" "}
              <input
                className={"answer" + output !== "answerB"? styles.answerInput : styles.correctAnswer}
                value={answer.answerB}
                onChange={(e) =>
                  setAnswer({ ...answer, answerB: e.target.value })
                }
                autoComplete="off"
                name="answerB"
              />
            </p>
            <p>
              C{" "}
              <input
                className={"answer" + output !== "answerC"? styles.answerInput : styles.correctAnswer}
                value={answer.answerC}
                onChange={(e) =>
                  setAnswer({ ...answer, answerC: e.target.value })
                }
                autoComplete="off"
                name="answerC"
              />
            </p>
            <p>
              D{" "}
              <input
                className={"answer" + output !== "answerD"? styles.answerInput : styles.correctAnswer}
                value={answer.answerD}
                onChange={(e) =>
                  setAnswer({ ...answer, answerD: e.target.value })
                }
                autoComplete="off"
                name="answerD"
              />
            </p>
          </div>
          {/* TODO show ket qua */}
          {/* <p className={styles.ans}>Answer: {output}</p> */}
          <input type="submit" className={styles.solveBtn} value="Solve!" />
        </div>
      </form>
    </div>
  );
};

export default Reading;
