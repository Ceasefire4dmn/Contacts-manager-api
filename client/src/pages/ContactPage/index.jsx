import React from "react";
import useContacts from "../../shared/hooks/useContacts";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../widgets/Header";
import FormButton from "../../shared/ui/Button/FormButton";
import TableContact from "./ui/TableContact";
import "../../App.css";

// url on base controller of the api
const baseApiUrl = process.env.REACT_APP_API_URL;

function ContactListPage() {
  // url on contacts storage
  const contactsUrl = `${baseApiUrl}/contacts`;

  const { contacts, handleAddContact, handleDeleteContact, error } = useContacts(contactsUrl);

  return (
    <div>
      <div className="lg-container m-4">

        <div className="card">
          {/* Header */}
          <Header />

          {/* Contacts */}
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
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
    </div>
  );
}

export default ContactListPage;
