import axios from "axios";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TableContact from "./layout/TableContact/TableContact";
import ContactCreationForm from "./layout/ContactCreationForm/ContactCreationForm";

const baseApiUrl = process.env.REACT_APP_API_URL;
function App() {

  const [contacts, setContacts] = useState([]);

  const contactsUrl = `${baseApiUrl}/contacts`;

  useEffect(() => {
    axios
      .get(contactsUrl)
      .then((res) => setContacts(res.data));
  }, []);

  const addContact = (props) => {
    const newContact = props;

    axios.post(contactsUrl, newContact);

    setContacts([...contacts, newContact]);
  };

  // deleteContact - method for deleting contact which will be called from RowContact
  const deleteContact = (contactId) => {
    axios.delete(`${contactsUrl}/${contactId}`);
    
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  const [isFormVisible, setIsFormVisible] = useState(false);
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="container mt-5">
      <div className="card">
        {/* Header */}
        <div>
          <h2 className="card-header">Список контактов</h2>
        </div>

        {/* Contacts */}
        <div className="card-body">
          <TableContact 
            contacts={contacts} 
            // passing deleteContact method through props into TableContact and then passing it to RowContact and then calling it from RowContact
            deleteContact={deleteContact} 
          />

          {/* Button for adding contact */}
          <div>
            <button
              className="btn btn-success mb-3"
              onClick={() => toggleFormVisibility()}
            >
              {isFormVisible ? "Отменить" : "Добавить контакт"}
            </button>

            {isFormVisible && (
              <ContactCreationForm
                submitted={addContact}
                visible={toggleFormVisibility}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
