import { createContext } from "react";
import AuthStorage from "../utils/authStorage";

const authStorage = new AuthStorage();
const AuthStorageContext = createContext(authStorage);

export default AuthStorageContext;
