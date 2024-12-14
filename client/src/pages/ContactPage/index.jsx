import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../widgets/Header";
import FormButton from "../../shared/ui/Button/FormButton";
import TableContact from "./ui/TableContact";
import { getContacts, addContact, deleteContact } from "../../shared/api/contacts";

const baseApiUrl = process.env.REACT_APP_API_URL;
// url on base controller of the api
function ContactListPage() {
  // url on contacts storage
  const contactsUrl = `${baseApiUrl}/contacts`;

  // dynamic update contacts in the list by using useState hook
  const [contacts, setContacts] = useState([]);

  // Fetch contacts from the API when the component mounts and update the state with the fetched data.
  useEffect(() => {
    getContacts(contactsUrl)
      .then((data) => setContacts(data))
      .catch((err) => {
        console.error(err.response.data);
      });
  }, []); // Empty dependency array ensures the effect runs only once, when the component mounts.

  // handleAddContact - handle adding contact on client side after calling addContact method for api request
  const handleAddContact = (newContact) => {
    addContact(contactsUrl, newContact);
    if (contacts) {
      setContacts([...contacts, newContact]);
    } else {
      setContacts([...contacts, newContact]);
    }
  };

  // handleDeleteContact - handle deleting contact on client side after calling deleteContact method for api request. Used by RowContact through props drilling
  const handleDeleteContact = (contactId) => {
    deleteContact(contactsUrl, contactId);

    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  return (
    <div className="container mt-5">
      <div className="card">
        {/* Header */}
        <Header />

        {/* Contacts */}
        <div className="card-body">
          <TableContact
            contacts={contacts}
            // drilling handleDeleteContact method into TableContact and then calling it from RowContact
            deleteContact={handleDeleteContact}
          />

          {/* Button for adding contact */}
          <FormButton
            margin={"mt-3"}
            addContact={handleAddContact}
            btnTextBefore={"Добавить контакт"}
          />
        </div>
      </div>
    </div>
  );
}

export default ContactListPage;
