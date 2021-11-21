import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/navbar.module.css";
import { Menu } from "antd"

const TopNavbar = () => {

    return (
        <Menu mode="horizontal" className={styles.myNav}>
            <Menu.Item className={styles.name}>
                <span><Image src="/logo.png" width="30%" height="30%" alt="logo"/></span>
                <span><Link href={`/`}><a className={styles.titleText}>Lorem</a></Link></span>
            </Menu.Item>
        </Menu>
        
    );
}

export default TopNavbar;