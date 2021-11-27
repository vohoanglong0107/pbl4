/* eslint-disable react/jsx-key */
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import 'antd/dist/antd.css';
import React, { useState, useContext, useEffect } from "react";
import NavigationBar from "../components/navbar/navbar";
import styles from "../styles/Home.module.css";
import Category from "../components/dropdown/category";
import Item from "../components/homepage/item";
import { SignOutButton } from "./login";
import { UserContext } from "@/lib/context";
import { Pagination } from 'antd';
import axios from "axios";
import AppPagination from "@/components/pagination";
import { Spinner } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useRouter}  from 'next/router'
import Loading from "@/components/Loading";

const HomePage : NextPage = () => {

    const { user, username } = useContext(UserContext)
    if (!user)
    {
        let router = useRouter();
        router.replace('/login');
        return <Loading />
    }
    const [ saved ] = useState(true)
    function len (arr) {
        let max = Math.floor(arr.length / 5) 
        if(arr.length % 5 === 0) return max
        return max + 1
    }

    const [ isLoading, setIsLoading ] = useState(false)
    const [ key, setKey ] = useState(null);
    const [ history, setHistory ] = useState([])
    const [ data, setData ] = useState(history)
    const [ totalPage, setTotalPage ] = useState(0)
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ itemPerPage, setItemPerPage ] = useState(5)
    const [ runTime, setRunTime] = useState(0)

    const handleChangePage = async (curPageNumber) => {
        setCurrentPage(curPageNumber)
        setRunTime(runTime - 1)
    }

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;

    const filter = async (key: any) => {
        if(parseInt(key) === 0) {
            setRunTime(runTime - 1)
            setTotalPage(len(history))
        }
        else 
        {
            let filteredData = await history.filter(item => item.cat_id === parseInt(key))
            setTotalPage(len(filteredData))
            console.log("filtered : ", filteredData)
            setData(filteredData)
        }
    }
    
    useEffect(()=>{
        async function getHistory() {
            console.log("function is called")
            const histories = await axios.get('/api/history', {params: {user_uid: user!.uid}});
            const dt = histories.data
            const datas =[]
            if(runTime < 2) {
                dt.forEach((item) => {
                    item.cat_id = 1;
                    datas.push(item)
                })
                setHistory(datas)
                let tmp = history.slice(indexOfFirstItem, indexOfLastItem)
                setData(tmp)
                setTotalPage(len(history))
                setRunTime(runTime + 1)
                setIsLoading(true)
            }
        }
        
        getHistory();
    }, [runTime]); 


    return (
        <div className={styles.homepageContainer}>
            <NavigationBar username={username} />
            <div className={styles.body}>
            {isLoading?(
                <>
                    <button className={styles.categoryButton} onClick={() => setData(history.slice(indexOfFirstItem, indexOfLastItem))}><Category filter={filter} setKey={setKey} keys={key} /></button>
                    <ul className={styles.historyContainer}>
                        {data.map((item: any) => <li><Item isLoading={isLoading} setIsLoading={setIsLoading} saved={saved} dt={item}/></li>)}
                    </ul>
                        
                    <div className={styles.pageDiv}>
                        {data.length?(
                            <AppPagination pageNumber={totalPage} paginate={handleChangePage} />
                        ):
                        ( <p className={styles.empty}>No lesson 😕</p> 
                        )}
                    </div>
                </>
            ):
            (
                <div className={styles.spinner}>
                    <Spinner animation="border" variant="warning" />
                </div>
            )}
            </div>
        </div>
    );
}

export default HomePage;