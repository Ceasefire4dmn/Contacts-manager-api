import React, { useState, useEffect } from "react";
import ContactCreationForm from "../../features/ContactCreationForm";
import { addContact, getContacts } from "../../shared/api/contacts";
import paint from "./pics/paint.png";


const CreateContactPage = () => {
    // url on base controller of the api
    const baseApiUrl = process.env.REACT_APP_API_URL;

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
    return (
        <div className="m-5 p-5">
            <span
                style={{ display: 'flex', alignItems: 'center' }}
            >
                <p className="display-4">
                    Создать новый контакт
                </p>
                <ContactCreationForm
                    submitted={handleAddContact}
                    visible={() => { }}
                />
                <img
                    src={paint}
                    alt="Paint image"
                    className={'m-5'}
                    style={{ maxHeight: '300px' }}
                />
            </span>
        </div>
    );
}

export default CreateContactPage;