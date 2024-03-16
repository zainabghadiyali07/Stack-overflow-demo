import UserDropDown from '../userDropDown';
import cn from 'classnames';
import styles from './Header.module.css'
import { isDay } from '../../utils/dateHandler';

const Header = ({user, handleSignIN, handlePost}) => {

  return (
    <div className={cn(styles.wrapper,{
      [styles.darkMode]: isDay(),
    })}>
      <span className={styles.headerName}>CodeQuery</span>
      <div className={styles.buttonwapper}>
        <button 
         className={styles.headerButton}
         onClick={handlePost}
         >
          Post
        </button>
        <button 
         className={styles.headerButton}
         onClick={handleSignIN}
         >
          {user?.uid ? 'Sign Out' : 'Sign In'}
          </button>
        <UserDropDown user={user} />
      </div>
    </div>
  )
}

export default Header;