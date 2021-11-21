import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
// import 'antd/dist/antd.css';
// import { Menu } from 'antd';
// import {
//     HomeOutlined
//   } from "@ant-design/icons";
  import { SignOutButton } from "../../pages/login";
import styles from "../../styles/navbar.module.css";
import Reading from "../../pages/functions/reading";
// const { SubMenu } = Menu;
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import ProfileDropdown from "../dropdown/profile";

const NavigationBar = ({username}) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={()=>console.log("handleMenuClose")}
        >
        <MenuItem onClick={()=>console.log("handleMenuClose")}>Profile</MenuItem>
        <MenuItem onClick={()=>console.log("handleMenuClose")}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={()=>console.log("handleMobileMenuClose")}
        >
        <MenuItem>
            <p>Messages</p>
        </MenuItem>
        <MenuItem>
            <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={()=>console.log("handleProfileMenuOpen")}>
            <p>Profile</p>
        </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static" className={styles.myNav}>
                <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    className={styles.name}
                >
                    Lorem
                </Typography>
                
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }} className={styles.allItemContainer} >
                    <Button className={styles.itemContainer} color="inherit">
                        <Link href={`/500`}><a className={styles.item}>Multiple Choices</a></Link>
                    </Button>
                    <Button className={styles.itemContainer} color="inherit">
                        <Link href={`/functions/reading`}><a className={styles.item}>Reading</a></Link>
                    </Button>
                    <Button className={styles.itemContainer} color="inherit">
                        <Link href={`/500`}><a className={styles.item}>Listening</a></Link>
                    </Button>
                    <Button className={styles.itemContainer} color="inherit">
                        <Link href={`/500`}><a className={styles.item}>Speaking</a></Link>
                    </Button>
                    <ProfileDropdown />
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={()=>console.log("handleMobileMenuOpen")}
                    color="inherit"
                    >
                    <MoreIcon />
                    </IconButton>
                </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}


export default NavigationBar;
// <Menu className={styles.myNav}>
        //     <Menu.Item className={styles.name}>
        //         <span><Image src="/logo.png" width="30%" height="30%" alt="logo"/></span>
        //         <span><Link href={`/home`}><a>Lorem</a></Link></span>
        //     </Menu.Item>
        //     <Menu.Item className={styles.item} key="mul">
        //         <Link href={`/500`}><a>Multiple Choices</a></Link>
        //     </Menu.Item>
        //     <Menu.Item className={styles.item} key="read">
        //         <Link href={`/functions/reading`}><a>Reading</a></Link>
        //     </Menu.Item>
        //     <Menu.Item className={styles.item} key="listen"><Link href={`/500`}><a>Listening</a></Link></Menu.Item>
        //     <Menu.Item className={styles.item} key="speak"><Link href={`/500`}><a>Speaking</a></Link></Menu.Item>
        //     <SubMenu icon={<HomeOutlined />} className={styles.subIcon} >
        //         <Menu.Item className={styles.usericon}>
        //             <Image src="/usericon.png" alt="user-icon" width="30%" height="30%" />{username}
        //         </Menu.Item>
        //         <Menu.Item>
        //             <SignOutButton />
        //         </Menu.Item>
        //     </SubMenu>
        // </Menu>