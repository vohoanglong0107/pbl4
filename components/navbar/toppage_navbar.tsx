import React from "react";
import Link from "next/link";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styles from "../../styles/navbar.module.css";

const TopNavbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={styles.myNav}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            className={styles.name}
          >
            <Link href={`/`}><a className={styles.nameText}>Lorem</a></Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    );
}

export default TopNavbar;