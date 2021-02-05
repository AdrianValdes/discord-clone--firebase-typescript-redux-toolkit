import React from 'react';
import { useDispatch } from 'react-redux';
import { setChannelInfo } from './channelSlice';
import './SidebarChannel.css';

interface Props {
  channel: string;
  id: string;
}

export const SidebarChannel = ({ channel, id }: Props) => {
  const dispatch = useDispatch();

  return (
    <div
      className='sidebarChannel'
      role='button'
      onKeyDown={() =>
        dispatch(setChannelInfo({ channelId: id, channelName: channel }))
      }
      onClick={() =>
        dispatch(setChannelInfo({ channelId: id, channelName: channel }))
      }
      tabIndex={0}
    >
      <h4>
        <span className='sidebarChannel__hash'>#</span>
        {channel}
      </h4>
    </div>
  );
};
