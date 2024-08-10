import { SORT_ORDER } from "../constants/constans.js";
import { ContactsCollection } from "../db/models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({ page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contacts = ContactsCollection.find({ userId });

  if (filter.contactType) {
    contacts.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite) {
    contacts.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contactsData] = await Promise.all(
    [
    ContactsCollection
    .find()
    .merge(contacts)
    .countDocuments(),

    contacts
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec()
    ]
  );

  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contactsData,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload) => {

  const contact = await ContactsCollection.create(payload);
  return contact;

};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({ _id: contactId, userId });
  return contact;
};

export const updateContact = async (contactId, userId, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
