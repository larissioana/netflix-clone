import Head from "next/head";
import Link from "next/link";
import styles from '../styles/login.module.css'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {magic} from '../lib/magic-client'

const Login=()=>{
  const[userMsg,setUserMsg]=useState('');
  const[email,setEmail]=useState('');
  const[isLoading, setIsLoading]=useState(false);
  const router=useRouter();

  useEffect(()=>{
    const handleComplete=()=>{
      setIsLoading(false);
    }
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeComplete', handleComplete);
    
    return()=>{
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeComplete', handleComplete);
    }
  },[router])

  const handleLogin= async (e) =>{
    e.preventDefault();
    if(email){

 
    try{
      setIsLoading(true);
     const didToken= await magic.auth.loginWithMagicLink({email,
      });

      if(didToken){
         const response= await fetch ('/api/login', {
          method:'POST',
          headers:{
            'Authorization': `Bearer ${didToken}`,
            'Content-type':'application/json'
          }
         });

         const loggedInResponse= await response.json();
         if(loggedInResponse.done){
           router.push('/')
         }else{
          setIsLoading(false);
          setUserMsg('Something went wrong logging in')
         }
       
      }
    }catch(error){
    console.error('Something went wrong loggin in...', error)
    setIsLoading(false);
    }
    
    }else{
      setIsLoading(false);
      setUserMsg('Enter a valid email addrees')
    }
   
  };

  const handleOnChange=(e)=>{
    setUserMsg('');
    const email=e.target.value;
    setEmail(email);
   
  };
    return(
        <div className={styles.container}>
         <Head>
          <title> Netflix SignIn</title>
         </Head>
         <header className={styles.header}>
         <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href='/'>
          <div className={styles.logoWrapper}>Netflix</div>
          </Link>
          </div>
          </header>
          <main className={styles.main}>
          <div className={styles.mainWrapper}>
          <h1 className={styles.title}>Sign In</h1>
          <input className={styles.emailInput} type='text' placeholder='Email address'
          onChange={handleOnChange}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLogin} className={styles.loginBtn}>
          {isLoading? 'Loading...' : "Sign In"}
          </button>
          </div>
          </main>
          </div>
    )
};
export default Login;