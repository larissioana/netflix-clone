import styles from '/components/banner/banner.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';


const Banner=({title,subTitle,imgUrl,videoId})=>{
    const router=useRouter();
    const handlePlay=()=>{
        console.log('PLAY')
        router.push(`video/${videoId}`)
    }
    return(
       <div className={styles.container}>
        <div className={styles.leftWrapper}>
            <div className={styles.left}>
            <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
            </div>
            <h2 className={styles.title}>{title}</h2>
            <h3 className={styles.subtitle}>{subTitle}</h3>
            <div className={styles.playBtn}>
            <button className={styles.btn} onClick={handlePlay}>
            <Image src='/static/play_arrow.svg' alt='play icon' width='32' height='32'/> 
            <span className='playText'>Play</span></button>
            </div>
            </div>
            </div>
            <div className={styles.bannerImg} style={{backgroundImage: `url(${imgUrl})`, width:'100%',height:'100%',position:'absolute',
            backgroundSize:'cover',backgroundPosition:'50% 50%',backgroundRepeat:'no-repeat'
        }}></div>
        </div>
    )
};
export default Banner;