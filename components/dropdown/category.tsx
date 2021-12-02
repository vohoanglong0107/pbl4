import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from "../../styles/Home.module.css";

const Category = props => {
    const [ category, setCategory ] = useState('')

    const handleClick = (event) => {
        let val = event.target.value;
        console.log("val",val)
        setCategory(val)
        props.filter(val);
    }

    return (
        <div className={styles.cateContainer}>
            <FormControl sx={{ m: 1, minWidth: 120 }} className={styles.test}>
                <Select
                value={category}
                onChange={handleClick}
                label=""
                className={styles.category}
                >
                <MenuItem className={styles.item} value={0}>ALL</MenuItem>
                <MenuItem className={styles.item} value={2}>Multiple choices</MenuItem>
                <MenuItem className={styles.item} value={1}>Reading</MenuItem>
                <MenuItem className={styles.item} value={3}>Listening</MenuItem>
                <MenuItem className={styles.item} value={4}>Speaking</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default Category;
