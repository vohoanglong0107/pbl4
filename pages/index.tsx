import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../styles/Home.module.css";
import TopPage from "../components/top_page";
import TopNavbar from "../components/navbar/toppage_navbar";
import LoginForm from "@/pages/login";
import Reading from "./functions/reading";
import HomePage from "./home";
import Profile from "@/components/profile/profile";
import Enter from "./enter";
import React from 'react';
React.useEffectLayout = React.useEffect;


const Home: NextPage = () => {
  return (
    <div >
      <Head>
        <title>Lorem</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <TopPage />
      </main>
    </div>
  );
};

export default Home;
