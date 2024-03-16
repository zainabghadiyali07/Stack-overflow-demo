import { useState } from 'react'
import { PopupType } from '../../utils/constants'
import ChatScreen from '../ChatBot/ChatScreen'
import PostForm from '../postForm'
import styles from './PopupsContainer.module.css'
import SignInPopUp from './signInPopUp'
import SignOutPopup from './signOut'

const PopupsContainer = ({
  popupInfo,
}) => {

  const [messageslist, setMessageslist] = useState([]);

  const updateMessageList = async (current, newMessage) => {
    await setMessageslist([
      ...current,
      newMessage
    ]);
  }

  if (!popupInfo) {
      return null;
  }

  const renderPopup = () => {
    switch (popupInfo?.type) {
      case PopupType.SIGN_IN: {
        return (
          <SignInPopUp
            popupInfo={popupInfo}
          />
        )
      }
      case PopupType.SIGN_OUT: {
        return (
          <SignOutPopup popupInfo={popupInfo} />
        )
      }
      case PopupType.POST_FORM: {
        return (
          <PostForm popupInfo={popupInfo} />
        )
      }
      case PopupType.CHAT_BOT: {
        return (
          <ChatScreen 
           popupInfo={popupInfo}
           updateMessageList={updateMessageList}
           messageslist={messageslist}
           />
        )
      }
      default:
        return null
    }
  }

  return (
    <div className={styles.wrapper}>
      {renderPopup()}
    </div>
  )
}

export default PopupsContainer;
