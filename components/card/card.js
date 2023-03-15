import Image from "next/image";
import styles from '../card/card.module.css';
import { useState } from "react";
import { motion } from "framer-motion";
import cls from 'classnames';

const Card=({imgUrl='/static/image.jpg',id, size='medium'})=>{
    const[imgSrc,setImgSrc]=useState(imgUrl);

    const classMap={
        'large': styles.lgItem,
        'medium': styles.mdItem,
        'small': styles.smItem
    };

    const handleOnError=()=>{
        setImgSrc('/static/image.jpg')
    };
    const scale = id === 0 ? {scaleY:1.1} : {scale:1.1}
    return(
        <div className={styles.container}>
       <motion.div className={cls(styles.imgMotionWrapper, classMap[size])}  whileHover={{...scale}}>
           <Image src={imgSrc} 
           alt='card-image' 
           fill 
           className={styles.cardImg}
           onError={handleOnError}
           />
        </motion.div>
        </div>
    )
};
export default Card;