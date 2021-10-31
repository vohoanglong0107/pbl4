/* eslint-disable react/jsx-key */
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import 'antd/dist/antd.css';
import React, { useState } from "react"
import NavigationBar from "../navbar/navbar";
import styles from "../../styles/Home.module.css";
import Category from "../dropdown/category";
import Item from "./item";



const HomePage : NextPage = () => {

    const datas = [
        {
            type: "Multiple choices",
            content: "It is a long established fact that a reader will be distracted by the readable content fetch this data on pre-render",
            id: 1
        },
        {
            type: "Reading",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            id: 2
        },
        {
            type: "Listening",
            content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour fetch this data on pre-render",
            id: 2
        },
        {
            type: "Speaking",
            content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old fetch this data on pre-render.",
            id: 4
        }
    ]
    const [ key, setKey ] = useState(null);
    const [ data, setData ] = useState(datas)

    const filter = async (key: any) => {
        const filteredData = await datas.filter(item => item.id === parseInt(key))
        setData(filteredData);
    }

    
    return (
        <div className={styles.homepageContainer}>
            <NavigationBar />
            <button className={styles.categoryButton} onClick={() => setData(datas)}><Category data={datas} filter={filter} setKey={setKey} keys={key} /></button>
            <ul className={styles.historyContainer}>
                {data.map((item: any) => (
                    <li><Item dt={item} /></li>
                ))}
            </ul>
            
        </div>
    );
}

export default HomePage;