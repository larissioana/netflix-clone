import styles from '@/components//nav/navbar.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NavBar=({username})=>{
    const router=useRouter();
    const [showDropDown,setShowDropDown]=useState(false);

    const handleOnClickHome=(e)=>{
      e.preventDefault();
      router.push("/")
    };
    const handleOnClickMyList=(e)=>{
       e.preventDefault();
       router.push("/browse/my-list")
    }
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
                        <a className={styles.linkName} href='/login'>Sign out</a>
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