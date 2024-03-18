import { useEffect, useState } from 'react'
import './Main.css'
import { useFireBase } from "../utils/useFirebase";
import Header from './header';
import NewsFeed from './newsFeed';
import PopupsContainer from './popups/PopupsContainer';
import Loader from './loader';
import ChatBotButton from './ChatBot/ChatBotButton'
import { PopupType } from '../utils/constants';

export default function Main() {
  const [popupInfo, setPopupInfo] = useState(null);
  const {
    user,
    isLoading,
    allPosts,
    secrets,
    signIn,
    signUp,
    writeNewPost,
    getAllPost,
    signOutUser,
    uploadMedia,
  } = useFireBase();

  useEffect(() => {
    getAllPost()
  }, []);

  const handleSignINButton = () => {
    if (user?.uid) {
      const signInInfo = {
        type: PopupType.SIGN_OUT,
        handleSignOut: ()=> {
          signOutUser();
          setPopupInfo(null);
        },
        cancel: ()=> setPopupInfo(null),
      }
      setPopupInfo(signInInfo);
    } else {
      const signInInfo = {
        type: PopupType.SIGN_IN,
        signIn,
        signUp,
        setPopupInfo,
      }
      setPopupInfo(signInInfo);
    }
  }

  const handlePost = () => {
    const pstInfo = {
      type: PopupType.POST_FORM,
      writeNewPost,
      uploadMedia,
      cancel: ()=> setPopupInfo(null),
    }
    setPopupInfo(pstInfo);
  }

  const handleChatBotButton = () => {
    const pstInfo = {
      type: PopupType.CHAT_BOT,
      secrets,
      user,
      close: ()=> setPopupInfo(null),
    }
    setPopupInfo(pstInfo);
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <PopupsContainer popupInfo={popupInfo} />
      <Header
        handleSignIN={handleSignINButton}
        user={user}
        handlePost={handlePost}
      />
      <NewsFeed allPosts={allPosts} />
      <ChatBotButton onClick={handleChatBotButton}/>
    </>)
}