import React, { useState, useEffect } from "react";
import { getContacts, deleteContact } from "../../shared/api/contacts";
import deletePcs from "./pics/delete.png";
import callPcs from "./pics/call.png";

const DeleteContactPage = () => {
    // url on base controller of the api
    const baseApiUrl = process.env.REACT_APP_API_URL;

    // url on contacts storage
    const contactsUrl = `${baseApiUrl}/contacts`;

    // dynamic update contacts in the list by using useState hook
    const [contacts, setContacts] = useState([]);
    const [deletingLog, setOperation] = useState("");
    const [id, setId] = useState();

    // Fetch contacts from the API when the component mounts and update the state with the fetched data.
    useEffect(() => {
        getContacts(contactsUrl)
            .then((data) => setContacts(data))
            .catch((err) => {
                console.error(err.response.data);
            });
    }, []); // Empty dependency array ensures the effect runs only once, when the component mounts.

    // handleDeleteContact - handle deleting contact on client side after calling deleteContact method for api request. Used by RowContact through props drilling
    const handleDeleteContact = (contactId) => {
        deleteContact(contactsUrl, contactId);

        setContacts(contacts.filter((contact) => contact.id !== contactId));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const contact = contacts.find(contact => contact.id === id);

        if (contact) {
            // Контакт найден, выполняем удаление
            await setOperation(`Контакт ${contact.name} успешно удален!`);
            handleDeleteContact(id);
        } else {
            // Контакт не найден
            setOperation("Такого пользователя не существует или введен неверный ID.");
        }
    }

    return (
        <div
            style={{ 
                justifyContent: 'space-evenly', 
                display: 'flex', 
                alignItems: 'center' 
            }}
        >
            <div
                className="card p-4 m-4"
                style={{ width: "40%"}}
            >
                <p className="display-4">
                    Удаление контакта
                </p>
                <form
                    onSubmit={handleSubmit}
                >
                    <div
                        className="form-group"
                    // Contact's name field
                    >
                        <label htmlFor="name">
                            Введите ID контакта
                        </label>
                        <input
                            type="GUID"
                            className="form-control"
                            id="id"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required={true}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-danger mt-3"
                    // Button for creating new contact
                    >
                        Удалить контакт
                    </button>
                </form>
                {
                    deletingLog &&
                    <div className="mt-4 card p-3">
                        {deletingLog}
                    </div>
                }

                <img
                    src={callPcs}
                    alt="Call image"
                    style={{ maxHeight: '500px' }}
                />
            </div>
            <img 
                src={deletePcs} 
                alt="Delete image" 
                style={{ maxHeight: '500px' }}    
            />
        </div>
    );
}

export default DeleteContactPage;