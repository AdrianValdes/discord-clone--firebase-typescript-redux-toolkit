import { Avatar } from '@material-ui/core';
import React from 'react';
import { MessageInterface } from './Chat';
import './Message.css';

export const Message = ({ message, user, timestamp }: MessageInterface) => (
  <div className='message'>
    <Avatar src={user.photo!} />
    <div className='message__info'>
      <h4>
        Grr Thul
        <span className='message__timestamp'>{new Date(timestamp?.toDate()).toUTCString()}</span>
      </h4>
      <p>{message}</p>
    </div>
  </div>
);
