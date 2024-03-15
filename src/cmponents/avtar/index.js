import styles from './Avatar.module.css';
import cn from 'classnames';

const Avatar = () => {

  return (
    <figure aria-hidden="true">
      <div className={styles.personBody}></div>
      <div className={cn(styles.neck, styles.skin)}></div>
      <div className={cn(styles.head, styles.skin)}>
        <div className={styles.eyes}></div>
        <div className={styles.mouth}></div>
      </div>
      <div className={styles.hair}></div>
      <div className={styles.ears}></div>
      <div className={styles.shirt1}></div>
      <div className={styles.shirt2}></div>
    </figure>
  );
};

export default Avatar;