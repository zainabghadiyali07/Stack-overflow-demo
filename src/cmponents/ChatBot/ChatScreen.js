import { useState, useRef, useEffect } from 'react';
import styles from './ChatScreen.module.css';
import cn from 'classnames';
import OpenAI from "openai";

const ChatScreen = ({popupInfo, messageslist, updateMessageList}) => {
  const [question, setQuestion] = useState('');

  const { close, user, secrets } = popupInfo;
  
  const paragraphRef = useRef(null);

  useEffect(()=>{
    if (!user?.uid) {
      alert('Please Login First');
      close();
    }
  },[close, user])

  const openai = new OpenAI({apiKey:  secrets?.Open_AI_KEY, dangerouslyAllowBrowser: true});

  const handleMessageList = async () => {
    const newMessage = {
      content: question,
      role: 'system'
    }
    
    await updateMessageList(newMessage)

     await openai.chat.completions.create({
      messages: [{ role: "system", content: question }],
      model: "gpt-3.5-turbo",
    }).then(async (content)=>{
     updateMessageList(content.choices[0].message)
    });

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