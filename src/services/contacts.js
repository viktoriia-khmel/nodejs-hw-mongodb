import { contactsCollection } from '../db/models/contacts.js';

export const getContacts = async () => contactsCollection.find();

export const getContactById = async (contactId) =>
  contactsCollection.findById(contactId);
