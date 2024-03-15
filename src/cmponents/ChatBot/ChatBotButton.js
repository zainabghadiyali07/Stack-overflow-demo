import ChatBotIcon from '../../assets/chatbot.png';

import styles from './ChatScreen.module.css'

const ChatBotButton = () => (
  <div className={styles.btnWrapper}>
    <button className={styles.btn}>
      <img
      alt='chat'
      src={ChatBotIcon}
      />
    </button>
  </div>
)

export default ChatBotButton;