/* eslint-disable react/jsx-key */
import type { NextPage } from "next";
import React, { useState, useContext, useEffect } from "react";
import NavigationBar from "../components/navbar/navbar";
import Category from "../components/dropdown/category";
import Item from "../components/homepage/item";
import { UserContext } from "@/lib/context";
import axios from "axios";
import AppPagination from "@/components/pagination";
import { Spinner } from "react-bootstrap";
import {useRouter}  from 'next/router'
import Loading from "@/components/Loading";
import styles from "../styles/Home.module.css";

const HomePage : NextPage = () => {

    const { user, username } = useContext(UserContext)
    let router = useRouter();

    const [ isLoading, setIsLoading ] = useState(false)
    const [ key, setKey ] = useState(null);
    const [ history, setHistory ] = useState([])
    const [ data, setData ] = useState(history)
    const [ totalPage, setTotalPage ] = useState(0)
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ itemPerPage, setItemPerPage ] = useState(5)
    const [ runTime, setRunTime] = useState(0)
    useEffect(() => {
        if (!user)
        {
            router.replace('/login');
        }
    }, [user]);

    useEffect(()=>{
        async function getHistory() {
            console.log("function is called")
            const histories = await axios.get('/api/history', {params: {user_uid: user!.uid}});
            const dt: any = histories.data
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

    function len (arr) {
        let max = Math.floor(arr.length / 5) 
        if(arr.length % 5 === 0) return max
        return max + 1
    }

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

    if (!user)
        return <Loading />;

    return (
        <div className={styles.homepageContainer}>
            <NavigationBar username={username} />
            <div className={styles.body}>
            {isLoading?(
                <>
                    <button className={styles.categoryButton} onClick={() => setData(history.slice(indexOfFirstItem, indexOfLastItem))}><Category filter={filter} setKey={setKey} keys={key} /></button>
                    <ul className={styles.historyContainer}>
                        {data.map((item: any) => <li><Item isLoading={isLoading} setIsLoading={setIsLoading} dt={item}/></li>)}
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