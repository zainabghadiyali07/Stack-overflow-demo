import UserDropDown from '../userDropDown';
import cn from 'classnames';
import styles from './Header.module.css'
import { isDay } from '../../utils/dateHandler';
import OpenAI from "openai";
import { OPEN_AI_KEY } from '../../utils/constants'

const Header = ({user, handleSignIN, handlePost}) => {

const openai = new OpenAI({apiKey: OPEN_AI_KEY, dangerouslyAllowBrowser: true});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "what is variable in java." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices);
}


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