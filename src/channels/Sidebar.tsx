import React from 'react';
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

export const Sidebar = () => (
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

        <AddIcon className='sidebar__addChannel' />
      </div>
      <div className='sidebar_channelsList'>
        <SidebarChannel />
        <SidebarChannel />
        <SidebarChannel />
        <SidebarChannel />
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
      <Avatar />
      <div className='sidebar__profileInfo'>
        <h3>@Grr Thul</h3>
        <p>#Id from Grr</p>
      </div>
      <div className='sidebar__profileIcons'>
        <MicIcon />
        <HeadsetIcon />
        <SettingsICon />
      </div>
    </div>
  </div>
);
