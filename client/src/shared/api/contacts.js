import axios from "axios";

export const getContacts = async (contactsUrl) => {
  const response = await axios
    .get(contactsUrl);
    return response.data;
};

export const addContact = async (contactsUrl, newContact) => {
  const response = await axios.post(contactsUrl, newContact);
  return response.data;
};

export const deleteContact = async (contactsUrl, contactId) => {
  const response = await axios.delete(`${contactsUrl}/${contactId}`);
  return response.data;
};
