import React from 'react';
import { Sidebar } from './channels/Sidebar';
import { Chat } from './chat/Chat';

import './App.css';

function App() {
  return (
    <div className='app'>
      <Sidebar />
      <Chat />
    </div>
  );
}

export default App;
