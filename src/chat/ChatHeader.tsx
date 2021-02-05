import {
  EditLocationRounded,
  Notifications,
  PeopleAltRounded,
  SearchRounded,
  ExitToApp,
} from '@material-ui/icons';
import React from 'react';
import { auth } from '../firebase';

import './ChatHeader.css';

interface Props {
  channelName: string;
}

export const ChatHeader = ({ channelName }: Props) => (
  <div className='chatHeader'>
    <div className='chatHeader__left'>
      <h3>
        <span className='chatHeader__hash'>#</span>
        {channelName}
      </h3>
    </div>
    <div className='chatHeader__right'>
      <div className='chatHeader__search'>
        <input placeholder='Search' />
        <SearchRounded />
      </div>
      <ExitToApp onClick={() => auth.signOut()} />
    </div>
  </div>
);
