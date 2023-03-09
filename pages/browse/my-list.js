import SectionCards from "@/components/card/sectioncards";
import NavBar from "@/components/nav/navbar";
import { getMyList } from "@/lib/videos";
import Head from "next/head";
import styles from '../../styles/MyList.module.css';
import useRedirectUser from "../utils/redirectUser";

export async function getServerSideProps(context){
   const {userId, token} = await useRedirectUser(context);
   const videos = await getMyList(userId, token);

    if(!userId){
        return{
          props:{},
          redirect:{
            destination:'/login',
            permanent:false,
          }
        }
      }
 return{
    props:{
        myListVideos:videos,
    }
 }
};

const MyList=({myListVideos})=>{
    return(
        <>
        <Head>
            <title>My List</title>
        </Head>
        <main className={styles.main}>
        <NavBar/>
        <div className={styles.sectionWrapper}>
            <SectionCards
            title='My List'
            videos={myListVideos}
            />
        </div>
        </main>
      
        </>
    )
};

export default MyList;