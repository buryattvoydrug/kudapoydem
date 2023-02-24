import { createContext, useReducer, useEffect } from "react";
import { AuthState } from "../types";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "{}") ,
  isFetching: false,
  error: false
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }: {children: React.ReactNode} ) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])
  
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};