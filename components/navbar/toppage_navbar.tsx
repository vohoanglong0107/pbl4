import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/navbar.module.css";
import { Navbar, Container, Nav,  } from "react-bootstrap";

const TopNavbar : NextPage = () => {

    return (
        <div>
            <Navbar expand="lg" className={styles.myBg}>
                <Container>
                    {/* <Navbar.Brand color="#" href="#home">Lorem</Navbar.Brand> */}
                    <label className={styles.myBrand}>Lorem</label>
                    {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className={styles.login} href="#login">Link</Nav.Link>
                    </Nav>
                    </Navbar.Collapse> */}
                </Container>
            </Navbar>
        </div>
        
    );
}

export default TopNavbar;