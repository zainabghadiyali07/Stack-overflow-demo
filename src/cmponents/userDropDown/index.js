import styles from './UserDropDown.module.css';
import UserIcon from '../../assets/userIcon.png'

const UserDropDown = ({user}) => {

  return (
    <div>
      <button className={styles.userButton}>
      <img className={styles.userIcon} alt='user' src={UserIcon}/>
      <span>{user?.displayName}</span>
      </button>
      <div>

      </div>
    </div>
  );
};

export default UserDropDown;