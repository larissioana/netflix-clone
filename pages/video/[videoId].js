import { useRouter } from "next/router";
import Modal from 'react-modal';
import styles from '../../styles/video.module.css'
import cls from 'classnames'
import { getYoutubeVideoById } from "@/lib/videos";
import NavBar from "@/components/nav/navbar";
Modal.setAppElement("#__next");

export async function getStaticProps(context){


    // const video={
    //     title:'Hi cute dog',
    //     publishTime:'1990-01-01',
    //     description:'heyyyyyskfjfhdff',
    //     channelTitle:"Paramount Pictures",
    //     viewCount:10000,
    // }
    const videoId=context.params.videoId;
    const videoArray=await getYoutubeVideoById(videoId)
    return{
        props:{
            video:videoArray.length>0? videoArray[0]:{}
        },

        revalidate:10,
    };
};

export async function getStaticPaths(){
    const listOfVideos=['KK8FHdFluOQ','KCPEHsAViiQ','4zH5iYM4wJo']
    const paths=listOfVideos.map((videoId)=>({
    params:{videoId},
    }));
    return{paths, fallback:'blocking'};

}

const Video=({video})=>{
    const router=useRouter();

   
    const{title,
        publishTime,
        description,
        channelTitle,
        statistics:{viewCount}={viewCount: 0},}=video;
    return(
        <div className={styles.container}>
            <NavBar/>
        <Modal
        isOpen={true}
        contentLabel='Watch the label'
        onRequestClose={()=>router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
        >
        <iframe id="player"
        className={styles.videoPlayer}
        type="text/html"
        width="100%"
        height="390"
        src={`http://www.youtube.com/embed/${router.query.videoId}?enablejsapi=0&origin=http://example.com&controls=0&rel=0`}
        frameborder="0"></iframe>
        <div className={styles.modalBody}>
            <div className={styles.modalBodyContent}>
                <div className={styles.col1}>
                <p className={styles.publishTime}>{publishTime}</p>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
                </div>
                <div className={styles.col2}>
                <p className={cls(styles.subText,styles.subTextWrapper)}>
                    <span className={styles.textColor}>Cast: </span>
                    <span className={styles.channelTitle}>{channelTitle}</span>
                </p>
                <p className={cls(styles.subText,styles.subTextWrapper)}>
                    <span className={styles.textColor}>View Count: </span>
                    <span className={styles.channelTitle}>{viewCount}</span>
                </p>
                </div>
            </div>
        </div>
        </Modal>
        
        
        
        
        </div>
    )
};
export default Video;