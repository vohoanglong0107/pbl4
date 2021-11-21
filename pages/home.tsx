/* eslint-disable react/jsx-key */
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import 'antd/dist/antd.css';
import React, { useState, useContext } from "react";
import NavigationBar from "../components/navbar/navbar";
import styles from "../styles/Home.module.css";
import Category from "../components/dropdown/category";
import Item from "../components/homepage/item";
import { SignOutButton } from "./login";
import { UserContext } from "@/lib/context";
import { Pagination } from "antd";


const HomePage : NextPage = () => {

    const { username } = useContext(UserContext)
    const datas = [
        {
            type: "Multiple choices",
            content: "It is a long established fact that a reader will be distracted by the readable content fetch this data on pre-render",
            // question: "nanananannanaanannaanan",
            // ans : {
            //     ans1: "ans1",
            //     ans2: "ans2",
            //     ans3: "ans3",
            //     ans4: "ans4"
            // },
            id: 1
        },
        {
            type: "Reading",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            // question: "nanananannanaanannaanan",
            // ans : {
            //     ans1: "ans1",
            //     ans2: "ans2",
            //     ans3: "ans3",
            //     ans4: "ans4"
            // },
            id: 2
        },
        {
            type: "Reading",
            content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour fetch this data on pre-render",
            // question: "nanananannanaanannaanan",
            // ans : {
            //     ans1: "ans1",
            //     ans2: "ans2",
            //     ans3: "ans3",
            //     ans4: "ans4"
            // },
            id: 2
        },
        {
            type: "Speaking",
            content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old fetch this data on pre-render.",
            // question: "nanananannanaanannaanan",
            // ans : {
            //     ans1: "ans1",
            //     ans2: "ans2",
            //     ans3: "ans3",
            //     ans4: "ans4"
            // },
            id: 4
        },
        {
            type: "Reading",
            content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old fetch this data on pre-render.",
            // question: "nanananannanaanannaanan",
            // ans : {
            //     ans1: "ans1",
            //     ans2: "ans2",
            //     ans3: "ans3",
            //     ans4: "ans4"
            // },
            id: 5
        },
        {
            type: "Reading",
            content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old fetch this data on pre-render.",
            // question: "nanananannanaanannaanan",
            // ans : {
            //     ans1: "ans1",
            //     ans2: "ans2",
            //     ans3: "ans3",
            //     ans4: "ans4"
            // },
            id: 6
        }
    ]
    const [ key, setKey ] = useState(null);
    const [ data, setData ] = useState(datas)
    
    const filter = async (key: any) => {
        let filteredData = await datas.filter(item => item.id === parseInt(key))
        setData(filteredData);
    }

    return (
        <div className={styles.homepageContainer}>
            <NavigationBar username={username} />
            <button className={styles.categoryButton} onClick={() => setData(datas)}><Category data={datas} filter={filter} setKey={setKey} keys={key} /></button>
            <ul className={styles.historyContainer}>
                {data.map((item: any) => (
                    <li><Item dt={item}/></li>
                ))}
            </ul>
            <div className={styles.pageDiv}>
                {data.length?(
                    <Pagination  className={styles.pagination} size="small" defaultCurrent={1} total={data.length} defaultPageSize={5} />
                ):
                ( <p className={styles.empty}>No lesson 😕</p> 
                )}
                
            </div>
            
        </div>
    );
}

export default HomePage;