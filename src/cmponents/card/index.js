import { formatDateForPost, isDay } from '../../utils/dateHandler';
import cn from 'classnames';
import styles from './Card.module.css';

const Card = ({ post }) => {

  return (
    <div className={cn(styles.card, {
      [styles.darkMode]: isDay(),
    })}>
      <div className={styles.cardFooter}>
        <div className={styles.user}>
          <img src="https://i.pravatar.cc/40?img=1" alt="user__image" className={styles.userImage} />
          <div className={styles.userInfo}>
            <h5>{post.displayName}</h5>
            <small>{formatDateForPost(post.createdDate)}</small>
          </div>
        </div>
      </div>
      <div className={styles.cardBody}>
        <h4>{post.title || post.displayName}</h4>
        <p>{post.description}</p>
      </div>
      <div className={styles.cardHeader}>
       {post.post_media && <img src={post.post_media} alt="card__image" className={styles.cardImage} />}
      </div>
    </div>
  )
}

export default Card;