import styles from '@/components//nav/navbar.module.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {magic} from '../../lib/magic-client';


const NavBar=()=>{
    const router=useRouter();
    const [showDropDown,setShowDropDown]=useState(false);
    const [username, setUsername]=useState('');

    useEffect(() => {
        async function getUsername() {
          try {
            const { email, issuer } = await magic.user.getMetadata();
            const didToken = await magic.user.getIdToken();
            console.log({ didToken });
            if (email) {
              setUsername(email);
            }
          } catch (error) {
            console.log("Error retrieving email:", error);
          }
        }
        getUsername();
      }, []);

    const handleOnClickHome=(e)=>{
      e.preventDefault();
      router.push("/")
    };

    const handleOnClickMyList=(e)=>{
       e.preventDefault();
       router.push("/browse/my-list")
    }

    const handleSignOut= async (e)=>{
        e.preventDefault();
        try{
         await magic.user.logout();
         console.log(await magic.user.isLoggedIn());
         router.push('/login');
        }catch(error){
            console.log("Error logging out", error);
            router.push('/login');
        }
    };

    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Link className={styles.logoLink} href='/'>
                    <div className={styles.logoWrapper}>Netflix</div>
                </Link>
            
            <ul className={styles.navItems}>
                <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
                <li className={styles.navItem2} onClick={handleOnClickMyList}>My List</li>
            </ul>
            <nav className={styles.navContainer}>
                <div>
                    <button className={styles.usernameBtn} onClick={()=>setShowDropDown(!showDropDown)}>
                        <p className={styles.username}>{username}</p>
                    <Image src='/static/expand-icon.svg' alt='Expand dropdown' width='32' height='32'/>
                    </button>
                    {showDropDown &&(
                    <div className={styles.navDropdown}>
                        <div>
                        <a className={styles.linkName} 
                        onClick={handleSignOut}
                        href='/login'>Sign out</a>
                        <div className={styles.lineWrapper}></div>
                    </div>
                    </div>
                       )}
                </div>
            </nav>
            </div>
        </div>
    )
};
export default NavBar;