import { useState, useRef, useEffect } from 'react';
import styles from './ChatScreen.module.css';
import cn from 'classnames';
import { GoogleGenerativeAI } from '@google/generative-ai'

const ChatScreen = ({popupInfo, messageslist, updateMessageList}) => {
  const [question, setQuestion] = useState('');
  const { close, user, secrets } = popupInfo;
  const genAI = new GoogleGenerativeAI(secrets.Open_AI_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  
  const paragraphRef = useRef(null);

  console.log(secrets)
  useEffect(()=>{
    if (!user?.uid) {
      alert('Please Login First');
      close();
    }
  },[close, user])

  async function run(prompt) {
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const newMessage = {
      content: text,
      role: 'assistant'
    }
    
    await updateMessageList(newMessage)
  }
  

  const handleMessageList = async () => {
    const newMessage = {
      content: question,
      role: 'system'
    }
    
    await updateMessageList(newMessage)

    run(question);

    setQuestion('');
    paragraphRef.current.scrollTop = paragraphRef.current.scrollHeight;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.heading}>
          Chat Bot
        </span>
        <button onClick={close} className={styles.closeButton}>
          Close
        </button>
      </div>
      <div ref={paragraphRef} className={styles.messageBody}>
        {
          messageslist && messageslist.map((message)=> (
          <span className={cn(styles.messages,{
            [styles.assistant]: message.role === 'assistant'
          })}>
            {message.content}
            </span>
          ))
        }
        </div>
      <div className={styles.formWrapper}>
      <input 
       className={styles.textArea} 
       type='text' 
       value={question}
       onChange={(e)=> setQuestion(e.target.value)} 
       placeholder='Ask Your Questions'
       />
      <button className={styles.sendButton} onClick={handleMessageList}>send</button>
    </div>
    </div>
  )
}

export default ChatScreen; 