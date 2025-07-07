import React, {  useEffect, useState } from 'react';

import { createUserWithEmailAndPassword,  GoogleAuthProvider,  onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

import { AuthContext } from '../../Context/AuthContex';
import auth from '../../firebase/firebase.config';


const AuthProvider = ({children}) => {
    const [loading,setLoading]=useState(true)
    const [user,setUser]=useState(null)

    // create user
    
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth ,email,password)


    }
    // singin
    const singInUser=(email,password)=>{
      setLoading(true)
         
      return signInWithEmailAndPassword(auth,email,password)
      .then(async result => {
      const user = result.user;
      const token = await user.getIdToken();
      localStorage.setItem('access-token', token); 
      setUser(user);
      return result;
    })
    .finally(() => setLoading(false));
    }
    // update  
      const updateUser=updatedData=>{
        return updateProfile(auth.currentUser,updatedData)

     }
    //  googleLogIn
   const googleLogin = () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
          .then(result => {
            const logInGoogle = result.user;
            setUser(logInGoogle); 
            const token=logInGoogle.getIdToken()
            localStorage.setItem('access-token',token)
            return logInGoogle;  
          })
          .finally(() => setLoading(false));
      };

    // signOut
    const signOutUser=()=>{
      setLoading(true)
      localStorage.removeItem('access-token')
      return signOut(auth)

    }

    useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,currenUser=>{
      setUser(currenUser)
       setLoading(false);
       if(currenUser){
          const token=currenUser.getIdToken()
            localStorage.setItem('access-token',token)
       }
       else{
        localStorage.removeItem('access-token')
       }
           

            console.log('user in the auth state change', currenUser)
        })
    return ()=>{
      unsubscribe()
    }
    },[])
    

    const authInfo={
        loading,
        user,
        setUser,
        createUser,
        singInUser,
        signOutUser,
     googleLogin ,
      updateUser,

        
    }
    return (
      <AuthContext.Provider value={authInfo}>
        {children}
      </AuthContext.Provider>
)};

export default AuthProvider;