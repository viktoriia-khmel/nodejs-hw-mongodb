import { contactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;
  const items = await contactsCollection
    .find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });
  const totalItems = await contactsCollection.countDocuments();

  const paginationData = calculatePaginationData({ totalItems, page, perPage });

  return {
    data: items,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};

export const getContactById = async (contactId) =>
  contactsCollection.findById(contactId);

export const addContact = (payload) => contactsCollection.create(payload);

export const updateContact = async (contactId, payload, options = {}) => {
  const { upsert = false } = options;
  const result = await contactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      upsert,
      runValidators: true,
      includeResultMetadata: true,
    },
  );

  if (!result || !result.value) return null;
  const isNew = Boolean(result.lastErrorObject.upserted);
  return {
    isNew,
    data: result.value,
  };
};

export const deleteContact = async (contactId) => {
  const result = await contactsCollection.findOneAndDelete({ _id: contactId });
  return result;
};
