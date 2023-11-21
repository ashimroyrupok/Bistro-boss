import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import usepublicAxios from "../hooks/usepublicAxios";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const axiosPublic = usepublicAxios()
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
            if(currentUser){
                // set token
                const userData = {email: currentUser?.email}
                axiosPublic.post('/jwt',userData)
                .then(res => {
                    console.log(res.data);
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                        setLoading(false)
                    }
                })
            }
            else{
                // remove token 
                localStorage.removeItem('access-token')
                setLoading(false)

            }

        })
        return () => {
            unSubscribe()
        }

    }, [axiosPublic])

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