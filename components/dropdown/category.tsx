import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import styles from "../../styles/Home.module.css";
import { Menu, Dropdown } from "antd";

// 1 mảng data chưa all elements
// 1 mảng data chứa các elements thuộc type đc chọn qua cbb
// hàm show sẽ là hàm filter ra các element có key = ...

const Category : NextPage = props => {
    const [ isVisible, setVisible ] = useState(false)

    // const show = (key: any) => {
    //     console.log("datas: "+ datas)
    //     const filteredData = datas.filter((index: any) => key === datas[index].id);
    //     console.log(filteredData)
    //     setData(...filteredData);
    // }

    const handleMenuClick = (e: { key: any; }) => {
        console.log(e.key)
        // props.setKey(e.key);
        // console.log("keys: " + props.keys)
        props.filter(e.key);
    }

    const menu = (
        <Menu className={styles.dropdown} onClick={handleMenuClick}>
          <Menu.Item className={styles.item} key="1">Multiple choices</Menu.Item>
          <Menu.Item className={styles.item} key="2">Reading</Menu.Item>
          <Menu.Item className={styles.item} key="3">Listening</Menu.Item>
          <Menu.Item className={styles.item} key="4">Speaking</Menu.Item>
        </Menu>
      );

    const handleHover = (flag: boolean | ((prevState: boolean) => boolean)) => {
        setVisible(flag);
    }

    return (
        <Dropdown
            overlay={menu}
            onVisibleChange={handleHover}
            visible={isVisible}
        >
            <a className="ant-dropdown-link" style={{color: "#fff", fontSize: "1rem"}} href="https://ant.design/components/dropdown/" onClick={e => e.preventDefault()}>
                <p className={styles.cate}>Category</p> 
            </a>

        </Dropdown>
    );
}

export default Category;