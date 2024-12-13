import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TableContact from "./layout/TableContact/TableContact";
import ContactCreationForm from "./layout/ContactCreationForm/ContactCreationForm";

function App() {
  const [contacts, setContacts] = useState([
    {
      ContactId: "d76acdac-e8d9-42cf-b0f1-31122b9e7afc",
      ContactName: "John Doe",
      ContactPhoneNumber: "123-456-7890",
      ContactEmail: "4b3uE@example.com",
    },
    {
      ContactId: "2c5c3137-c447-4dfb-a6b3-85873dd64db5",
      ContactName: "Jane Doe",
      ContactPhoneNumber: "987-654-3210",
      ContactEmail: "gYVb0@example.com",
    },
    {
      ContactId: "3c5c3137-c447-4dfb-a6b3-85873dd64db5",
      ContactName: "Bob Smith",
      ContactPhoneNumber: "555-555-5555",
      ContactEmail: "3oZiM@example.com",
    },
    {
      ContactId: "4c5c3137-c447-4dfb-a6b3-85873dd64db5",
      ContactName: "Alice Johnson",
      ContactPhoneNumber: "777-777-7777",
      ContactEmail: "t0KQ3@example.com",
    },
  ]);

  const addContact = (props) => {
    const newContact = props;
    setContacts([...contacts, newContact]);
  };

  // deleteContact - method for deleting contact which will be called from RowContact
  const deleteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.ContactId !== contactId));
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
