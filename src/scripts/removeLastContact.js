import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const removeLastContact = async () => {
  try {
    const contacts = await readContacts();
    if (contacts.length > 0) {
      contacts.pop();
      await writeContacts(contacts);
    } else {
      console.log("There're no contacts to delete");
    }
  } catch (error) {
    console.log(error);
  }
};

removeLastContact();
