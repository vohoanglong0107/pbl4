import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import 'antd/dist/antd.css';
import styles from "../../styles/Home.module.css";
import Category from "../dropdown/category";

const Item = ({isLoading, setIsLoading, dt}) => {
    
    function setType(dt) {
        let type = ""
        if(dt.cat_id === 1) type = "Reading"
        if(dt.cat_id === 2) type = "Multiple choices"
        if(dt.cat_id === 3) type = "Listening"
        if(dt.cat_id === 4) type = "Speaking"
        return type
    }
    
    return (
        <div className={styles.history} >
            <p className={styles.type}>{setType(dt)}</p>
            <p className={styles.content}>{dt.passage.substring(0, 84)}...<Link href={{
                pathname: `/functions/reading`,
                query: {
                    ...dt                    
                },
            }} ><a onClick={()=>setIsLoading(true)} className={styles.readmore}>Read more</a></Link></p>
        </div>
    );
}

export default Item;