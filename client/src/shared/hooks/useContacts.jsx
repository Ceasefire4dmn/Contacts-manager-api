import { useState, useEffect } from "react";
import { getContacts, addContact, deleteContact } from "../api/contacts";

const useContacts = (contactsUrl) => {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);

    // Fetch контактов
    useEffect(() => {
        getContacts(contactsUrl)
            .then((data) => setContacts(data))
            .catch((err) => {
                setError(err.response?.data || "Ошибка при загрузке контактов");
            });
    }, [contactsUrl]);

    // Добавить контакт
    const handleAddContact = async (newContact) => {
        try {
            const addedContact = await addContact(contactsUrl, newContact);
            setContacts([...contacts, addedContact]);
        } catch (err) {
            setError(err.response?.data || "Ошибка при добавлении контакта");
        }
    };

    // Удалить контакт
    const handleDeleteContact = async (contactId) => {
        try {
            await deleteContact(contactsUrl, contactId);
            setContacts(contacts.filter((contact) => contact.id !== contactId));
        } catch (err) {
            setError(err.response?.data || "Ошибка при удалении контакта");
        }
    };

    return { contacts, handleAddContact, handleDeleteContact, error };
};

export default useContacts;
