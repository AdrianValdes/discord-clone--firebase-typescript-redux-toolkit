import { SearchRounded, ExitToApp } from '@material-ui/icons';
import React, { ChangeEvent } from 'react';
import { auth } from '../firebase';

import './ChatHeader.css';

interface Props {
  channelName: string;
  handleSearchMessage: (e: ChangeEvent<HTMLInputElement>) => void;
  search: string;
}

export const ChatHeader = ({
  channelName,
  handleSearchMessage,
  search,
}: Props) => (
  <div className='chatHeader'>
    <div className='chatHeader__left'>
      <h3>
        <span className='chatHeader__hash'>#</span>
        {channelName}
      </h3>
    </div>
    <div className='chatHeader__right'>
      <div className='chatHeader__search'>
        <input
          placeholder='Search'
          value={search}
          onChange={(e) => handleSearchMessage(e)}
        />
        <SearchRounded />
      </div>
      <ExitToApp fontSize='large' onClick={() => auth.signOut()} />
    </div>
  </div>
);
