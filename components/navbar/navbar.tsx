import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import {
    HomeOutlined
  } from "@ant-design/icons";
  import { SignOutButton } from "../../pages/login";
import styles from "../../styles/navbar.module.css";
import Reading from "../../pages/functions/reading";
const { SubMenu } = Menu;

const NavigationBar = ({username}) => {

    return (
        <Menu mode="horizontal" className={styles.myNav}>
            <Menu.Item className={styles.name}>
                <span><Image src="/logo.png" width="30%" height="30%" alt="logo"/></span>
                <span><Link href={`/home`}><a>Lorem</a></Link></span>
            </Menu.Item>
            <Menu.Item className={styles.item} key="mul">
                <Link href={`/500`}><a>Multiple Choices</a></Link>
            </Menu.Item>
            <Menu.Item className={styles.item} key="read">
                <Link href={`/functions/reading`}><a>Reading</a></Link>
            </Menu.Item>
            <Menu.Item className={styles.item} key="listen"><Link href={`/500`}><a>Listening</a></Link></Menu.Item>
            <Menu.Item className={styles.item} key="speak"><Link href={`/500`}><a>Speaking</a></Link></Menu.Item>
            <SubMenu icon={<HomeOutlined />} className={styles.subIcon} >
                <Menu.Item className={styles.usericon}>
                    <Image src="/usericon.png" alt="user-icon" width="30%" height="30%" />{username}
                </Menu.Item>
                <Menu.Item>
                    <SignOutButton />
                </Menu.Item>
            </SubMenu>
        </Menu>
    );
}

export default NavigationBar;