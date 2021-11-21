import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/navbar.module.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const TopNavbar = () => {
    // const [anchorEl, setAnchorEl] = useState(null);
    // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    // const isMenuOpen = Boolean(anchorEl);
    // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    
        // <Menu mode="horizontal" className={styles.myNav}>
        //     <Menu.Item className={styles.name}>
        //         <span><Image src="/logo.png" width="30%" height="30%" alt="logo"/></span>
        //         <span><Link href={`/`}><a className={styles.titleText}>Lorem</a></Link></span>
        //     </Menu.Item>
        // </Menu>
        

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={styles.myNav}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            className={styles.name}
          >
            Lorem
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    );
}

export default TopNavbar;