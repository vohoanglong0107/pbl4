import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import 'antd/dist/antd.css';
import styles from "../../styles/Home.module.css";
import Category from "../dropdown/category";

const Item = ({dt}) => {

    const test = () => {
        console.log(dt)
    }
    return (
        <div className={styles.history} onClick={test}>
            <p className={styles.type}>{dt.type}</p>
            <p className={styles.content}>{dt.content.substring(0, 84)}...<a className={styles.readmore}>Read more</a></p>
        </div>
    );
}

export default Item;