import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Navbar, Container, Nav, Row, Col  } from "react-bootstrap";
import TopNavbar from "./navbar/toppage_navbar"
import styles from "../styles/toppage.module.css";

const TopPage : NextPage = () => {

    return (
        <div className={styles.container} >
            <TopNavbar />
            <Container className={styles.body}>
                <Row>
                    <Col>
                        <p className={styles.slogan}>Lorem ipsum dolor sit amet consectous</p>
                        <p className={styles.description}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</p>
                        <input className={styles.button} type="button" value="Get Started!" />
                    </Col>
                    <Col>
                        <Image className={styles.image} src="/toppage_image.png" width="300%" height="200%" alt="study-english-image"/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default TopPage;