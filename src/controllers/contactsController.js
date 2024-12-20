import { getContacts, getContactById } from '../services/contacts.js';
import createError from 'http-errors';

export const getAllContactsController = async (req, res) => {
  const contacts = await getContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);
  if (!contact) {
    throw createError(404, `Contact with id ${contactId} not found!`);
    // const error = new Error(`Contact with id ${contactId} not found`);
    // error.status = 404;
    // throw error;
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
