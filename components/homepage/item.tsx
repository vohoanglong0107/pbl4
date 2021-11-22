import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import 'antd/dist/antd.css';
import styles from "../../styles/Home.module.css";
import Category from "../dropdown/category";

const Item = ({dt}) => {

    
    function setType(dt) {
        let type = ""
        if(dt.id === 1) type = "Multiple choices"
        if(dt.id === 2) type = "Reading"
        if(dt.id === 3) type = "Listening"
        if(dt.id === 4) type = "Speaking"
        return type
    }

    return (
        <div className={styles.history} >
            <p className={styles.type}>{setType(dt)}</p>
            <p className={styles.content}>{dt.passage.substring(0, 84)}...<a className={styles.readmore}>Read more</a></p>
        </div>
    );
}

export default Item;