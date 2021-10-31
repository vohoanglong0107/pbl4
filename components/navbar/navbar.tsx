import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/navbar.module.css";
import { Navbar, Container, Nav, NavbarBrand, NavLink  } from "react-bootstrap";
// import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
// import NavbarToggle from "react-bootstrap/esm/NavbarToggle";

const NavigationBar : NextPage = () => {

    return (
        <div>
            {/* <Navbar expand="lg" className={styles.myBg}> */}
                <Nav className={styles.myNav}>
                    {/* <Navbar.Brand color="#" href="#home">Lorem</Navbar.Brand> */}
                    <NavbarBrand className={styles.myBrand}>Lorem</NavbarBrand>
                    {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                    {/* <Navbar.Collapse id="basic-navbar-nav"> */}
                    <Nav className={styles.lists}>
                        <NavLink className={styles.link} href="#">Multiple choices</NavLink>
                        <NavLink className={styles.link} href="#">Reading</NavLink>
                        <NavLink className={styles.link} href="#">Listening</NavLink>
                        <NavLink className={styles.link} href="#">Speaking</NavLink>
                    </Nav>
                    {/* </Navbar.Collapse> */}
                </Nav>
            {/* </Navbar> */}
        </div>
        
    );
}

export default NavigationBar;