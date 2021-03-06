import React, { useState, useEffect, createContext, useContext } from "react";
import { Spinner } from "reactstrap";
import firebase from "firebase";
import "firebase/auth";



export const UserContext = createContext();



export function UserProvider(props) {
    const apiUrl = "/api/user";

    const user = sessionStorage.getItem("user");
    const [isLoggedIn, setIsLoggedIn] = useState(user != null);

    const [users, setUsers] = useState([])



    const getAllUsers = () => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/getAllUsers`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(setUsers))
    }



    const [isFirebaseReady, setIsFirebaseReady] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((u) => {
            setIsFirebaseReady(true);
        });
    }, []);



    const login = (email, pw) => {
        return firebase.auth().signInWithEmailAndPassword(email, pw)
            .then((signInResponse) => getUser(signInResponse.user.uid))
            .then((user) => {
                sessionStorage.setItem("user", JSON.stringify(user));

            })
            .then(() => setIsLoggedIn(true));
    };



    const logout = () => {
        return firebase.auth().signOut()
            .then(() => {
                sessionStorage.clear()
                setIsLoggedIn(false);
            });
    };



    const register = (user, password) => {
        return firebase.auth().createUserWithEmailAndPassword(user.email, password)
            .then((createResponse) => saveUser({ ...user, firebaseUserId: createResponse.user.uid }))
            .then((savedUser) => {
                sessionStorage.setItem("user", JSON.stringify(savedUser))
                setIsLoggedIn(true);
            });
    };



    const getToken = () => firebase.auth().currentUser.getIdToken();



    const getUser = (firebaseUserId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${firebaseUserId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => {
                return resp.json()
            }));
    };



    const getUserById = (userId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/getById/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json()))
    }



    const saveUser = (user) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }).then(resp => resp.json()));
    };



    return (
        <UserContext.Provider value={{ users, isLoggedIn, login, logout, register, getToken, getUser, getAllUsers, getUserById }}>
            {isFirebaseReady
                ? props.children
                : <Spinner className="app-spinner dark" />}
        </UserContext.Provider>
    );
}