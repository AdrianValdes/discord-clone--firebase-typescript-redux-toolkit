import { AddCircle } from '@material-ui/icons';
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
  MouseEvent,
} from 'react';
import './Chat.css';
import { ChatHeader } from './ChatHeader';
import { Message } from './Message';
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from '../channels/channelSlice';
import { db } from '../firebase';
import { DocumentData, Timestamp } from '@firebase/firestore-types';
import firebase from 'firebase';
import { selectUser, User } from '../autenthication/userSlice';
import { IconButton } from '@material-ui/core';

export interface MessageInterface {
  message: string;
  user: User;
  timestamp: Timestamp;
  id: string;
}

export const Chat = () => {
  const channelId = useSelector(selectChannelId)!;
  const channelName = useSelector(selectChannelName)!;
  const user = useSelector(selectUser);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<DocumentData>([]);
  const [search, setSearch] = useState<string>('');
  const [searchedMessages, setSearchedMessages] = useState<DocumentData>([]);

  useEffect(() => {
    if (channelId) {
      db.collection('channels')
        .doc(channelId)
        .collection('messages')
        .orderBy('timestamp')
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        });

      setSearchedMessages([]);
      setSearch('');
    }
  }, [channelId]);

  useEffect(() => {
    if (search) {
      setSearchedMessages(
        messages.filter(({ message }: MessageInterface) =>
          message.includes(search)
        )
      );
    } else {
      setSearchedMessages([]);
    }
  }, [search, messages]);

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const uploadMessage = async () => {
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
    uploadMessage();
    setInput('');
  };

  const handleSearchMessage = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const messagesToRender = search ? searchedMessages : messages;

  return (
    <div className='chat'>
      <ChatHeader
        handleSearchMessage={handleSearchMessage}
        channelName={channelName}
        search={search}
      />
      <div className='chat__messages'>
        {messagesToRender.map(
          ({ message, user, timestamp, id }: MessageInterface) => (
            <Message
              key={id}
              message={message}
              user={user}
              timestamp={timestamp}
            />
          )
        )}
      </div>
      <div className='chat__input'>
        <IconButton disabled={!channelId} onClick={(e) => handleSubmit(e)}>
          <AddCircle className='chat__inputButton' fontSize='large' />
        </IconButton>
        <form onSubmit={handleSubmit}>
          <input
            disabled={!channelId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              channelName
                ? `Message #${channelName}`
                : 'Choose a channel. (You can do that to the left of the screen)'
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
      </div>
    </div>
  );
};
