import type { NextPage } from "next";
import React, { useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import NavigationBar from "../navbar/navbar";
import styles from "../../styles/profile.module.css"
import { Menu } from "antd"
import { UserContext } from "@/lib/context";

const Profile : NextPage = () => {
    const { username } = useContext(UserContext);

    return (
        <div className={styles.container}>
            <NavigationBar username={username} />
            <div>
                {/* xem cách Ngọc làm up avatar -> làm theo */}
                <Image src="/" alt="avatar" width="100%" height="100%" /> 
                <p>Phuong Thanh</p>
            </div>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                // inlineCollapsed={this.state.collapsed}
                >
                <Menu.Item key="1" >
                    Option 1
                </Menu.Item>
                <Menu.Item key="2" >
                    Option 2
            </Menu.Item>
            </Menu>
        </div>
    );
}

export default Profile;