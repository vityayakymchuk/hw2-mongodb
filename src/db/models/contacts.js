import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      // match: [/^\d{10}$/, 'Please enter a valid phone number'],
    },
    email: {
      type: String,
      required: false,
      // match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const ContactsCollection = model('contacts', contactSchema);
