import { NextPage } from "next";
import debounce from "lodash.debounce";
import { useEffect, useState, useMemo, useContext } from "react";
import { writeBatch, doc, getDoc } from "firebase/firestore";
import { UserContext } from "@/lib/context";
import { firestore } from "@/lib/firebase";
import styles from "../../styles/username.module.css"
import TopNavbar from "../navbar/toppage_navbar";


export const UsernameForm = () => {
    const [formValue, setFormValue] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const { user, username } = useContext(UserContext);
  
    const onSubmit = async (e: { preventDefault: () => void }) => {
      e.preventDefault();
  
      // Create refs for both documents
      const userDoc = doc(firestore, "users", user!.uid);
      const usernameDoc = doc(firestore, "usernames", formValue);
  
      // Commit both docs together as a batch write.
      const batch = writeBatch(firestore);
      batch.set(userDoc, {
        username: formValue,
        displayName: user!.displayName,
      });
      batch.set(usernameDoc, { uid: user!.uid });
  
      await batch.commit();
    };
  
    const onChange = (e: { target: { value: string } }) => {
      // Force form value typed in form to match correct format
      const val = e.target.value.toLowerCase();
      const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  
      // Only set form value if length is < 3 OR it passes regex
      if (val.length < 3) {
        setFormValue(val);
        setLoading(false);
        setIsValid(false);
      }
  
      if (re.test(val)) {
        setFormValue(val);
        setLoading(true);
        setIsValid(false);
      }
    };
  
    //
  
    // Hit the database for username match after each debounced change
    // useCallback is required for debounce to work
    const checkUsername = useMemo(
      () =>
        debounce(async (username: string) => {
          if (username.length >= 3) {
            const ref = doc(firestore, "usernames", username);
            const res = await getDoc(ref);
  
            setIsValid(!res.exists());
            setLoading(false);
          }
        }, 500),
      []
    );
    useEffect(() => {
      checkUsername(formValue);
    }, [checkUsername, formValue]);
  
    if (!username) {
      return (
        <section className={styles.container}>
            <TopNavbar />
            <div className={styles.inputContainer}>
                <h3 className={styles.heading} >Enter Username</h3>
                <form onSubmit={onSubmit} className={styles.inputForm}>
                    <input
                    name="username"
                    placeholder="abc..."
                    value={formValue}
                    onChange={onChange}
                    className={styles.input}
                    autoComplete="off"
                    />
                    <UsernameMessage
                    username={formValue}
                    isValid={isValid}
                    loading={loading}
                    />
                    <button type="submit" className={styles.button} disabled={!isValid}>
                    CHOOSE
                    </button>
        
                    {/* <h3>Debug State</h3>
                    <div>
                    Username: {formValue}
                    <br />
                    Loading: {loading.toString()}
                    <br />
                    Username Valid: {isValid.toString()}
                    </div> */}
                </form>
            
                
            </div>
        </section>
      );
    }
  
    return null;
  }

  function UsernameMessage({
    username,
    isValid,
    loading,
  }: {
    username: string;
    isValid: boolean;
    loading: boolean;
  }) {
    if (loading) {
      return <p>Checking...</p>;
    } else if (isValid) {
      return <p className="text-success">{username} is available!</p>;
    } else if (username && !isValid) {
      return <p className="text-danger">That username is taken!</p>;
    } else {
      return <p></p>;
    }
  }
  