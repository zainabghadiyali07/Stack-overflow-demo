import { useState } from 'react';
import styles from './PostForm.module.css';

const PostForm = ({popupInfo}) => {
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');

  const {
    writeNewPost,
    cancel,
    uploadMedia,
  } = popupInfo

  const haddlePost = async () => {
    if(title && des) {
      await writeNewPost(des, title);
      await cancel();
    }
  }

  const handleMedia = async (e) => {
     await uploadMedia(e.target.files[0]);
  }

  return (
    <div className={styles.wrapper}>
      <input className={styles.title} type='text' placeholder='title' onChange={(e) => setTitle(e.target.value)}/>
      <input className={styles.des}type='text'  placeholder='description' onChange={(e) => setDes(e.target.value)}/>
      <div>
      <input 
      className={styles.media} tabIndex='-1' aria-hidden='true' 
      accept="image/*,image/heif,image/heic,video/*,video/mp4,video/x-m4v,video/x-matroska,.mkv" 
      multiple="" 
      type="file" 
      onChange={handleMedia}
      /> 
      </div>
      <div className={styles.buttonWrapper}>
      <button className={styles.cancel} onClick={cancel}>Cancel</button>
      <button className={styles.post} onClick={haddlePost}>Post</button>
      </div>
    </div>
  )
}

export default PostForm;