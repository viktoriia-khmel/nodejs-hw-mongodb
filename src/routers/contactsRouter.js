import { Router } from 'express';
import * as contactsController from '../controllers/contactsController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const contactsRouter = Router();

contactsRouter.get(
  '/',
  ctrlWrapper(contactsController.getAllContactsController),
);

contactsRouter.get(
  '/:contactId',
  ctrlWrapper(contactsController.getContactByIdController),
);
