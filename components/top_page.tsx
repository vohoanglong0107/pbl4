import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import "antd/dist/antd.css";
import TopNavbar from "./navbar/toppage_navbar"
import styles from "../styles/toppage.module.css";

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