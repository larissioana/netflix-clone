import Head from "next/head";
import Link from "next/link";
import styles from '../styles/login.module.css'
import { useState } from "react";
import { useRouter } from "next/router";
import {magic} from '../lib/magic-client'

const Login=()=>{
  const[userMsg,setUserMsg]=useState('');
  const[email,setEmail]=useState('');
  const router=useRouter();

  const handleLogin= async (e) =>{
    e.preventDefault();
    
    if(email){
     if(email==='larissoltean@gmail.com'){
    //  router.push('/');
    try{
     const didToken= await magic.auth.loginWithMagicLink({email,
      });
      console.log({didToken})
    }catch(error){
    console.error('Something went wrong...',error)
    }
     }else{
      setUserMsg('Something went wrong logging in')
     }
    }else{
      setUserMsg('Enter a valid email addrees')
    }
   
  };

  const handleOnChange=(e)=>{
    setUserMsg('');
    const email=e.target.value;
    setEmail(email);
   
  }
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
            Sign In
          </button>
          </div>
          </main>
       
        </div>
    )
};
export default Login;