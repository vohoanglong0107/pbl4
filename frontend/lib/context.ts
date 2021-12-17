import { createContext } from "react";
import { User } from "firebase/auth";
interface userInfo {
  user: User | null;
  username: string | null;
}
const user: userInfo = { user: null, username: null };
export const UserContext = createContext(user);
