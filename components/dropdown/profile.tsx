import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import styles from "../../styles/navbar.module.css";
import { Menu, Dropdown, Button } from "antd";
import IconButton from '@mui/material/IconButton';
import { SignOutButton } from "@/pages/login";

const ProfileDropdown : NextPage = () => {
    const menu = (
        <Menu>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              Profile
            </a>
          </Menu.Item>
          <Menu.Item>
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
        </IconButton>
    </Dropdown>
    );

}

export default ProfileDropdown