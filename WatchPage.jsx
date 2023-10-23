import React from 'react';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getChats from '@wasp/queries/getChats';
import takeOverChat from '@wasp/actions/takeOverChat';

export function WatchPage() {
  const { data: chats, isLoading, error } = useQuery(getChats);
  const takeOverChatFn = useAction(takeOverChat);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleTakeOverChat = (chatId) => {
    takeOverChatFn({ chatId });
  };

  return (
    <div className='p-4'>
      {chats.map((chat) => (
        <div
          key={chat.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{chat.content}</div>
          <div>{chat.user.username}</div>
          <div>
            <button
              onClick={() => handleTakeOverChat(chat.id)}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Take Over
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}