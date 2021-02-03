import {
  AddCircle,
  CardGiftcard,
  EmojiEmotions,
  Gif,
} from '@material-ui/icons';
import React from 'react';
import './Chat.css';
import { ChatHeader } from './ChatHeader';
import { Message } from './Message';

export const Chat = () => (
  <div className='chat'>
    <ChatHeader />
    <div className='chat__messages'>
      <Message />
      <Message />
      <Message />
    </div>
    <div className='chat__input'>
      <AddCircle fontSize='large' />
      <form>
        <input placeholder='Message' />
        <button className='chat__inputButton' type='submit'>
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
