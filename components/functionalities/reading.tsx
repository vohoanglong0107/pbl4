import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from 'react';
import NavigationBar from "../navbar/navbar";
import styles from "../../styles/funcs/reading.module.css";
import { Container, Row, Col } from "react-bootstrap";


const Reading : NextPage = () => {
    
    const [ output, setOutput ] = useState(""); //state de show ket qua
    const [ passage, setPassage ] = useState("");
    const [ question, setQuestion ] = useState("");
    const [ answer, setAnswer ] = useState({
        answerA: "",
        answerB: "",
        answerC: "",
        answerD: ""
    })

    const handleAnswer = () => {
        setOutput("");
    }

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const response = await fetch('api/hello', {
            method: "POST",
            body: JSON.stringify({ passage, question, answer}),
            headers: {
                'Content-Type': 'application/json'
            },
        }) 
        const data = await response.json();
        // console.log(data);
        

        }
    //     fetch("http://localhost:8000/", {
    //         method: "POST",
    //         mode: 'no-cors'
    //     })
    //     .then((response) => response.json())
    //     .then((response) => {
    //         setOutput(response.output);
    //         console.log(response.output)
    //     })
    //   .catch(error => console.error(error));
    // }
    return (
        <div className={styles.container}>
            <NavigationBar />
            <form onSubmit={handleSubmit} method={"POST"} className={styles.content} >
                <div className={styles.passage}>
                    <label className={styles.instruction}>Passage </label><br />
                    <label className={styles.via}>Via picture </label>
                    <input type="text" autoComplete="off" name="src" onChange={(e) => e.target.value} className={styles.imageSrc}/>
                    <button className={styles.uploadBtn}>Upload!</button><br />
                    <label className={styles.via}>Via text </label>
                    <textarea rows={5} name="passage" value={passage} onChange={e => setPassage(e.target.value)} className={styles.passageContent}></textarea>
                </div>
                {/* onChange= {e => setDetails({...details, username: e.target.value})} */}
                <div className={styles.questionContainer}>
                    <label className={styles.instruction}>Please fill in the question </label><br />
                    <input type="text" autoComplete="off" name="question" value={question} onChange={e => setQuestion(e.target.value)} className={styles.questionInput} />
                </div>
                <div className={styles.answerContainer}>
                    <label className={styles.instruction}>Please fill in the answers </label><br />
                    <div className={styles.answer}>
                        <p>A <input className={styles.answerInput} value={answer.answerA} onChange= {e => setAnswer({...answer, answerA: e.target.value})} autoComplete="off" name="answerA" /></p>
                        <p>B <input className={styles.answerInput} value={answer.answerB} onChange= {e => setAnswer({...answer, answerB: e.target.value})} autoComplete="off" name="answerB" /></p>
                        <p>C <input className={styles.answerInput} value={answer.answerC} onChange= {e => setAnswer({...answer, answerC: e.target.value})} autoComplete="off" name="answerC" /></p>
                        <p>D <input className={styles.answerInput} value={answer.answerD} onChange= {e => setAnswer({...answer, answerD: e.target.value})} autoComplete="off" name="answerD" /></p>
                    </div>
                    {/* TODO show ket qua */}
                    <p className={styles.ans}>Answer: {output}</p>  
                    <input type="submit" className={styles.solveBtn} value="Solve!" />
                </div>
                
            </form>
        </div>

    );
}

export default Reading;