import Card from "./card";
import styles from './sectioncards.module.css'
import Link from 'next/link'


const SectionCards=(props)=>{
    const{title,videos=[]}=props;
  
    return(
        <section className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.cardWrapper}>
        {videos.map((video,index)=>{
            return (
            <Link href={`/video/${video.id}`}>
           
            <Card key={index} imgUrl={video.imgUrl}/>
          
            </Link>
           
       ) })}
        
        </div>
        </section>
    )
};
export default SectionCards;