import { useState, useContext } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { signInWithPopup, signInAnonymously, signOut } from "@firebase/auth";
import googleIcon from "@/public/google.png";
import { auth, googleProvider } from "@/lib/firebase";
import { UserContext } from "@/lib/context";
import Login from "../components/login";
import { UsernameForm } from "../components/account/addUsername";
import styles from "../styles/login.module.css";

const LoginForm: NextPage = () => {
  const { user, username } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  console.log("user: " + user);
  if (user) {
    if (!username) return <UsernameForm />;
    else {
      router.replace("/home");
      return <main></main>;
    }
  } else {
    return (
      <main>
        <div className={styles.loginForm}>
          <Login isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
      </main>
    );
  }
};

// Sign in with Google button
export const SignInButton = ({ setIsLoading }) => {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  return (
    <>
      <button
        className={styles.ggButton}
        onClick={() => {
          setIsLoading(true);
          signInWithGoogle();
        }}
      >
        <Image src={googleIcon} alt={"Google icon"} width="30%" height="30%" />{" "}
        Sign in with Google
      </button>
      <button
        className={styles.anonyButton}
        onClick={() => signInAnonymously(auth)}
      >
        Sign in Anonymously
      </button>
    </>
  );
};

// Sign out button
export const SignOutButton = () => {
  return (
    <Link href="/home">
      <a
        className={styles.logout}
        onClick={async () => {
          await signOut(auth);
        }}
      >
        Sign Out
      </a>
    </Link>
  );
};

export default LoginForm;
