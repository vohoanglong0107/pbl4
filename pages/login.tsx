import { useEffect, useState, useMemo, useContext } from "react";
import debounce from "lodash.debounce";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { signInWithPopup, signInAnonymously, signOut } from "@firebase/auth";
import { writeBatch, doc, getDoc } from "firebase/firestore";
import googleIcon from "@/public/google.png";
import { auth, googleProvider, firestore } from "@/lib/firebase";
import { UserContext } from "@/lib/context";
import HomePage from "./home";
import Login from "../components/login";
import styles from "../styles/login.module.css";
import { UsernameForm } from "../components/account/addUsername";
import style from "../styles/navbar.module.css";
import Router, {useRouter}  from 'next/router'

const LoginForm: NextPage = () => {
  const { user, username } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false)
  
  const router = useRouter()
  console.log("user: " + user)
  if (user){

    if (!username)
      return <UsernameForm />
    else
    {
      router.replace('/home');
      return <main></main>;
    }
  }else{
    return (
      <main>
        {/* {user ? (
          !username ? (
            <UsernameForm />
          ) : (
            <HomePage />
          )
        ) : ( */}
          <div className={styles.loginForm}>
              <Login isLoading={isLoading} setIsLoading={setIsLoading} />
            </div>
        {/* )} */}
      </main>
    );
  }
};

// Sign in with Google button
export const SignInButton = ({setIsLoading}) => {
  
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  return (
    <>
      <button className={styles.ggButton} onClick={()=>{
        setIsLoading(true)
        signInWithGoogle()
      } }>
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
  return (
  <Link className={styles.logout} href="/home"><a onClick={ async () => {
    await signOut(auth)}}>Sign Out</a>
  </Link>
  );
}

export default LoginForm;