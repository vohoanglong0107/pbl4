import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "antd/dist/antd.css";
import {  Row, Col  } from "antd";
import TopNavbar from "./navbar/toppage_navbar"
import styles from "../styles/toppage.module.css";
import { Spinner } from "react-bootstrap";

const TopPage : NextPage = () => {

    const [ isLoading, setIsLoading ] = useState(false) 
    return (
        <div className={styles.container} >
            <TopNavbar />
            <div className={styles.body}>
                <div className={styles.left}>
                    <p className={styles.slogan}>Become a better version of you</p>
                    <p className={styles.description}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</p>
                    <button className={styles.button}><Link href={`/home`}><a onClick={() => setIsLoading(true)} className={styles.linkText}>Get Started!</a></Link></button>
                    {/* <button className={styles.button}><Link href={`/login`}><a onClick={() => setIsLoading(true)} className={styles.linkText}>Get Started!</a></Link></button> */}
                    {isLoading?(
                        <div className={styles.spinner}>
                            <Spinner animation="border" variant="warning" />
                        </div>
                    ):""}
                </div>
                <div className={styles.right}>
                    <Image className={styles.image} src="/toppage.png" layout="responsive" width="50%" height="50%" alt="study-english-image"/>
                </div>
            </div>
        </div>
    );
}

export default TopPage;