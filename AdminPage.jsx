import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getChats from '@wasp/queries/getChats';
import takeOverChat from '@wasp/actions/takeOverChat';

export function AdminPage() {
  const { data: chats, isLoading, error } = useQuery(getChats);
  const takeOverChatFn = useAction(takeOverChat);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleTakeOverChat = (chatId) => {
    takeOverChatFn({ chatId });
  };

  return (
    <div>
      <h1>Welcome to the Admin Page</h1>
      <p>This page is for administrators to manage the application.</p>

      <div>
        {chats.map((chat) => (
          <div key={chat.id} className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'>
            <div>{chat.content}</div>
            <div>{chat.user.username}</div>
            <div>
              <button
                onClick={() => handleTakeOverChat(chat.id)}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              >
                Take Over
              </button>
              <Link
                to={`/chat/${chat.id}`}
                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}