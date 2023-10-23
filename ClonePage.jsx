import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import cloneCreator from '@wasp/actions/cloneCreator';

export function ClonePage() {
  const { data: users, isLoading, error } = useQuery(getUsers);
  const cloneCreatorFn = useAction(cloneCreator);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCloneCreator = () => {
    cloneCreatorFn();
  };

  return (
    <div>
      <h1>Clone Creator</h1>
      {/* Implement the form for cloning the creator here */}
      <form onSubmit={handleCloneCreator}>
        {/* ... form inputs go here ... */}
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Clone
        </button>
      </form>
    </div>
  );
}