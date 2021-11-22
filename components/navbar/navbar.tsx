import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
  import { SignOutButton } from "../../pages/login";
import styles from "../../styles/navbar.module.css";
import Reading from "../../pages/functions/reading";
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

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
      };
    
      const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
      };
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
            onClose={handleMenuClose}
            >
            <MenuItem className={styles.dropItem}>Profile</MenuItem>
            <MenuItem className={styles.dropItem}><SignOutButton /></MenuItem>
        </Menu>
    )

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
        onClose={handleMobileMenuClose}
        >
        <MenuItem>
            <Link href={`/500`}><a className={styles.itemMobile}>Multiple Choices</a></Link>
        </MenuItem>
        <MenuItem>
            <Link href={`/functions/reading`}><a className={styles.itemMobile}>Reading</a></Link>
        </MenuItem>
        <MenuItem>
            <Link href={`/500`}><a className={styles.itemMobile}>Listening</a></Link>
        </MenuItem>
        <MenuItem>
            <Link href={`/500`}><a className={styles.itemMobile}>Speaking</a></Link>
        </MenuItem>
        {/* <MenuItem>
            <ProfileDropdown onClick={handleProfileMenuOpen} /> 
        </MenuItem> */}
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            className={styles.usericonMobile}
            onClick={handleProfileMenuOpen}
        >
            
            <Image  src="/usericon.png" alt="user-icon" width="30%" height="30%" />
            <p className={styles.usernameMobile}>{username}</p>
        </IconButton>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }} className={styles.common}>
            <AppBar position="static" className={styles.myNav}>
                <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    className={styles.name}
                >
                    <Link href={`/home`}><a className={styles.nameText}>Lorem</a></Link>
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
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        className={styles.usericon}
                        onClick={handleProfileMenuOpen}
                    >
                        
                        <Image  src="/usericon.png" alt="user-icon" width="30%" height="30%" />
                        <p className={styles.username}>{username}</p>
                    </IconButton>
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
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