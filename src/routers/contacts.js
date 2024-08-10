import {
    createContactController,
    deleteContactController,
    getAllContactsController,
    getContactByIdController,
    patchContactController,
    upsertContactController
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import express from 'express';
import { validateBody } from "../utils/validateBody.js";
import createContactSchema from "../validations/createContact.js";
import updateContactSchema from "../validations/updateContact.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";


const router = express.Router();
const jsonParser = express.json();

router.use('/contacts', authenticate);
router.get('/', ctrlWrapper(getAllContactsController));
router.get('/contacts', ctrlWrapper(getAllContactsController));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController));
router.post('/contacts', jsonParser, validateBody(createContactSchema), ctrlWrapper(createContactController));
router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactController));
router.put('/contacts/:contactId', isValidId, jsonParser, validateBody(createContactSchema), ctrlWrapper(upsertContactController));
router.patch('/contacts/:contactId', isValidId, jsonParser, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

export default router;
