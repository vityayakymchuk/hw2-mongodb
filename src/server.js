import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';


export function setupServer() {

const app = express();

const PORT = Number(env('PORT', '3000'));

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.use(cors());


app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
});

app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
        data: contacts,
    });
});

app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
        res.status(404).json({
            message: 'Contact not found',
        });
	  return;
	}

    res.status(200).json({
	status: 200,
	message: "Successfully found contact with id {**contactId**}!",
	data: contact,
    });

});

app.use('*', (req, res, next) => {
  res.status(404).json({
  message: 'Not found',
});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

};

// mongodb+srv://vityayakym4uk:sdrVDpspbocTT8Vk@cluster0.194uoho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
