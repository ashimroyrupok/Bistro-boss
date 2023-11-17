import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()

    // create user
    const createUser = (email,password)=> {
        return createUserWithEmailAndPassword(auth, email,password)
    }

    // login user 
    const login = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password)
    }

    // googlesignin
    const googleSignIN = () => {
        return signInWithPopup(auth, googleProvider)
    }

    // signout
    const logout = () => {
        return signOut(auth)
    }

        const userInfo = (name, photoURL)  => {
            return updateProfile(auth.currentUser,{
                displayName: name, photoURL: photoURL
            })
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
        googleSignIN,
        login,
        logout,
        userInfo

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;