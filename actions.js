import HttpError from '@wasp/core/HttpError.js'

export const uploadPDF = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { createPDF } = context.entities.PDF
  const { userId } = context.user

  const newPDF = await createPDF({ path: args.path, userId })

  return newPDF
}

export const cloneCreator = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { creatorId } = args;

  // Find the creator to be cloned
  const creator = await context.entities.User.findUnique({
    where: { id: creatorId },
    include: { chats: true, PDFs: true }
  });

  if (!creator) { throw new HttpError(404, 'Creator not found') };

  // Create a new user with the same details as the original creator
  const clonedCreator = await context.entities.User.create({
    data: {
      username: creator.username,
      password: creator.password
    }
  });

  // Clone the chats
  for (const chat of creator.chats) {
    await context.entities.Chat.create({
      data: {
        content: chat.content,
        user: { connect: { id: clonedCreator.id } }
      }
    });
  }

  // Clone the PDFs
  for (const pdf of creator.PDFs) {
    await context.entities.PDF.create({
      data: {
        path: pdf.path,
        user: { connect: { id: clonedCreator.id } }
      }
    });
  }

  return clonedCreator;
}

export const takeOverChat = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const chat = await context.entities.Chat.findUnique({
    where: { id: args.chatId }
  });
  if (!chat) { throw new HttpError(404) };
  if (chat.userId !== context.user.id) { throw new HttpError(403) };

  // Implement the logic for taking over the chat here.

  return chat;
}