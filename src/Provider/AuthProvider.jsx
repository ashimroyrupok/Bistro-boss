import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(true)

    // create user
    const createUser = (email,password)=> {
        return createUserWithEmailAndPassword(auth, email,password)
    }

    // login user 
    const login = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password)
    }

    // signout
    const logout = () => {
        signOut(auth)
    }

    // observer

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log("current user", currentUser);
            setLoading(false)

        })
        return () => {
            return unSubscribe()
        }

    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        login,
        logout

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;