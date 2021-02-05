import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import { RootState } from '../app/store';

interface currentChannel {
  channelId: string | null;
  channelName: string | null;
}

const initialState = {
  channelId: null,
  channelName: null,
} as currentChannel;

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setChannelInfo: (state, { payload }: PayloadAction<currentChannel>) => {
      state.channelId = payload.channelId;
      state.channelName = payload.channelName;
    },
  },
});

export const { setChannelInfo } = channelSlice.actions;

export const selectChannelId = (state: RootState) => state.channel.channelId;
export const selectChannelName = (state: RootState) =>
  state.channel.channelName;

export const channelReducer = channelSlice.reducer;
