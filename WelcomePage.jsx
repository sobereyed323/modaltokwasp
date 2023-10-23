import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getChats from '@wasp/queries/getChats';
import getPDFs from '@wasp/queries/getPDFs';
import uploadPDF from '@wasp/actions/uploadPDF';
import cloneCreator from '@wasp/actions/cloneCreator';

export function WelcomePage() {
  const { data: chats, isLoading: chatsLoading, error: chatsError } = useQuery(getChats);
  const { data: pdfs, isLoading: pdfsLoading, error: pdfsError } = useQuery(getPDFs);
  const uploadPDFFn = useAction(uploadPDF);
  const cloneCreatorFn = useAction(cloneCreator);

  if (chatsLoading || pdfsLoading) return 'Loading...';
  if (chatsError || pdfsError) return 'Error: ' + (chatsError || pdfsError);

  const handleUploadPDF = () => {
    // TODO: Implement PDF upload logic
  };

  const handleCloneCreator = () => {
    // TODO: Implement clone creator logic
  };

  return (
    <div>
      <h1>Welcome to ModalTokai</h1>
      <p>This is the welcome page of the application.</p>

      <div>
        <h2>Chats</h2>
        {chats.map((chat) => (
          <div key={chat.id}>{chat.content}</div>
        ))}
      </div>

      <div>
        <h2>PDFs</h2>
        {pdfs.map((pdf) => (
          <div key={pdf.id}>{pdf.path}</div>
        ))}
      </div>

      <div>
        <h2>Upload PDF</h2>
        <button onClick={handleUploadPDF}>Upload PDF</button>
      </div>

      <div>
        <h2>Clone Creator</h2>
        <button onClick={handleCloneCreator}>Clone Creator</button>
      </div>

      <div>
        <Link to='/social-media'>Go to Social Media Page</Link>
      </div>

      <div>
        <Link to='/bank'>Go to Bank Page</Link>
      </div>

      <div>
        <Link to='/admin'>Go to Admin Page</Link>
      </div>
    </div>
  );
}