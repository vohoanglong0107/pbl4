import "../styles/globals.css";
import type { AppProps } from "next/app";
import { getAuth } from "firebase/auth";
import { UserContext } from "@/lib/context";
import { useUserData } from "@/lib/hooks";
import NavigationBar from "@/components/navbar/navbar"

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      <NavigationBar />
    <Component {...pageProps} />
    </UserContext.Provider>
  );
}
export default MyApp;
