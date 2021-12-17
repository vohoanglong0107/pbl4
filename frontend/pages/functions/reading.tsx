import type { NextPage } from "next";
import { useRouter } from "next/router"
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import NavigationBar from "../../components/navbar/navbar";
import FormData from "form-data";
import { UserContext } from "@/lib/context";
import { Spinner } from "react-bootstrap";
import styles from "../../styles/funcs/reading.module.css";

const Reading: NextPage = () => {
  const router = useRouter();
  const query = router.query;
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isUploading, setIsUploading ] = useState(false)
  const [output, setOutput] = useState(""); 
  const [passage, setPassage] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState({
    answerA: "",
    answerB: "",
    answerC: "",
    answerD: "",
  });

  const [image, setImage] = useState<File>();
  const { user, username } = useContext(UserContext);
  const handleAnswer = (trueAnswer: React.SetStateAction<string>): void => {
    setOutput(trueAnswer);
    setIsLoading(false)
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true)
    axios
      .post(
        "/api/qa",
        {
          passage: passage,
          question: question,
          answerA: answer.answerA,
          answerB: answer.answerB,
          answerC: answer.answerC,
          answerD: answer.answerD,
        },
        { params: { user_uid: user!.uid } }
      )
      .then((response) => response.data as number)
      .then((response) =>
        handleAnswer(String.fromCharCode(response - 1 + "A".charCodeAt(0)))
      )
      
      .catch((err) => {
        console.log(err);
        handleAnswer(String(err));
      });
  };
 
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files![0]);
  };

  const handleImageSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsUploading(true)
    if (image) {
      const formData = new FormData();
      formData.append("data", image, image.name);
      axios
        .post("/api/ocr", formData)
        .then((response) => response.data)
        .then((response) => setPassage(String(response)))
        .catch((err) => {
          console.log(err);
          setPassage(String(err));
        })
        .finally(() => setIsUploading(false));
        
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
      setPassage(query.passage as string)
      setQuestion(query.question as string)
      setAnswer({
        answerA: query.answerA as string,
        answerB: query.answerB as string,
        answerC: query.answerC as string,
        answerD: query.answerD as string
      })
  },[])
  
  return (
    <div className={styles.container}>
      <NavigationBar username={username} />
        <form onSubmit={handleSubmit} method={"POST"} className={styles.content}>
        <div className={styles.passage}>
          <label className={styles.instruction}>Passage </label>
          <br />
          <div className={styles.viaPic}>
            <label className={styles.via}>Via picture </label>
            <input
              type="file"
              name="image"
              onChange={handleImageUpload}
              className={styles.imageSrc}
            />
            <button className={styles.uploadBtn} onClick={handleImageSubmit}>
              Upload
            </button>
            {!isUploading?"":(
              <span className={styles.uploadSpinner}>
                  <Spinner animation="grow" variant="warning" size="sm" />
              </span>
            )}
          </div>
          
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
        {/* onChange= {e => setDetails({...details, username: e.target.value})}  */}
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
          <input type="submit" className={styles.solveBtn} value="Solve!" />
          {!isLoading?"":(
            <span className={styles.spinner}>
              <Spinner animation="grow" variant="warning" size="sm" />
            </span>
          )}
        </div>
        </form>

    </div>
  );
};

export default Reading;
