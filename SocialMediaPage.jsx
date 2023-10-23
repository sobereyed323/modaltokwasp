import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getSocialMediaCredentials from '@wasp/queries/getSocialMediaCredentials';

export function SocialMediaPage() {
  const { data: credentials, isLoading, error } = useQuery(getSocialMediaCredentials);
  const createCredentialFn = useAction(createSocialMediaCredential);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Social Media Credentials</h1>
      <div className='p-4 bg-slate-50 rounded-lg'>
        <label className='block'>Platform</label>
        <input type='text' className='border py-1 px-2 w-full rounded' />
      </div>
      <div className='p-4 bg-slate-50 rounded-lg'>
        <label className='block'>API Key</label>
        <input type='text' className='border py-1 px-2 w-full rounded' />
      </div>
      <div className='p-4 bg-slate-50 rounded-lg'>
        <button
          onClick={() => createCredentialFn({ platform: '', apiKey: '' })}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Add Credential
        </button>
      </div>
      <div className='p-4 bg-slate-50 rounded-lg'>
        {credentials.map((credential) => (
          <div key={credential.id}>
            <div>{credential.platform}</div>
            <div>{credential.apiKey}</div>
            <button
              onClick={() => console.log('Delete credential')}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}