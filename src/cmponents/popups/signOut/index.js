import styles from './SignOut.module.css';

const SignOutPopup = ({ popupInfo }) => {

  const {handleSignOut, cancel} = popupInfo;

  return (
    <div className={styles.container}>
      <span>Are you sure you want to sign out?</span>
      <div className={styles.wrapper}>
        <button onClick={handleSignOut}>
          Sign Out
        </button>
        <button
          className={styles.cancelButton}
          onClick={cancel}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default SignOutPopup;