import React, { useState } from "react";
import styles from "../styles/login.module.css"
import { SignInButton } from "../pages/login";
import TopNavbar from "./navbar/toppage_navbar";
import { Spinner } from "react-bootstrap";

const Login = ({isLoading, setIsLoading}) => {

    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    return (
        <div className={styles.container}>
            <TopNavbar />
            <div className={styles.body}>

                <div className={styles.titleContainer}>
                    <label className={styles.title}><span>Become a better</span><br/><span>version of YOU!</span></label>
                </div>
                <div className={styles.formContainer}>
                    <div className={styles.loginWith}>
                            <SignInButton setIsLoading={setIsLoading} />
                    </div>
                    <br />
                    <p className={styles.or}>or</p><br/>
                    <div className={styles.inputField}>
                        <label className={styles.labelText}>Username or Email</label>
                        <input className={styles.inputText} name="account" type="text" /><br />
                        <label className={styles.labelText}>Password</label>  <br />
                        <input className={styles.inputText} name="pass" type="password" /><br />
                    </div>
                    <div className={styles.fpContainer}>
                        <a className={styles.forgotPassword} href="/forgotPassword">Forgot password?</a><br/>
                    </div>
                    
                    <button className={styles.loginButton}>LOGIN</button><br />
                    <div className={styles.signupContainer}>
                        <a className={styles.signup} href="/signup">Not having account yet? SIGN UP!</a>
                    </div>
                </div>
                {isLoading?(
                     <div className={styles.spinner}>
                        <Spinner animation="border" variant="warning" />
                    </div>
                ):""}
            </div>
        </div>
    );
}

export default Login;