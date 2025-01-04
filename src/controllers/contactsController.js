import {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import createError from 'http-errors';
import { contactAddSchema } from '../validation/contactsSchema.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { sortByList } from '../db/models/contacts.js';
// import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  // const { type, isFavourite } = parseFilterParams(req.query);
  const contacts = await getContacts({ page, perPage, sortBy, sortOrder });
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

export const addContactController = async (req, res) => {
  try {
    await contactAddSchema.validateAsync(req.body, {
      abortEarly: false,
    });
  } catch (error) {
    throw createError(400, error.message);
  }

  const data = await addContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const upsertContactController = async (req, res) => {
  const { contactId } = req.params;
  const { isNew, data } = await updateContact(contactId, req.body, {
    upsert: true,
  });
  const status = isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: 'Successfully patched a contact!',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
    throw createError(404, `Contact with id ${contactId} not found!`);
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await deleteContact(contactId);

  if (!result) {
    throw createError(404, `Contact with id ${contactId} not found!`);
  }

  res.status(204).send();
};
