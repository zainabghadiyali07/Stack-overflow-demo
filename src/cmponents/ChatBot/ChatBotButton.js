import ChatBotIcon from '../../assets/chatbot.png';

import styles from './ChatScreen.module.css'

const ChatBotButton = ({onClick}) => (
  <div className={styles.btnWrapper}>
    <button className={styles.btn} onClick={onClick}>
      <img
      alt='chat'
      src={ChatBotIcon}
      />
    </button>
  </div>
)

export default ChatBotButton;