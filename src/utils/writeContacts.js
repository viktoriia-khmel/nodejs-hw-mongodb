import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs/promises';

export const writeContacts = async (updatedContacts) => {
    try {
    const jsonUpdContacts = JSON.stringify(updatedContacts, null, 2);
    await fs.writeFile(PATH_DB, jsonUpdContacts, 'utf8');
  } catch (error) {
    console.log(error);
  }
};
