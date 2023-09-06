// import React from 'react'
import { auth,googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword , signInWithPopup, signOut} from 'firebase/auth';
import { useState } from 'react';
const Sample = () => {

  const [email , setEmail] = useState('');
  const[password,setPassword] = useState('');

  const signIn = async() =>{
    try{
      await createUserWithEmailAndPassword(auth, email,password)
    } catch (err){
      console.error(err);
    }
  };

  const signInWithGoogle = async() =>{
    try{
      await signInWithPopup(auth, googleProvider)
    } catch (err){
      console.error(err);
    }
  };

  const logout = async() =>{
    try{
      await signOut(auth)
    } catch (err){
      console.error(err);
    }
  }; 

  return (
    <div>
      welcome to world
      <input type="text" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="password..." onChange={(e) => setPassword(e.target.value)} />
      <button onClick={signIn}>Sign in</button>

      <button onClick={signInWithGoogle} >Sign in with google</button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Sample
