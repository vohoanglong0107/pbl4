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
                <Row>
                    <Col>
                        <p>Slogan</p> 
                        <Image src="/logo.png" alt="illustrate-image" width="60%" height="60%"/>
                    </Col>
                    <Col>
                        <p>Login form</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;