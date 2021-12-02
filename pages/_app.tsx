import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { UserContext } from "@/lib/context";
import { useUserData } from "@/lib/hooks";
import createEmotionCache from "@/lib/createEmotionCache";
import "../styles/globals.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const userData = useUserData();
  return (
    <CacheProvider value={emotionCache}>
      <UserContext.Provider value={userData}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </CacheProvider>
  );
}
export default MyApp;
