import { Timestamp } from '@firebase/firestore-types';
import { Avatar } from '@material-ui/core';
import React from 'react';
import { User } from '../autenthication/userSlice';
import './Message.css';

interface Props {
  message: string;
  user: User;
  timestamp: Timestamp;
}

export const Message = ({ message, user, timestamp }: Props) => (
  <div className='message'>
    <Avatar src={user.photo!} />
    <div className='message__info'>
      <h4>
        {user.displayName}
        <span className='message__timestamp'>
          {new Date(timestamp?.toDate()).toUTCString()}
        </span>
      </h4>
      <p>{message}</p>
    </div>
  </div>
);
