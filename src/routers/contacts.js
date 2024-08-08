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
import { checkRoles } from "../middlewares/checkRoles.js";
import { ROLES } from "../constants/constans.js";

const router = express.Router();
const jsonParser = express.json();

router.use('/contacts', authenticate);
router.get('/', checkRoles(ROLES.TEACHER), ctrlWrapper(getAllContactsController));
router.get('/contacts', checkRoles(ROLES.TEACHER), ctrlWrapper(getAllContactsController));
router.get('/contacts/:contactId', checkRoles(ROLES.TEACHER, ROLES.PARENT), isValidId, ctrlWrapper(getContactByIdController));
router.post('/contacts', checkRoles(ROLES.TEACHER), jsonParser, validateBody(createContactSchema), ctrlWrapper(createContactController));
router.delete('/contacts/:contactId', checkRoles(ROLES.TEACHER), isValidId, ctrlWrapper(deleteContactController));
router.put('/contacts/:contactId', checkRoles(ROLES.TEACHER), isValidId, jsonParser, validateBody(createContactSchema), ctrlWrapper(upsertContactController));
router.patch('/contacts/:contactId', checkRoles(ROLES.TEACHER, ROLES.PARENT), isValidId, jsonParser, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

export default router;
