import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../styles/Home.module.css";
import TopPage from "../components/top_page";
import TopNavbar from "../components/navbar/toppage_navbar";
import Login from "../components/login";
import Reading from "@/components/functionalities/reading";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lorem</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Reading />
      </main>
    </div>
  );
};

export default Home;
