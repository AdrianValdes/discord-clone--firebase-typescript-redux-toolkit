import {
  AddCircle,
  CardGiftcard,
  EmojiEmotions,
  Gif,
} from '@material-ui/icons';
import React, { FormEvent, useEffect, useState } from 'react';
import './Chat.css';
import { ChatHeader } from './ChatHeader';
import { Message } from './Message';
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from '../channels/channelSlice';
import { db } from '../firebase';
import { DocumentData, Timestamp } from '@firebase/firestore-types';
import firebase from 'firebase';
import { selectUser, User } from '../autenthication/userSlice';

export interface MessageInterface {
  message: string;
  user: User;
  timestamp: Timestamp;
  id: string;
}

export const Chat = () => {
  const channelId = useSelector(selectChannelId)!;
  const channelName = useSelector(selectChannelName)!;
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<DocumentData>([]);

  const user = useSelector(selectUser);

  useEffect(() => {
    if (channelId) {
      db.collection('channels')
        .doc(channelId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        });
    }
  }, [channelId]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const setMessage = async () => {
      await db
        .collection('channels')
        .doc(channelId)
        .collection('messages')
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: input,
          user,
        });
    };
    setMessage();
    setInput('');
  };

  return (
    <div className='chat'>
      <ChatHeader channelName={channelName} />
      <div className='chat__messages'>
        {messages.map((item: MessageInterface) => (
          <Message key={item.id} {...item} />
        ))}
      </div>
      <div className='chat__input'>
        <AddCircle fontSize='large' />
        <form onSubmit={handleSubmit}>
          <input
            disabled={!channelId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              channelName ? `Message #${channelName}` : 'Choose a channel'
            }
          />
          <button
            disabled={!channelId}
            className='chat__inputButton'
            type='submit'
          >
            Send message
          </button>
        </form>

        <div className='chat__inputIcons'>
          <CardGiftcard fontSize='large' />
          <Gif fontSize='large' />
          <EmojiEmotions fontSize='large' />
        </div>
      </div>
    </div>
  );
};
