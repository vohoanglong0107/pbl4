import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import 'antd/dist/antd.css';
import React, { useState, useContext } from 'react';
import styles from "../../styles/navbar.module.css";
import { Menu, Dropdown, Button } from "antd";
import IconButton from '@mui/material/IconButton';
import { SignOutButton } from "@/pages/login";
import { UserContext } from "@/lib/context";

const ProfileDropdown : NextPage = () => {
  const { username } = useContext(UserContext)
    const menu = (
        <Menu className={styles.dropdown}>
          <Menu.Item className={styles.dropItem}>
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              Profile
            </a>
          </Menu.Item>
          <Menu.Item className={styles.dropItem}>
            <SignOutButton />
          </Menu.Item>
        </Menu>
        
      );
    
    return (
    <Dropdown overlay={menu} placement="bottomLeft" arrow>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            className={styles.usericon}
        >
            
            <Image  src="/usericon.png" alt="user-icon" width="30%" height="30%" />
            <p className={styles.username}>{username}</p>
        </IconButton>
    </Dropdown>
    );

}

export default ProfileDropdown