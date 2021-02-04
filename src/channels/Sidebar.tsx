import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsICon from '@material-ui/icons/Settings';
import SignalCellularAlt from '@material-ui/icons/SignalCellularAlt';

import { SidebarChannel } from './SidebarChannel';
import { Avatar } from '@material-ui/core';

import './Sidebar.css';
import { Call, InfoOutlined } from '@material-ui/icons';
import { selectUser } from '../autenthication/userSlice';
import { useSelector } from 'react-redux';
import { auth, db } from '../firebase';
import { DocumentData } from '@firebase/firestore-types';

interface FirebaseCollections {
  id: string;
  channel: DocumentData;
}

export const Sidebar = () => {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState<FirebaseCollections[]>([]);

  useEffect(() => {
    db.collection('channels').onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      )
    );
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt('Enter a new channel name');
    if (channelName) {
      db.collection('channels').add({
        channelName,
      });
    }
  };

  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <h3>Learn React</h3>
        <ExpandMoreIcon />
      </div>

      <div className='sidebar__channels'>
        <div className='sidebar__channelsHeader'>
          <div className='sidebar__header'>
            <ExpandMoreIcon />
            <h4>Text channels</h4>
          </div>

          <AddIcon onClick={handleAddChannel} className='sidebar__addChannel' />
        </div>
        <div className='sidebar_channelsList'>
          {channels.map(({ id, channel }) => (
            <SidebarChannel id={id} key={id} channel={channel.channelName} />
          ))}
        </div>
      </div>

      <div className='sidebar__voice'>
        <SignalCellularAlt className='sidebar__voiceIcon' fontSize='large' />
        <div className='sidebar__voiceInfo'>
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>

        <div className='sidebar__voiceIcons'>
          <InfoOutlined />
          <Call />
        </div>
      </div>
      <div className='sidebar__profile'>
        {user.photo ? (
          <Avatar onClick={() => auth.signOut()} src={user.photo} />
        ) : (
          <Avatar onClick={() => auth.signOut()} />
        )}
        <div className='sidebar__profileInfo'>
          <h3>{user.displayName}</h3>
          <p>id: {user.uid.substr(0, 6)}</p>
        </div>
        <div className='sidebar__profileIcons'>
          <MicIcon />
          <HeadsetIcon />
          <SettingsICon />
        </div>
      </div>
    </div>
  );
};
