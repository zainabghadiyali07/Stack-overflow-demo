import { useMemo, useRef, useState } from 'react';
import Avatar from '../../avtar';
import styles from './SignInPopUp.module.css'


const SignInPopUp = ({popupInfo}) => {
  const [isError, setIsError] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const emailRef = useRef(null);
  const password = useRef(null);
  const nameRef = useRef(null);

  const {setPopupInfo, signIn, signUp} = popupInfo;

  const isEmptyField = useMemo(() => (
    emailRef?.current?.value 
    && password?.current?.value),
    [emailRef, password]);
  
  const errorMessage = useMemo(()=> {
    if (isError && !isEmptyField) {
      return 'Please fill all info.'
    }

    return 'Invaild email or password'
  }, [isEmptyField, isError])

  const handleSignIn = async () => {
    let isSucess = '';
    if (!isEmptyField) {
      if (isSignUp) {
        isSucess = await signUp(emailRef?.current?.value, password?.current?.value, nameRef?.current?.value)
      } else {
        isSucess = await signIn(emailRef?.current?.value, password?.current?.value);
      }

     if (isSucess) {
      setPopupInfo(null);
      return;
     }
    }
    setIsError(!isSucess);
  }

  const handleIsVisible = () => {
    setPopupInfo(null);
  }

  const handleChangeForm = () => {
    setIsSignUp(!isSignUp);
  }
  return (
    <div className={styles.wrapper}>
      <button onClick={handleIsVisible} className={styles.close}/>
      <Avatar />
      <div className={styles.container}>
      {isError && <span className={styles.error}>{errorMessage}</span>}
      {isSignUp && (
        <input
        label=""
        placeholder="Full Name"
        type="text"
        className={styles.email}
        required
        ref={nameRef}
      />
      )}
        <input
          label=""
          placeholder="Email"
          type="email"
          className={styles.email}
          required
          ref={emailRef}
        />
        <input
          type="password"
          className={styles.email}
          name="password"
          placeholder="Password"
          ref={password}
          required />
        <button
        className={styles.createButton}
        onClick={handleChangeForm}
        >
        {isSignUp ? 'Already have Account' : 'Create Account'}
        </button>
        <button 
        className={styles.loginButton}
        onClick={handleSignIn}
        >
          {isSignUp ? 'SIGN UP' : 'SIGN IN'}
        </button>
      </div>
    </div>
  )
}

export default SignInPopUp;