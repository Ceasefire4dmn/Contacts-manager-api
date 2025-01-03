import { useState, useEffect } from "react";
import { getContacts, addContact, deleteContact, updateContact } from "../api/contacts";

const useContacts = (contactsUrl) => {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);

    // Fetch контактов\

    const fetchContacts = async () => {
        getContacts(contactsUrl)
            .then((data) => setContacts(data))
            .catch((err) => {
                setError(err.response?.data || "Ошибка при загрузке контактов");
            });
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    // Добавить контакт
    const handleAddContact = async (newContact) => {
        try {
            const addedContact = await addContact(contactsUrl, newContact);
            setContacts([...contacts, addedContact]);
            fetchContacts();
        } catch (err) {
            setError(err.response?.data || "Ошибка при добавлении контакта");
        }
    };

    // Удалить контакт
    const handleDeleteContact = async (contactId) => {
        try {
            await deleteContact(contactsUrl, contactId);
            setContacts(contacts.filter((contact) => contact.id !== contactId));
            fetchContacts();
        } catch (err) {
            setError(err.response?.data || "Ошибка при удалении контакта");
        }
    };

    const handleUpdateContact = async (contactId, updatedContact) => {
        try {
            await updateContact(contactsUrl, contactId, updatedContact);
            setContacts(contacts.filter((contact) => contact.id !== contactId));
            fetchContacts();
        } catch (err) {
            setError(err.response?.data || "Ошибка при изменении контакта");
    }
    }
    return { contacts, handleAddContact, handleDeleteContact, handleUpdateContact, error };
};

export default useContacts;
