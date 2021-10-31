import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/login.module.css"

const Login : NextPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Image src="/logo.png" width="30%" height="30%" alt="logo"/>
                <a href="#" className={styles.name}>Lorem</a>
            </div>
            <Container>
                <Row className={styles.row}>
                    <Col>
                        <p className={styles.slogan}>Lorem ipsum dolor sit amet consectous</p>
                        <Image className={styles.image} src="/background-image.png" alt="illustrate-image" width="400%" height="400%"/>
                    </Col>
                    <Col>
                        <div className={styles.loginContainer}>
                            <p className={styles.loginTitle}>Login</p>
                            
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;