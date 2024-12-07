import "./App.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TableContact from "./layout/TableContact/TableContact";

function App() {
  const [contacts, setContacts] = useState([
    {
      ContactId: "d76acdac-e8d9-42cf-b0f1-31122b9e7afc",
      ContactName: "John Doe",
      ContactEmail: "4b3uE@example.com",
    },
    {
      ContactId: "2c5c3137-c447-4dfb-a6b3-85873dd64db5",
      ContactName: "Jane Doe",
      ContactEmail: "gYVb0@example.com",
    },
    {
      ContactId: "3c5c3137-c447-4dfb-a6b3-85873dd64db5",
      ContactName: "Bob Smith",
      ContactEmail: "3oZiM@example.com",
    },
    {
      ContactId: "4c5c3137-c447-4dfb-a6b3-85873dd64db5",
      ContactName: "Alice Johnson",
      ContactEmail: "t0KQ3@example.com",
    },
  ]);

  const addContact = (
    props = {
      ContactId: crypto.randomUUID(),
      ContactName: "Karle Smith",
      ContactEmail: "alex@example.com",
    }
  ) => {
    const newContact = props;

    setContacts([...contacts, newContact]);
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div>
          <h2 className="card-header">Список контактов</h2>
        </div>
        <div className="card-body">
          <TableContact contacts={contacts} />
          <div>
            <button className="btn btn-primary" onClick={() => addContact()}>
              Добавить контактов
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
