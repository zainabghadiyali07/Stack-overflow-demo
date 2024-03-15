import { PopupType } from '../../utils/constants'
import PostForm from '../postForm'
import styles from './PopupsContainer.module.css'
import SignInPopUp from './signInPopUp'
import SignOutPopup from './signOut'

const PopupsContainer = ({
  popupInfo,
}) => {

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
