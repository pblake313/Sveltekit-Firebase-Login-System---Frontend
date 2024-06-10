import { get } from "svelte/store";
import { tokenStore } from "../stores/tokenStore";
import { user } from "../stores/userStore";
import { goto } from "$app/navigation";
const backendLink = import.meta.env.VITE_BACKEND_URL;
import { auth } from "$lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


export async function getAuthenticatedUser(){
    const token = get(tokenStore)

    try {
        const response = await fetch(`${backendLink}/auth/getAuthenticatedUser`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'

        });

        const result = await response.json();
        // console.log(result) 
        if (result.user) {
            user.set(result.user)
        }

        return result

    } catch (error) {
        // This will handle network errors and any errors that occurred while handling the response
        // console.log(error)
        throw new Error ('an error occurred getting the authenitcated user in getAuthenticatedUser(). found in helpers / authFunctions.ts')
    }
}

export async function refreshAccessToken() {
    try {
        const response = await fetch(`${backendLink}/auth/refreshAccessToken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const result = await response.json();
        // console.log(result) 
        if (result.accessToken) {
            tokenStore.set(result.accessToken); // Store the token
        }

        return result

    } catch (error) {
        // This will handle network errors and any errors that occurred while handling the response
        // console.log(error)
        throw new Error ('an error occurred getting the authenitcated user in refreshAccessToken(). found in helpers / authFunctions.ts')
    }
}

export async function logout() {
    const response = await fetch(`${backendLink}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        credentials: 'include'
    });

    const data = await response.json();
    tokenStore.set(null)
    user.set(null)
    goto('/login')
    return data;
}

export async function autoLogin() {

    // should return true if the user gets logged in automatically, false if not.

    try {
        const authUserResult = await getAuthenticatedUser()

        if (authUserResult.user){
            return true
        }

        // the case if the token is missing expired or invalid

        if (authUserResult.message === 'User is unauthorized. Token expired, missing or invalid.') {
            const refreshResult = await refreshAccessToken()

            if (refreshResult.accessToken){
                const secondTryResult = await getAuthenticatedUser()

                if (secondTryResult.user) {
                    return true
                }
            }

        }

        return false

    } catch (error) {
        console.log(error)
        return false
    }
}

export async function login(email:string, password: string){

    const postObj = {
        email,
        password
    }

    try {
        const response = await fetch(`${backendLink}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // THIS IS HOW WE GET THE REFRESH TOKEN
            body: JSON.stringify(postObj)
        });


        const result = await response.json();

        if (result.formError || result.errorTitle){
            return result
        }

        tokenStore.set(result.accessToken); // Store the token

        const autoLoginSuccess = await autoLogin()

        if (!autoLoginSuccess){
            result.formError = 'Autologin Failure'
            return result
        }

        goto('/account');
        // reroute here.

    } catch (error) {
        // This will handle network errors and any errors that occurred while handling the response
        console.log(error)
    }
}

export async function signup(email: string, password: string, confirmPassword: string) {

    // simply signs up a user. returns either an error or a newUser

    const postObj = {
        email,
        password,
        confirmPassword
    }

    try {
        const response = await fetch(`${backendLink}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postObj)
        });


        const result = await response.json();

        return result

    } catch (error){
        console.log(error)
        throw new Error('An unknown error has occurred.')
    }
}

export async function googleSignIn(){
    try {

        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const token = await result.user.getIdToken();  // Get the ID token

        // Send the token to your backend
        const response = await fetch(`${backendLink}/auth/googleAuth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ token })
        });

        let data = await response.json();

        if (data.error){
            return data
        }

        if (data.accessToken){
            tokenStore.set(data.accessToken)
            await autoLogin()
        }

        return 'success'

    } catch (error) {
        console.log(error);
        return {error: 'An error has occurred please try again later.'}
    }
}