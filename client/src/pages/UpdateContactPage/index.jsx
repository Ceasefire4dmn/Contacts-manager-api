import React, { useState } from 'react';
import useContacts from '../../shared/hooks/useContacts';
import useVisibility from '../../shared/hooks/useVisibility';
import ContactUpdatingForm from '../../features/ContactUpdatingForm';
import Modal from 'react-bootstrap/Modal';

const UpdateContactPage = () => {
    const baseApiUrl = process.env.REACT_APP_API_URL;

    // url on contacts storage
    const contactsUrl = `${baseApiUrl}/contacts`;

    const [id, setId] = useState("");
    const [updatingLog, setOperation] = useState(["", 2]);

    const [contactForUpdate, setContact] = useState(null);
    const { isVisible, show, hide } = useVisibility();

    const { contacts, error } = useContacts(contactsUrl);

    const handleIdSubmit = async (event) => {
        event.preventDefault();
        const contact = contacts.find(contact => contact.id === id);

        if (contact) {
            // Контакт найден, выполняем удаление
            await setOperation([`Контакт ${contact.name} найден и готов к изменению!`, 0]);
            setContact(contact);
            show();

        } else {
            // Контакт не найден
            setOperation(["Такого пользователя не существует или введен неверный ID.", 1]);
        }
    }

    return (
        <div style={{
            justifyContent: 'space-evenly',
            display: 'flex',
            alignItems: 'center'
        }}>
            <div
                className="card p-4 m-4"
                style={{ width: "40%" }}
            >
                <h1>Update Contact Page</h1>
                <form
                    onSubmit={handleIdSubmit}
                >
                    <div
                        className="form-group"
                    // Contact's name field
                    >
                        <label htmlFor="name">
                            Enter contact ID
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
                        className="btn btn-success mt-3"
                    // Button for creating new contact
                    >
                        Find contact
                    </button>

                </form>
                {
                    !error && updatingLog[1] === 1 &&
                    <div className="mt-4 alert alert-danger">
                            {updatingLog[0]}
                    </div>
                }
                {
                    !error && updatingLog[1] === 0 &&
                    <div className="mt-4 alert alert-success">
                            {updatingLog[0]}
                    </div>
                }
                {
                    error &&
                    <div className="alert alert-danger mt-4">
                        {error}
                    </div>
                }
            </div>
            <Modal style={{ margin: "auto", alignContent: "center", }}
                show={isVisible}
                onHide={() => hide()}
                onSubmit={() => {
                        setOperation(["Контакт успешно сохранен", 0]);
                        hide()
                    }}>
                <ContactUpdatingForm contact={contactForUpdate} />
            </Modal>
        </div>
    );
};

export default UpdateContactPage;