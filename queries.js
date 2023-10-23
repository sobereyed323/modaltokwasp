import HttpError from '@wasp/core/HttpError.js'

export const getChats = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Chat.findMany({
    where: {
      userId: context.user.id
    }
  });
}

export const getPDFs = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.PDF.findMany({
    where: {
      userId: context.user.id
    }
  });
}

export const getSocialMediaCredentials = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.SocialMediaCredential.findMany({
    where: { userId: context.user.id }
  });
}