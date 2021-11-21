import { useEffect, useState, useMemo, useContext } from "react";
import debounce from "lodash.debounce";
import { NextPage } from "next";
import Image from "next/image";
import { signInWithPopup, signInAnonymously, signOut } from "@firebase/auth";
import { writeBatch, doc, getDoc } from "firebase/firestore";
import googleIcon from "@/public/google.png";
import { auth, googleProvider, firestore } from "@/lib/firebase";
import { UserContext } from "@/lib/context";
import HomePage from "./home";
import Login from "../components/login";
import styles from "../styles/login.module.css"
import { UsernameForm } from "../components/account/addUsername";
import style from "../styles/navbar.module.css"
import Router, {useRouter}  from 'next/router'

const LoginForm: NextPage = () => {
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  const router = useRouter()  
  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <HomePage />
        )
      ) : (
        <div className={styles.loginForm}>
            <Login />
          </div>
      )}
    </main>
  );
};

// Sign in with Google button
export const SignInButton = () => {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  return (
    <>
      <button className={styles.ggButton} onClick={signInWithGoogle}>
        <Image src={googleIcon} alt={"Google icon"} width="30%" height="30%" /> Sign in with
        Google
      </button>
      <button className={styles.anonyButton} onClick={() => signInAnonymously(auth)}>
        Sign in Anonymously
      </button>
    </>
  );
}

// Sign out button
export const SignOutButton = () => {
  return <button className={style.logout} onClick={() => {console.log("sign out");signOut(auth)}}>Sign Out</button>;
}

export default LoginForm;