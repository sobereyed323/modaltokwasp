import React from 'react';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getChats from '@wasp/queries/getChats';
import uploadPDF from '@wasp/actions/uploadPDF';

export function BankPage() {
  const { data: chats, isLoading: chatsLoading, error: chatsError } = useQuery(getChats);
  const { data: pdfs, isLoading: pdfsLoading, error: pdfsError } = useQuery(getPDFs);
  const uploadPdfFn = useAction(uploadPDF);

  if (chatsLoading || pdfsLoading) return 'Loading...';
  if (chatsError || pdfsError) return 'Error: ' + (chatsError || pdfsError);

  const handleUploadPdf = () => {
    // TODO: Implement upload PDF functionality
  };

  return (
    <div>
      <h1 className='text-3xl font-bold mb-4'>Bank</h1>

      <div className='mb-4'>
        <h2 className='text-xl font-bold mb-2'>Chats</h2>
        {chats.map((chat) => (
          <div key={chat.id} className='p-2 border rounded mb-2'>
            <p>{chat.content}</p>
          </div>
        ))}
      </div>

      <div className='mb-4'>
        <h2 className='text-xl font-bold mb-2'>PDFs</h2>
        {pdfs.map((pdf) => (
          <div key={pdf.id} className='p-2 border rounded mb-2'>
            <p>{pdf.path}</p>
          </div>
        ))}
      </div>

      <div className='mb-4'>
        <h2 className='text-xl font-bold mb-2'>Upload PDF</h2>
        <input type='file' onChange={handleUploadPdf} />
        {/* TODO: Implement PDF upload button */}
      </div>
    </div>
  );
}