import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/navbar.module.css";
import { Navbar, Container  } from "react-bootstrap";

const NavigationBar : NextPage = () => {

    return (
        <div>
            {/* <Navbar expand="lg" className={styles.myBg}> */}
                <nav className={styles.myNav}>
                    {/* <Navbar.Brand color="#" href="#home">Lorem</Navbar.Brand> */}
                    <label className={styles.myBrand}>Lorem</label>
                    <div className={styles.lists}>
                        <a className={styles.link} href="#">Multiple choices</a>
                        <a className={styles.link} href="#">Reading</a>
                        <a className={styles.link} href="#">Listening</a>
                        <a className={styles.link} href="#">Speaking</a>
                    </div>
                </nav>
            {/* </Navbar> */}
        </div>
        
    );
}

export default NavigationBar;